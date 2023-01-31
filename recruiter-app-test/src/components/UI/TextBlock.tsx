import * as React from "react";
import { Paper, Typography } from "@mui/material";

interface ITextBlockProps {
  text: string;
}

const TextBlock: React.FunctionComponent<ITextBlockProps> = ({ text }) => {
  return (
    <Paper sx={{ mt: 3 }}>
      <Typography variant="body1" sx={{ m: 3, p: 1 }}>
        {text}
      </Typography>
    </Paper>
  );
};

export default TextBlock;
