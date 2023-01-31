import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Hire outstanding go-to-market executives in the United States. 
            We make sure the fit is perfect - because you work with talents during the hiring process through paid assessments."
          />
          <meta property="og:hashtag" content="paidassessment" />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/fairdoor-app.appspot.com/o/fairdoor%2F516.png?alt=media&token=a11f305e-b1a9-4093-85e1-e3657ea08341"
          />
          <meta
            property="og:image:secure_url"
            content="https://firebasestorage.googleapis.com/v0/b/fairdoor-app.appspot.com/o/fairdoor%2F516.png?alt=media&token=a11f305e-b1a9-4093-85e1-e3657ea08341"
          />
          <meta content="image/*" property="og:image:type" />
          <link rel="icon" href="/static/img/logo.png" />
          <link rel="apple-touch-icon" href="static/img/logo.png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
