import React from 'react';
import styled, {ThemeProvider, useTheme} from 'styled-components';
import Head from 'next/head';
import fs from 'fs';
import fm from 'front-matter';

import Home from '../components/home';
import {mainTheme} from '../styles/theme';

export default function Main({posts}) {
    return (
        <>
            <Head>
                <title>Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={mainTheme}>
                <Home posts={posts} />
            </ThemeProvider>
        </>
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
