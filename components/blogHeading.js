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
    font-size: 2rem;
    color: ${({theme}) => theme.colors.tint};
`;

const DateLabel = styled.p`
    margin-top: 0.5rem;
    font-family: 'Inter', 'sans-serif';
    font-weight: normal;
    font-size: 1.2rem;
    color: ${({theme}) => theme.colors.placeholder};
`;

const Description = styled.p`
    margin-top: 1rem;
    font-size: 1.2rem;
    font-family: 'Inter', 'sans-serif';
    font-weight: normal;
    color: ${({theme}) => theme.colors.primary};
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
