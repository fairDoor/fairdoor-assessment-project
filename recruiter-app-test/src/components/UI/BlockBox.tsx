import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TypographyVariant } from "types/index";

export interface IBlockWithTitleProps {
  blockTitle: string;
  children: React.ReactNode;
  variant?: TypographyVariant;
  direction: "column" | "row" | object;
}

function BlockBox(props: IBlockWithTitleProps) {
  const { blockTitle, children, variant, direction } = props;
  return (
    <Box
      sx={{
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
      {children}
    </Box>
  );
}

BlockBox.defaultProps = {
  variant: "h4",
  direction: "column",
};

export default BlockBox;
