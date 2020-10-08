Draft

---

title: Postgres full text search with Rust
description: A short description
date: 2020/07/28

---

This a fun little weekend project to get started with rust. We'll be building a movie quotes search API using postgres' full text and search and rust as the web backend.

<br />

## Setup Postgres

To setup a dev database we can use the official postgres image from dockerhub.

```bash
docker pull postgres
```

Start a new postgres container.

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

# -e: environment variables
# -d: detaches the process from the current terminal
# -p 5432:5432: maps the default postgres port 5432 on the container, to 5432 on your computer
```

<br />

## Setup tables

There are many clients to interact with postgres. Here I use pgcli https://www.pgcli.com/.

```bash
pgcli -h localhost -p 5432 -U postgres
```

Let's start by creating a table for our quotes.

```sql
CREATE TABLE IF NOT EXISTS quotes (
    id SERIAL PRIMARY KEY,
    q_start INTEGER, /*timestamp of quote*/
    q_end INTEGER,
    body TEXT,
    body_tokens TSVECTOR,
    movie TEXT
);
```

> `\dt` lists all tables in the database.

Now let's insert some quotes.

```sql
INSERT INTO quotes (q_start, q_end, body, movie) VALUES
    (1, 2, 'some text', 'lotr'),
    (1, 2, 'an example quote', 'lotr')
```

To view the inserted quotes.

```sql
SELECT * FROM quotes

+------+-----------+---------+-------------------+-------------------------------+---------+
| id   | q_start   | q_end   | body              | body_tokens                   | movie   |
|------+-----------+---------+-------------------+-------------------------------+---------|
| 1    | 1         | 2       | some text         | <null>                        | lotr    |
| 2    | 1         | 2       | an example quote  | <null>                        | lotr    |
+------+-----------+---------+-------------------+-------------------------------+---------+

```

> Use `Ctrl+L` if you want to clear your terminal screen

<br />

## Full text search

Postgres has types **tsvector** and **tsquery** types to help with full text search.

A tsvector is a normalised form of text where every word has been broken down into lexemes.

```
SELECT * FROM to_tsvector('a most interesting sentence')

+--------------------------+
| to_tsvector              |
|--------------------------|
| 'interest':3 'sentenc':4 |
+--------------------------+

```

A tsquery consists of the lexemes that we are searching for. Different lexemes are combined together using boolean operators.

```
SELECT * FROM to_tsquery('interesting & sentence')

+------------------------+
| plainto_tsquery        |
|------------------------|
| 'interest' & 'sentenc' |
+------------------------+

```

<br />

## Searching for quotes

To search for a particular quote we convert the body column to tsvector and match it against a tsquery using the `@@` operator

```sql
SELECT * FROM quotes
    WHERE to_tsvector(body) @@ plainto_tsquery('example')

+------+-----------+---------+------------------+---------------+---------+
| id   | q_start   | q_end   | body             | body_tokens   | movie   |
|------+-----------+---------+------------------+---------------+---------|
| 2    | 1         | 2       | an example quote | <null>        | lotr    |
+------+-----------+---------+------------------+---------------+---------+

```

By default to_tsvector and to_tsquery don't include stop words like 'an', 'the', 'do' . To include stop words we pass`'simple'`as the first argument.

```sql
SELECT * FROM quotes
    WHERE to_tsvector('simple', body) @@ to_tsquery('simple', 'an')

+------+-----------+---------+------------------+---------------+---------+
| id   | q_start   | q_end   | body             | body_tokens   | movie   |
|------+-----------+---------+------------------+---------------+---------|
| 2    | 1         | 2       | an example quote | <null>        | lotr    |
+------+-----------+---------+------------------+---------------+---------+

```

Instead of calling to_tsvector in the query, we can have a tsvector column called body_tokens and match against it.

```sql
SELECT * FROM quotes
    WHERE body_tokens @@ to_tsquery('simple', "example")
```

We can set up a trigger so that every time there is an insert or update on the table the body_tokens field is modified.

```sql
CREATE TRIGGER tsvectorupdate
    BEFORE INSERT OR UPDATE ON quotes
    FOR EACH ROW EXECUTE PROCEDURE
        tsvector_update_trigger(body_tokens,'pg_catalog.simple', body);
```

<br />

## Setup Rust Backend

To connect to the postgres database we write a backend server in rust. The server will provide two api endpoints
`/insert` and `/search`.

For the webserver we'll use the framework warp. https://github.com/seanmonstar/warp.

Create a new rust project.

```bash
cargo new project-name --bin
```

Add the dependencies to the cargo.toml file.

```toml
[dependencies]
# async runtime on top of which warp is built
tokio = { version = "0.2", features = ["macros"] }
warp = "0.2"
```

Warp uses the concepts of filters to match and respond to requests. Different filters can be composed together to build complex requests.

Let's start with a simple hello world. In the main.rs file.

```rust
use warp::Filter;

#[tokio::main]
async fn main() {
    // any returns a filter which matches any path
    // map composes with the previous filter and changes the extract to "Hello world"
    let routes = warp::any().map(|| "Hello world");

    // runs the server at localhost:8080
    warp::serve(routes).run(([127, 0, 0, 1], 8080)).await;
}
```

Now to test the server we can use curl or any http client. Here we use http-prompt https://github.com/eliangcs/http-prompt

```bash
➜ ~ http-prompt localhost:8080
Version: 1.0.0
http://localhost:8080> get
HTTP/1.1 200 OK
content-length: 11
content-type: text/plain; charset=utf-8
date: Thu, 23 Jul 2020 21:11:22 GMT

Hello world

```

<br />

## Connect to postgres

To connect to the database we use sqlx
https://github.com/launchbadge/sqlx

```toml
# cargo.toml

