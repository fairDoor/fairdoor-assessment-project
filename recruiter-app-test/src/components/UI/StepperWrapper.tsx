import * as React from "react";

import { Stepper } from "@fairdoor/shared-code";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { commonHelpers } from "@fairdoor/shared-code";

import { IStep, ButtonVariant } from "types/index";

interface Props {
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
const StepperWrapper = (props: Props) => {
  const { button, openForm, steps, activeStep } = props;

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        m: 2,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {button && (
        <Button
          fullWidth
          onClick={button.onClick}
          color={button.color || "primary"}
          variant={button.variant || "contained"}
          data-cy={button.testId || "test-button"}
        >
          {!openForm && <AddIcon />}
          {commonHelpers.capitalize(button.message)}
        </Button>
      )}
      {openForm && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            mt: 4,
            justifyContent: "center",
          }}
        >
          {steps && (
            <Stepper
              steps={steps}
              activeStep={activeStep}
              orientation="vertical"
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default StepperWrapper;
