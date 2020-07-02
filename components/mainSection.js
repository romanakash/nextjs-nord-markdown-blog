import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: ${({theme}) => theme.colors.background};
`;

const Wrapper = styled.header`
    margin-top: 3rem;
`;

const Heading = styled.h1`
    margin: 0 0 0 0rem;
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    color: ${({theme}) => theme.colors.tint};
`;

const Description = styled.div`
    margin-top: 1.1rem;
    font-family: 'Inter', sans-serif;
    font-weight: normal;
    font-size: 1.2rem;
    color: ${({theme}) => theme.colors.primary};
`;

const SocialIcons = styled.div`
    margin: 1.5rem 0;
    ion-icon {
        font-size: 32px;
        margin-right: 1rem;
        color: ${({theme}) => theme.colors.primary};
    }
    ion-icon:hover {
        color: ${({theme}) => theme.colors.shade};
    }
    a:active,
    a:focus {
        outline: none;
    }
`;

const HorizontalLine = styled.hr`
    display: block;
    height: 1px;
    border: 0;
    border-top: 2px solid ${({theme}) => theme.colors.shade};
    margin: 1em 0;
    padding: 0;
`;

export default function MainSection() {
    return (
        <Container>
            <Wrapper>
                <Heading>Nathan Drake</Heading>
                <Description>Professional treasure hunter</Description>
                <SocialIcons>
                    <a href="https://github.com/romanakash" target="blank">
                        <ion-icon name="logo-github" />
                    </a>
                    <a href="https://twitter.com/romanakash27" target="blank">
                        <ion-icon name="logo-twitter" />
                    </a>
                </SocialIcons>
                <HorizontalLine />
            </Wrapper>
        </Container>
    );
}
