import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";

import { appWithTranslation } from "next-i18next";

import AppBar from "components/NavBar/AppNavBar";
import { SnackProvider } from "components/SnackBar/snackBarContext";
// mui
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";

// shared code
import { theme, Loading, } from "@fairdoor/shared-code";
import "../styles/main.scss";

function App({ Component, pageProps }: AppProps) {


  if (typeof window !== "undefined") {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <ThemeProvider theme={theme}>

            <SnackProvider>

              <AppBar>
                <Component {...pageProps} />
              </AppBar>
            </SnackProvider>

        </ThemeProvider>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="column"
          sx={{ width: "100%", height: "100%", p: 1 }}
        >
          <Loading />
        </Stack>
      </>
    );
  }
}

export default appWithTranslation(App);
