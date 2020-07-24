import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Fork = styled.a`
    font-family: 'Inconsolata', 'sans-serif';
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.7rem;
    color: ${({theme}) => theme.colors.placeholder};
`;

const Dot = styled.p`
    margin: 0 0.2rem;
    color: ${({theme}) => theme.colors.placeholder};
`;

export default function Footer() {
    return (
        <Container>
            <Fork href="https://github.com/" target="blank">
                github
            </Fork>
            <Dot>•</Dot>
            <Fork href="https://twitter.com/" target="blank">
                twitter
            </Fork>
            <Dot>•</Dot>
            <Fork href="https://linkedin.com/" target="blank">
                linkedin
            </Fork>
        </Container>
    );
}
