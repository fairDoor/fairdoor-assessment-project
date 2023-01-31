import React from "react";
import { useRouter } from "next/router";
import { authMethods } from "components/Auth/authMethods";
import ContactForm from "components/Forms/ContactForm";
import { useTheme } from "@mui/material/styles";
import { Paper, Stack, Typography, Button } from "@mui/material";

// shared
import {
  LabTab,
  commonHelpers,
  LoginForm,
  PasswordResetForm,
} from "@fairdoor/shared-code";

import { useSnack } from "components/SnackBar/snackBarContext";
import { routes } from "helpers/const";
import { showSnack } from "helpers/helpers";
import { IContactForm, IAuthMessage } from "types/index";
import { useTranslation } from "next-i18next";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({
  locale,
}: {
  locale: "en" | "fr";
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "backend"])),
    },
  };
};

const Auth = () => {
  const { t } = useTranslation(["common", "backend"]);
  const theme = useTheme();
  const router = useRouter();
  const path = router.pathname;
  const returnUrl = router.query.returnUrl as string;
  const { signup } = router.query;

  const [resetPwd, setResetPwd] = React.useState<boolean>(false);
  const [pwdReset, setPwdreset] = React.useState<boolean>(false);

  const { setSnack } = useSnack();

  const redirectPath = {
    [routes.home]: () => router.push(returnUrl || routes.candidates),
    [routes.login]: () => router.push(returnUrl || routes.candidates),
    [routes.signout]: () => router.push(routes.login),
  };

  const callbackError = (error: IAuthMessage) => {
    console.error("error in callbackError", error);
    showSnack(setSnack, error);
  };

  const callbackSuccess = (code: IAuthMessage) => {
    showSnack(setSnack, code);
    if (resetPwd) {
      setResetPwd(false);
      setPwdreset(true);
    } else if (signup) {
      router.push(returnUrl || routes.home);
    } else {
      (router.query.returnUrl && router.push(returnUrl)) ||
        redirectPath[path]();
    }
  };

  const submitReset = (email: string) =>
    authMethods.passwordReset(
      email,
      `${process.env.NEXT_PUBLIC_PUBLIC_URL}${routes.login}`,
      callbackSuccess,
      callbackError
    );
  const submitCompany = (dataForm: IContactForm) =>
    authMethods.signupCompany(dataForm, callbackSuccess, callbackError);
  const submitLogin = (email: string, pwd: string) =>
    authMethods.signin(email, pwd, callbackSuccess, callbackError);

  const LogIn = () => (
    <Stack
      direction="column"
      alignItems="center"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {pwdReset && (
        <Typography variant="h4">
          {commonHelpers.capitalize(t("account.checkEmail"))}
        </Typography>
      )}
      {!resetPwd ? (
        <LoginForm
          submitMessage={t("login.submitMessage")}
          submitOnClick={submitLogin}
          t={t}
        />
      ) : (
        <PasswordResetForm
          submitMessage={commonHelpers.capitalize(t("account.resetPwd"))}
          submitOnClick={submitReset}
        />
      )}
      <Button
        sx={{ mt: 1 }}
        onClick={() => setResetPwd(!resetPwd)}
        variant="text"
        color="secondary"
      >
        {!resetPwd
          ? commonHelpers.capitalize(t("account.forgotPwd"))
          : commonHelpers.capitalize(t("account.login"))}
      </Button>
    </Stack>
  );

  const SignUp = () => <ContactForm submitOnClick={submitCompany} />;

  const values = [
    {
      index: "0",
      value: routes.login,
      label: t("account.login"),
      element: <LogIn />,
    },
    {
      index: "1",
      value: `${routes.login}?signup=true`,
      label: t("account.signup"),
      element: <SignUp />,
    },
  ] as {
    index: string;
    value: string;
    label: string;
    element: React.ReactNode;
  }[];

  return (
    <Stack
      sx={{
        bgcolor: "background.default",
        height: "100%",
        minHeight: "95vh",
        width: "100%",
        py: 3,
        px: 9,
      }}
      direction="row"
      alignItems="center"
      justifyContent="space-around"
    >
      <Stack
        direction="row"
        sx={{
          mx: 4,
          width: "60%",
          display: { md: "flex", xs: "none" },
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
        >
          <Typography
            sx={{
              color: "primary",
              fontSize: "3rem",
              fontWeight: "bold",
            }}
          >
            Hire people you love working <span> </span>
            <span
              style={{
                borderBottom: `8px solid ${theme.palette.secondary.main}`,
                paddingRight: 1,
              }}
            >
              with
            </span>
          </Typography>

          <List sx={{ p: 4 }}>
            {[
              "Post your jobs and get first interviews with candidates for free.",
              "Design custom assessments and pay candidates for their work.",
              "That money goes to talents, not headhunters.",
            ].map((item, index) => (
              <ListItem key={index} sx={{ pb: 3 }}>
                <ListItemIcon>
                  <RadioButtonUncheckedIcon color="secondary" />
                </ListItemIcon>
                <Typography variant="h3">{item}</Typography>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>

      <Paper
        sx={{
          display: "flex",
          my: 3,
          pt: 2,
          height: "fit-content",
          width: { xs: "17rem", sm: "24rem" },
          alignItems: "center",
          flexFlow: "column nowrap",
          justifyContent: "center",
        }}
      >
        <LabTab values={values} defaultValue={signup ? "1" : "0"} />
      </Paper>
    </Stack>
  );
};

export default Auth;
