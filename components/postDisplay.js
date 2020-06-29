import React from 'react';
import styled, {useTheme} from 'styled-components';
import ReactMarkdown from 'react-markdown/with-html';
import {format} from 'date-fns';

const Container = styled.div``;

const Wrapper = styled.div`
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem;
`;

const Title = styled.a`
    cursor: pointer;
    margin: 0;
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    font-size: 2rem;
    color: ${({theme}) => theme.colors.tint};
`;

const DateLabel = styled.p`
    margin-top: 0.7rem;
    font-family: 'Inter', 'sans-serif';
    font-weight: normal;
    color: ${({theme}) => theme.colors.placeholder};
`;

const MarkdownWrapper = styled.div`
    padding: 1rem 0;
`;

export default function PostDisplay({post: {frontmatter}}) {
    const theme = useTheme();

    const title = frontmatter?.attributes?.title ?? 'Title';
    const description = frontmatter?.attributes?.description ?? 'description';
    const dateArr = frontmatter?.attributes?.date ?? '2020/05/30';
    const [year, month, day] = dateArr.split('/');
    const date = new Date(year, month - 1, day);

    const markdown = frontmatter?.body ?? 'Hello world';

    return (
        <Container>
            <Wrapper>
                <Title>{title}</Title>
                <DateLabel> {format(date, 'do MMM yyy')} • 5 min</DateLabel>
                <MarkdownWrapper>
                    <ReactMarkdown source={markdown} escapeHtml={false} />
                </MarkdownWrapper>
            </Wrapper>
            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                    background-color: ${theme.colors.background};
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </Container>
    );
}
