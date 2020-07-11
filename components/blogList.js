import React, {Fragment} from 'react';
import styled from 'styled-components';
import readingTime from 'reading-time';

import BlogHeading from './blogHeading';

const Container = styled.div``;

const Separator = styled.div`
    height: 2rem;
`;

export default function BlogList({posts}) {
    const sortedPosts = posts
        .map(({slug, frontmatter}) => {
            const dateArr = frontmatter?.attributes?.date ?? '1970/1/1';
            const [year, month, day] = dateArr.split('/');
            const date = new Date(year, month - 1, day);

            return {slug, frontmatter: {...frontmatter, date}};
        })
        .sort((a, b) => a.frontmatter?.date < b.frontmatter?.date);

    return (
        <Container>
            {sortedPosts.map(({slug, frontmatter}) => {
                const title = frontmatter?.attributes?.title ?? 'Title';
                const description =
                    frontmatter?.attributes?.description ?? 'description';
                const markdown = frontmatter?.body ?? 'Hello world';
                const date = frontmatter?.date ?? new Date(1970, 0, 1);

                const stats = readingTime(markdown);
                const duration = Math.round(stats.minutes) + ' min';

                return (
                    <Fragment key={slug}>
                        <Separator />
                        <BlogHeading
                            slug={slug}
                            title={title}
                            date={date}
                            duration={duration}
                            description={description}
                            showDescription={true}
                        />
                    </Fragment>
                );
            })}
        </Container>
    );
}