[dependencies]
sqlx = { version = "0.3", default-features = false, features = [ "runtime-tokio", "macros", "postgres" ] }
```

Inside the main function create a pool of connections to the database.

```rust
// main.rs

use sqlx::postgres::PgPool;
use warp::Filter;

#[tokio::main]
async fn main() {
    let routes = warp::any().map(|| "Hello world");

    let pg_url = "postgres://postgres:mysecretpassword@localhost:5432/postgres";

    let db_pool = PgPool::builder()
        .max_size(5)
        .build(pg_url)
        .await
        .unwrap(); // stop the server if an error occurs

    warp::serve(routes).run(([127, 0, 0, 1], 8080)).await;
}


```

<br />

## Init tables

Now we need to setup the tables and create the trigger. And we do this in a separate function `init_table`.

```rust
// main.rs

use sqlx::postgres::PgPool;
use warp::Filter;

async fn init_table(db_pool: &PgPool) {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS quotes (
            id SERIAL PRIMARY KEY,
            q_start INTEGER,
            q_end INTEGER,
            body TEXT,
            body_tokens TSVECTOR,
            movie TEXT
        );",
    )
    .execute(db_pool)
    .await
    .unwrap();

    // pg returns error if trigger already exists
    // so drop trigger before creating it again
    sqlx::query("DROP TRIGGER IF EXISTS tsvectorupdate ON quotes")
        .execute(db_pool)
        .await
        .unwrap();

    sqlx::query(
        "CREATE TRIGGER tsvectorupdate
            BEFORE INSERT OR UPDATE ON quotes
            FOR EACH ROW
            EXECUTE PROCEDURE
                tsvector_update_trigger(body_tokens, 'pg_catalog.simple', body);
        ",
    )
    .execute(db_pool)
    .await
    .unwrap();
}
```

And then we can call it in the main function.

```rust
init_table(&db_pool).await;
```

<br />

## Insert handler

The insert endpoint will insert parse the json body and insert it into the database. This is how our json body will look like.

```json
{
    "q_start": 0,
    "q_end": 0,
    "body": "",
    "movie": ""
}
```

We create a new filter and handler function to handle our insert endpoint. We use a pg filter to clone our db_pool reference and compose it with insert filter. So we can access the db ref. And to parse the json body use another filter.

```rust
let pg = warp::any().map(move || db_pool.clone());

let insert = warp::path("insert")
        .and(warp::post())
        .and(pg.clone())
        .and(warp::body::json())
        .and_then(handle_insert);
```

To parse the json body into a struct we use serde. https://github.com/serde-rs/serde

```
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

Define a struct to parse our json body

```rust
#[derive(Serialize, Deserialize, Debug)]
struct Quote {
    // id is not part of the request body, but part of the pg row
    #[serde(skip_deserializing)]
    id: i32,
    q_start: i32,
    q_end: i32,
    body: String,
    movie: String,
}
```

Now onto the actual inserting.

```rust
use warp::http::StatusCode;

async fn handle_insert(db_pool: PgPool, quote: Quote) -> Result<impl Reply, Infallible> {
    // destructure the struct
    let Quote {
        q_start,
        q_end,
        body,
        movie,
        ..
    } = quote;


    sqlx::query("INSERT INTO quotes (q_start, q_end, body, movie) VALUES ($1, $2, $3, $4)")
        .bind(q_start)
        .bind(q_end)
        .bind(body)
        .bind(movie)
        .execute(&db_pool)
        .await
        .map(|_| StatusCode::OK)
        // in case execute has an error returns a 500 status code
        .or(Ok(StatusCode::INTERNAL_SERVER_ERROR))
}
```

Testing out.

```bash
http://localhost:8080/insert> q_start:=1
http://localhost:8080/insert> q_end:=2
http://localhost:8080/insert> body="hello"
http://localhost:8080/insert> movie="lotr"
http://localhost:8080/insert> post
HTTP/1.1 200 OK
content-length: 60
content-type: application/json
date: Thu, 23 Jul 2020 22:12:37 GMT

```

<br />

## Search handler

`/search?term="hello"`

We pass the search term as a query param. And return a json array of relevant quotes.

Create a new handler within main to handle our search route.

```rust
// struct to represent our query params.
#[derive(Deserialize)]
struct QueryParams {
    term: String,
};

let search = warp::path("search")
    .and(warp::get())
    .and(pg.clone())
    .and(warp::query::<QueryParams>().map(|q:QueryParams| q.term))
    .and_then(handle_search);

let routes = insert.or(search);
```

And let's write the handler for the search route. We use warp::reply::Response as the return type here as we're returning two types responses, json and statuscode. This is just a libray choice

```rust
use sqlx::postgres::{PgPool, PgQueryAs};

async fn handle_search(db_pool: PgPool, term: String) -> Result<warp::reply::Response, Infallible> {
    sqlx::query_as::<_, Quote>(
        "SELECT * FROM quotes
           WHERE body_tokens @@ plainto_tsquery('simple', $1)",
    )
    .bind(term)
    .fetch_all(&db_pool)
    .await
    .map(|qs| warp::reply::json(&qs).into_response())
    .or(Ok(StatusCode::INTERNAL_SERVER_ERROR.into_response()))
}
```

Add the FromRow trait to the quote struct.

```
#[derive(Serialize, Deserialize, Debug, sqlx::FromRow)]
struct Quote {...
```

Testing out search

```bash
http://localhost:8080> cd search
http://localhost:8080/search> term=="hello"
http://localhost:8080/search> get
HTTP/1.1 200 OK
content-length: 62
content-type: application/json
date: Thu, 23 Jul 2020 22:26:45 GMT

[
    {
        "body": "hello",
        "id": 4,
        "movie": "lotr",
        "q_end": 2,
        "q_start": 1
    }
]
```

And that's it!
