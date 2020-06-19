import Document, {Html, Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

class CustomDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);

        const sheet = new ServerStyleSheet();

        const page = ctx.renderPage((App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        );

        const styleTags = sheet.getStyleElement();

        return {...page, styleTags, ...initialProps};
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:300,400,500,900"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Rubik:300,400,500,900"
                        rel="stylesheet"
                    />
                    {this.props.styleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
