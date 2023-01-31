import React from "react";
//material ui
import { Stack } from "@mui/material";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

const ColumnWrapper = ({
  children,
  sx,
  spacing,
}: {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  spacing?: number;
}) => (
  <Stack
    sx={sx}
    direction="column"
    spacing={spacing}
    justifyContent="flex-start"
  >
    {children}
  </Stack>
);

ColumnWrapper.defaultProps = {
  spacing: 0,
};
export default ColumnWrapper;
