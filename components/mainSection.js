import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height: 30vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.shade};
`;

const Wrapper = styled.div`
    width: 60vw;
    @media (max-width: 700px) {
        width: 90vw;
    }
`;

const Heading = styled.h1`
    margin: 0 0 0 0rem;
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    color: ${({theme}) => theme.colors.primary};
`;

const Description = styled.header`
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
