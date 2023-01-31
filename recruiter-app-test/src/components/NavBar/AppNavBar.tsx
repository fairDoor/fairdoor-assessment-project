import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
//shared
import {
  ResponsiveAppBar,
  ButtonLink,
  AccountMenu,
  commonHelpers,
  Loading,
  constants,
} from "@fairdoor/shared-code";

// auth
import { auth } from "config/firebaseInit";
import { useAuthState } from "react-firebase-hooks/auth";

// helpers
import { routes } from "helpers/const";
import { getUserId, showSnack } from "helpers/helpers";
// logo
const Logo_black =
  "https://firebasestorage.googleapis.com/v0/b/fairdoor-app.appspot.com/o/fairdoor%2FLogo_black.png?alt=media&token=ea59c95a-8523-4c3b-b405-264ca768c8db";

// Material ui
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";

import Logout from "@mui/icons-material/Logout";

// other
import { authMethods } from "components/Auth/authMethods";
import { useSnack } from "components/SnackBar/snackBarContext";

const { website } = constants;

const AccountMenuWithSettings = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { setSnack } = useSnack();

  const items = [
    {
      label: t("account.signout"),
      icon: <Logout color="primary" />,
      onClick: () =>
        authMethods.signout((code) => {
          showSnack(setSnack, code);
          router.push(routes.login);
        }),
    },
  ];
  return (
    <AccountMenu
      items={items}
      userIcon={{ tooltip: "Account", color: "black" }}
    />
  );
};

const AuthBar = ({ uid }: { uid: string | null | undefined }) => {
  const { t } = useTranslation();
  if (!uid) {
    return (
      <React.Fragment>
        <ButtonLink
          to={routes.login}
          variant="text"
          message={t("account.login").toUpperCase()}
          color="primary"
        />
        <Divider orientation="vertical" flexItem variant="middle" />
        <Button href="https://www.fairdoor.co/pages/company-form">
          {t("account.signup").toUpperCase()}
        </Button>
      </React.Fragment>
    );
  }
  return <AccountMenuWithSettings />;
};

function AppNavBar({ uid }: { uid: string | null | undefined }) {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const pages = [
    {
      path: undefined,
      label: t("navbar.howitworks"),
      disabled: false,
      to: website,
      badgeContent: undefined,
    },
  ];

  const nonUserPages = [
    {
      path: undefined,
      label: t("navbar.candidate"),
      disabled: false,
      to: "https://jobs.fairdoor.co",
      badgeContent: undefined,
    },
  ];
  const userPages = [
    {
      path: routes.candidates,
      label: commonHelpers.capitalize(t("candidates.name")),
      onClick: () => {
        router.push(routes.candidates);
      },
      disabled: false,
      to: null,
      badgeContent: undefined, // add number of candidates in "new"
    },
  ];

  return (
    <ResponsiveAppBar
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        color: "primary",
        bgcolor: "white",
      }}
      pages={uid ? [...pages, ...userPages] : [...pages, ...nonUserPages]}
      logo={{
        image: Logo_black,
        onClick: () => router.push(routes.home),
      }}
      theme={theme}
      currentPath={router.pathname}
      anchorElNav={anchorElNav}
      setAnchorElNav={setAnchorElNav}
    >
      <AuthBar uid={uid} />
    </ResponsiveAppBar>
  );
}

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

const AppBar: React.FunctionComponent<Props> = (props) => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <Loading />;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppNavBar uid={getUserId(user)} />
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "center", p: 0 }}>
        {props.children}
      </Box>
    </React.Fragment>
  );
};

export default AppBar;
