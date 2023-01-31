import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { TypographyVariant } from "types/index";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { commonHelpers } from "@fairdoor/shared-code";

type IProps = {
  label: string;
  sx: SxProps<Theme>;
  checked: boolean;
  setChecked: (a: boolean) => void;
  sizeLabel?: TypographyVariant;
  boxWidth?: string;
};

const SwitchLabel: React.FunctionComponent<IProps> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setChecked(event.target.checked);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100%",
        width: props.boxWidth,
      }}
    >
      <Typography variant={props.sizeLabel}>
        {commonHelpers.capitalize(props.label)}
      </Typography>

      <FormGroup sx={props.sx}>
        <Switch
          aria-label={props.label}
          checked={props.checked}
          onChange={handleChange}
        />
      </FormGroup>
    </Stack>
  );
};

SwitchLabel.defaultProps = {
  sx: {},
  sizeLabel: "h5",
  boxWidth: "fit-content",
};

export default SwitchLabel;
