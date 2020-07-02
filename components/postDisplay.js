import React from 'react';
import styled, {useTheme} from 'styled-components';
import ReactMarkdown from 'react-markdown/with-html';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {nord} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import readingTime from 'reading-time';

import BlogHeading from './blogHeading';

const Container = styled.div`
    max-width: 45rem;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem;
`;

const MarkdownWrapper = styled.div`
    padding: 1rem 0;
    h2 {
        font-family: 'Inter', 'sans-serif';
        color: ${({theme}) => theme.colors.tint};
        font-weight: 800;
    }
    p {
        font-family: 'Inter', 'sans-serif';
        font-size: 1.2rem;
        font-weight: 300;
        margin: 2rem 0;
        line-height: 1.7rem;
    }
    img {
        max-width: 100%;
        height: auto;
    }
`;

const CodeBlock = ({language, value}) => {
    return (
        <SyntaxHighlighter
            language={language}
            style={nord}
            wrapLines={true}
            customStyle={{
                fontSize: '1rem',
                borderRadius: 5,
                padding: '1rem',
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
            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
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
