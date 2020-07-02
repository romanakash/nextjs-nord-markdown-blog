import React, {Fragment} from 'react';
import styled, {useTheme} from 'styled-components';
import readingTime from 'reading-time';

import BlogHeading from './blogHeading';

const Container = styled.div``;

const Separator = styled.div`
    height: 2rem;
`;

export default function BlogList({posts}) {
    const theme = useTheme();

    return (
        <Container>
            {posts.map(({slug, frontmatter}) => {
                const title = frontmatter?.attributes?.title ?? 'Title';
                const description =
                    frontmatter?.attributes?.description ?? 'description';
                const dateArr = frontmatter?.attributes?.date ?? '2020/05/30';
                const [year, month, day] = dateArr.split('/');
                const date = new Date(year, month - 1, day);

                const markdown = frontmatter?.body ?? 'Hello world';

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
                        />
                    </Fragment>
                );
            })}
            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                    background-color: ${theme.colors.background};
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </Container>
    );
}
