import React from 'react';
import styled, {useTheme} from 'styled-components';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown/with-html';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {nord} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import readingTime from 'reading-time';

import BlogHeading from './blogHeading';
import Footer from './footer';

const Container = styled.div`
    max-width: 45rem;
    margin: 0 auto;
    padding: 2rem;
`;

const HeaderWrapper = styled.div`
    padding-bottom: 1.5rem;
`;

const Heading = styled.h2`
    cursor: pointer;
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    color: ${({theme}) => theme.colors.placeholder};
`;

const MarkdownWrapper = styled.div`
    padding: 1rem 0;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Inter', 'sans-serif';
        color: ${({theme}) => theme.colors.tint};
        font-weight: 800;
    }
    hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 2px solid ${({theme}) => theme.colors.shade};
        margin: 1em 0;
        padding: 0;
    }
    p {
        font-family: 'Inter', 'sans-serif';
        font-size: 1.2rem;
        font-weight: 300;
        margin: 1.5rem 0;
        line-height: 1.7rem;
    }
    strong {
        font-weight: 700;
    }
    blockquote {
        border-left: 10px solid ${({theme}) => theme.colors.shade};
        margin: 1.5rem 0;
        padding: 0.2rem 1.5rem;
    }
    li {
        font-family: 'Inter', 'sans-serif';
        font-size: 1.2rem;
        font-weight: 300;
        padding: 0.5rem 0;
        line-height: 1.7rem;
        list-style-position: inside;
    }
    table {
        font-family: 'Inter', 'sans-serif';
        font-size: 1.2rem;
        font-weight: 300;
        margin: 2rem 0;
        line-height: 1.7rem;
    }
    th,
    td {
        padding: 0.5rem 0;
        padding-right: 5rem;
    }
    th {
        padding-bottom: 1.5rem;
        font-size: 1.2rem;
        font-weight: 700;
        line-height: 1.7rem;
    }
    a {
        font-family: 'Inter', 'sans-serif';
        font-size: 1.2rem;
        font-weight: 300;
        margin: 2rem 0;
        line-height: 1.7rem;
        color: ${({theme}) => theme.colors.tint};
    }
    img {
        max-width: 100%;
        height: auto;
    }
    code {
        font-family: 'Inconsolata', 'sans-serif';
        font-size: 1.2rem;
        font-weight: 400;
        margin: 2rem 0;
    }
`;

const CodeBlock = ({language, value}) => {
    return (
        <SyntaxHighlighter
            language={language}
            style={nord}
            customStyle={{
                fontSize: '1rem',
                borderRadius: 5,
                padding: '1rem',
                marginBottom: '2rem',
            }}>
            {value}
        </SyntaxHighlighter>
    );
};

export default function PostDisplay({post: {slug, frontmatter}}) {
    const theme = useTheme();

    const title = frontmatter?.attributes?.title ?? 'Title';
    const description = frontmatter?.attributes?.description ?? 'description';
    const dateArr = frontmatter?.attributes?.date ?? '2020/05/30';
    const [year, month, day] = dateArr.split('/');
    const date = new Date(year, month - 1, day);

    const markdown = frontmatter?.body ?? 'Hello world';

    const stats = readingTime(markdown);
    const duration = Math.round(stats.minutes) + ' min';

    return (
        <Container>
            <HeaderWrapper>
                <Link href={'/'}>
                    <Heading>Nathan Drake</Heading>
                </Link>
            </HeaderWrapper>
            <BlogHeading
                key={slug}
                slug={slug}
                title={title}
                date={date}
                duration={duration}
                description={description}
                showDescription={false}
            />
            <MarkdownWrapper>
                <ReactMarkdown
                    source={markdown}
                    escapeHtml={false}
                    renderers={{code: CodeBlock}}
                />
            </MarkdownWrapper>
            <Footer />
            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: Helvetica Neue, sans-serif;
                    background-color: ${theme.colors.background};
                    color: ${theme.colors.body};
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </Container>
    );
}
