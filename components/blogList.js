import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Wrapper = styled.div`
    padding: 2rem 0;
    width: 60vw;
    @media (max-width: 700px) {
        width: 90vw;
    }
`;

const BlogItem = styled.article`
    margin-bottom: 4rem;
`;

const Title = styled.h2`
    margin: 0;
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    color: ${({theme}) => theme.colors.primary};
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

export default function BlogList() {
    return (
        <Container>
            <Wrapper>
                <BlogItem>
                    <Title>Blog Title 1</Title>
                    <DateLabel>10th Jan 2020 • 5 min</DateLabel>
                    <Description>Short and clean</Description>
                </BlogItem>
                <BlogItem>
                    <Title>Blog Title 1</Title>
                    <DateLabel>10th Jan 2020 • 5 min</DateLabel>
                    <Description>Short and clean</Description>
                </BlogItem>
                <BlogItem>
                    <Title>Blog Title 1</Title>
                    <DateLabel>10th Jan 2020 • 5 min</DateLabel>
                    <Description>Short and clean</Description>
                </BlogItem>
            </Wrapper>
        </Container>
    );
}
