import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export interface IWrapperProps {
  children: React.ReactElement;
  label: string;
}

function Wrapper(props: IWrapperProps) {
  return (
    <Box
      sx={{
        display: "flex",
        m: 1,
        width: "100%",
        alignItems: "flex-start",
        flexFlow: "column wrap",
      }}
    >
      <Typography variant="h3" component="p">
        
        {props.label}
      </Typography>
      {props.children}
    </Box>
  );
}

export default Wrapper;
