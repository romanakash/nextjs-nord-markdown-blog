import Head from 'next/head';
import styled, {ThemeProvider} from 'styled-components';
import fs from 'fs';
import fm from 'front-matter';

import MainSection from '../components/mainSection';
import BlogList from '../components/blogList';

import {mainTheme} from '../styles/theme';

const Container = styled.div`
    margin: 0;
    max-width: 45rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0 2rem;
    background-color: ${({theme}) => theme.colors.background};
`;

export default function Home({posts}) {
    return (
        <ThemeProvider theme={mainTheme}>
            <Container>
                <Head>
                    <title>Blog</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    <MainSection />
                    <BlogList posts={posts} />
                </main>
                <style jsx global>{`
                    html,
                    body {
                        padding: 0;
                        margin: 0;
                        font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
                            Droid Sans, Helvetica Neue, sans-serif;
                    }
                    * {
                        box-sizing: border-box;
                    }
                `}</style>
            </Container>
        </ThemeProvider>
    );
}

export async function getStaticProps() {
    const files = fs.readdirSync(process.cwd() + '/_posts');

    const posts = files.map((filename) => {
        const markdown = fs.readFileSync('./_posts/' + filename).toString();

        const frontmatter = fm(markdown);

        return {
            slug: filename.replace('.md', ''),
            frontmatter,
        };
    });

    return {
        props: {
            posts,
        },
    };
}
