import React from "react";
//material ui
import { Stack } from "@mui/material";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

const RowWrapper = ({
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
    direction={{ md: "row", xs: "column" }}
    spacing={spacing}
    alignItems={{ md: "center", xs: "flex-start" }}
    justifyContent="flex-start"
  >
    {children}
  </Stack>
);

RowWrapper.defaultProps = {
  spacing: 1,
};
export default RowWrapper;
