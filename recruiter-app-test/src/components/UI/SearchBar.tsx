import React, { useEffect, useRef } from "react";
import _ from "lodash";
import Stack from "@mui/material/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InputBase from "@mui/material/InputBase";
type Props = {
  placeholder: string;
  handleChange: (a: string) => void;
  autoFocus?: boolean;
  //testid?: string,
  width?: string;
};

const applySearch = (search: string, callback: (a: string) => void) => {
  callback(search);
};

const debouncedSearch = _.debounce(applySearch, 100);

function SearchBar(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.autoFocus && inputRef && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        width: props.width,
        borderRadius: "1.25rem",
        height: "2.5rem",
        backgroundColor: "white",
        border: (theme) => `1px solid ${theme.palette.common.black}`,
      }}
    >
      <SearchRoundedIcon color="primary" sx={{ ml: "1rem" }} />
      <InputBase
        ref={inputRef}
        type="text"
        placeholder={props.placeholder}
        onChange={(event) =>
          debouncedSearch(event.target.value, props.handleChange)
        }
        //data-testid={props.testid}
      />
    </Stack>
  );
}
SearchBar.defaultProps = {
  classNameWrapper: {},
  placeholder: "",
  width: "12rem",
};

export default SearchBar;
