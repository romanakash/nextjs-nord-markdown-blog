import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {format} from 'date-fns';

const Wrapper = styled.div``;

const Title = styled.a`
    cursor: pointer;
    margin: 0;
    font-family: 'Rubik', sans-serif;
    font-weight: 600;
    font-size: 1.75rem;
    color: ${({theme}) => theme.colors.tint};
`;

const DateLabel = styled.p`
    margin: 0;
    margin-top: 0.8rem;
    font-family: 'Inter', 'sans-serif';
    font-weight: normal;
    font-size: 1.2rem;
    color: ${({theme}) => theme.colors.placeholder};
`;

const Description = styled.p`
    margin-top: 0.7rem;
    font-size: 1.1rem;
    font-family: 'Inter', 'sans-serif';
    font-weight: 300;
    color: ${({theme}) => theme.colors.body};
`;

export default function BlogHeading({
    slug,
    title,
    date,
    duration,
    description,
    showDescription,
}) {
    return (
        <Wrapper>
            <Link href={'/post/[slug]'} as={`/post/${slug}`}>
                <Title>{title}</Title>
            </Link>
            <DateLabel>
                {' '}
                {format(date, 'do MMM yyy')} • {duration}
            </DateLabel>
            {showDescription ? <Description>{description}</Description> : null}
        </Wrapper>
    );
}
