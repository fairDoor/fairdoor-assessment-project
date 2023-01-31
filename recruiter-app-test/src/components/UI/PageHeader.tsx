import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export interface IPageHeaderProps {
  headerTitle: string;
}

function PageHeader(props: IPageHeaderProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: theme.palette.background.default,
        height: "2rem",
      }}
    >
      <Typography
        color="primary"
        sx={{ borderBottom: "3px solid black" }}
        variant="h3"
      >
        {props.headerTitle}
      </Typography>
    </Box>
  );
}

export default PageHeader;
