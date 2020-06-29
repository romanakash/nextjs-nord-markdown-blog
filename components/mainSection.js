import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 30vh;
    background-color: ${({theme}) => theme.colors.shade};
`;

const Wrapper = styled.header`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem;
`;

const Heading = styled.h1`
    margin: 0 0 0 0rem;
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    color: ${({theme}) => theme.colors.primary};
`;

const Description = styled.div`
    margin-top: 1.1rem;
    font-family: 'Inter', sans-serif;
    font-weight: normal;
    font-size: 1.1rem;
    color: ${({theme}) => theme.colors.primary};
`;

export default function MainSection() {
    return (
        <Container>
            <Wrapper>
                <Heading>Nathan Drake</Heading>
                <Description>Professional treasure hunter</Description>
            </Wrapper>
        </Container>
    );
}
