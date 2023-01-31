import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { TypographyVariant } from "types/index";
import { useTheme } from "@mui/material/styles";

export interface IBlockWithTitleProps {
  blockTitle: string;
  children: React.ReactNode;
  variant?: TypographyVariant;
  direction: "column" | "row" | object;
}

function BlockWithTitle(props: IBlockWithTitleProps) {
  const { blockTitle, children, variant, direction } = props;
  const theme = useTheme();
  return (
    <Paper
      sx={{
        boxShadow: "none",
        border: `1px solid ${theme.palette.primary.light}`,
        display: "flex",
        flexDirection: `${direction}`,
        height: "100%",
        width: "100%",
        my: 2,
        mx: 1,
        p: 2,
      }}
    >
      <Typography sx={{ pb: 1, pr: 2 }} variant={variant}>
        {blockTitle}
      </Typography>
      <Divider light />
      {children}
    </Paper>
  );
}

BlockWithTitle.defaultProps = {
  variant: "h4",
  direction: "column",
};

export default BlockWithTitle;
