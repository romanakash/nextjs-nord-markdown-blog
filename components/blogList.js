import React from 'react';
import styled, {useTheme} from 'styled-components';
import Link from 'next/link';
import {format} from 'date-fns';

const Container = styled.div``;

const Wrapper = styled.div`
    max-width: 45rem;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem;
`;

const BlogItem = styled.article`
    margin-bottom: 4rem;
`;

const Title = styled.a`
    cursor: pointer;
    margin: 0;
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
    color: ${({theme}) => theme.colors.tint};
`;

const DateLabel = styled.p`
    margin-top: 0.7rem;
    font-family: 'Inter', 'sans-serif';
    font-weight: normal;
    color: ${({theme}) => theme.colors.placeholder};
`;

const Description = styled.p`
    margin-top: 1rem;
    font-family: 'Inter', 'sans-serif';
    font-weight: normal;
    color: ${({theme}) => theme.colors.primary};
`;

export default function BlogList({posts}) {
    const theme = useTheme();

    return (
        <Container>
            <Wrapper>
                {posts.map(({slug, frontmatter}) => {
                    const title = frontmatter?.attributes?.title ?? 'Title';
                    const description =
                        frontmatter?.attributes?.description ?? 'description';
                    const dateArr =
                        frontmatter?.attributes?.date ?? '2020/05/30';
                    const [year, month, day] = dateArr.split('/');
                    const date = new Date(year, month - 1, day);

                    return (
                        <BlogItem key={slug}>
                            <Link href={'/post/[slug]'} as={`/post/${slug}`}>
                                <Title>{title}</Title>
                            </Link>
                            <DateLabel>
                                {format(date, 'do MMM yyy')} • 5 min
                            </DateLabel>
                            <Description>{description}</Description>
                        </BlogItem>
                    );
                })}
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
