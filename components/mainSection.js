import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
    margin-top: 2rem;
`;

const Heading = styled.h1`
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    color: ${({theme}) => theme.colors.tint};
    margin-bottom: 0;
`;

const Description = styled.div`
    margin-top: 1rem;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 1.2rem;
    color: ${({theme}) => theme.colors.body};
`;

const SocialIcons = styled.div`
    margin: 1.5rem 0;
    ion-icon {
        font-size: 28px;
        margin-right: 1rem;
        color: ${({theme}) => theme.colors.body};
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
        <Wrapper>
            <Heading>Nathan Drake</Heading>
            <Description>Professional treasure hunter</Description>
            <SocialIcons>
                <a href="https://github.com/" target="blank">
                    <ion-icon name="logo-github" />
                </a>
                <a href="https://twitter.com/" target="blank">
                    <ion-icon name="logo-twitter" />
                </a>
                <a href="https://www.linkedin.com/" target="blank">
                    <ion-icon name="logo-linkedin" />
                </a>
            </SocialIcons>
            <HorizontalLine />
        </Wrapper>
    );
}
