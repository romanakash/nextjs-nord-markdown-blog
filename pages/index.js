import Head from 'next/head';
import styled, {ThemeProvider} from 'styled-components';

import MainSection from '../components/mainSection';
import BlogList from '../components/blogList';

import {mainTheme} from '../styles/theme';

const Container = styled.div`
    background-color: ${({theme}) => theme.colors.background};
`;

export default function Home() {
    return (
        <ThemeProvider theme={mainTheme}>
            <Container>
                <Head>
                    <title>Blog</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    <MainSection />
                    <BlogList />
                </main>
                <style jsx global>{`
                    html,
                    body {
                        padding: 0;
                        margin: 0;
                        font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
                            Droid Sans, Helvetica Neue, sans-serif;
                    }
                    * {
                        box-sizing: border-box;
                    }
                `}</style>
            </Container>
        </ThemeProvider>
    );
}
