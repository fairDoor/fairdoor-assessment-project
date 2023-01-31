import * as React from "react";

import { SideBar, constants } from "@fairdoor/shared-code";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import PageHeader from "components/UI/PageHeader";
import { IStep, ButtonVariant } from "types/index";

import StepperWrapper from "components/UI/StepperWrapper";
const { drawerWidth } = constants;

interface Props {
  children: React.ReactNode;
  wrapperMainLabel: string;
  button?: {
    onClick: () => void;
    message: string;
    color?: "primary" | "secondary";
    variant?: ButtonVariant;
    testId?: string;
  };
  openForm: boolean;
  steps: IStep[];
  activeStep: number;
}
const SideBarStepper = (props: Props) => {
  const { wrapperMainLabel, children, button, openForm, steps, activeStep } =
    props;

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <SideBar drawerWidth={drawerWidth}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            m: 2,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <StepperWrapper
            button={button}
            openForm={openForm}
            steps={steps}
            activeStep={activeStep}
          />
        </Box>
      </SideBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          p: 4,
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <PageHeader headerTitle={wrapperMainLabel} />
        {children}
      </Box>
    </Box>
  );
};

export default SideBarStepper;
