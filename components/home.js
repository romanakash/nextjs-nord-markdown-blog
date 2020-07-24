import React from 'react';
import styled, {useTheme} from 'styled-components';

import MainSection from './mainSection';
import BlogList from './blogList';
import Footer from './footer';

const Container = styled.div`
    max-width: 45rem;
    margin: 0 auto;
    padding: 2rem;
`;

export default function Home({posts}) {
    const theme = useTheme();

    return (
        <Container>
            <MainSection />
            <BlogList posts={posts} />
            <Footer />
            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: Helvetica Neue, sans-serif;
                    background-color: ${theme.colors.background};
                    color: ${theme.colors.body};
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </Container>
    );
}
