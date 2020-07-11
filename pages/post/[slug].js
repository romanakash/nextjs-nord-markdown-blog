import React from 'react';
import {ThemeProvider} from 'styled-components';
import Head from 'next/head';
import fs from 'fs';
import fm from 'front-matter';
import path from 'path';

import {mainTheme} from '../../styles/theme';

import PostDisplay from '../../components/postDisplay';

export default function Post({post}) {
    const title = post?.frontmatter?.attributes?.title ?? 'Title';

    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={mainTheme}>
                <PostDisplay post={post} />
            </ThemeProvider>
        </>
    );
}

export async function getStaticPaths() {
    const files = fs.readdirSync(process.cwd() + '/_posts');

    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace('.md', ''),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params: {slug}}) {
    const markdown = fs
        .readFileSync(path.join('_posts/' + slug + '.md'))
        .toString();
    const frontmatter = fm(markdown);

    return {
        props: {
            post: {
                slug,
                frontmatter,
            },
        },
    };
}
