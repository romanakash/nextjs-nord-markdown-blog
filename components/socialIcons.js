import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 1.5rem 0;
    ion-icon {
        font-size: 28px;
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

export default function SocialIcons() {
    return (
        <Wrapper>
            <a href="https://github.com/romanakash" target="blank">
                <ion-icon name="logo-github" />
            </a>
            <a href="https://twitter.com/romanakash27" target="blank">
                <ion-icon name="logo-twitter" />
            </a>
            <a
                href="https://www.linkedin.com/in/roman-akash-b32a29170/"
                target="blank">
                <ion-icon name="logo-linkedin" />
            </a>
        </Wrapper>
    );
}
