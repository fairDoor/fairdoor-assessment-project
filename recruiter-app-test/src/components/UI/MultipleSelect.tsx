import React from "react";
//mui
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";

import { ICommonSelect, ISelectItem } from "types/index";
import { LabelSelectWrapper } from "@fairdoor/shared-code";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "fit-content",
    },
  },
};

// TODO: share code
interface IMultipleLabelSelect extends ICommonSelect {
  value: ISelectItem[];
  onChange: (e: string[]) => void;
  itemsToSelect: ISelectItem[];
  renderLabel: (selectedNames: string[]) => string[];
  boxWidth?: string;
}

const MultipleLabelSelect = ({
  label,
  value,
  onChange,
  itemsToSelect,
  variant,
  sx,
  sizeLabel,
  required,
  renderLabel,
  boxWidth,
}: IMultipleLabelSelect) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const splittedValue = typeof value === "string" ? value.split(",") : value;
    onChange(splittedValue);
  };
  const valueInSelect = value.map((item) => item.name);
  return (
    <LabelSelectWrapper
      label={label ?? ""}
      variant={variant}
      sx={sx}
      sizeLabel={sizeLabel}
      required={required}
      boxWidth={boxWidth}
    >
      <Select
        // fond blanc
        multiple={true}
        displayEmpty
        id={`multiple-select-${label}`}
        value={valueInSelect}
        renderValue={(selected: string[]) => {
          const labels = renderLabel(selected);
          return (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {labels.map((value, index) => (
                <Chip key={index} variant="outlined" label={value} />
              ))}
            </Box>
          );
        }}
        onChange={handleChange}
        required
        MenuProps={MenuProps}
      >
        {itemsToSelect.map((item, index) => (
          <MenuItem key={index} value={item.name}>
            <Checkbox checked={valueInSelect.includes(item.name)} />
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Select>
    </LabelSelectWrapper>
  );
};

MultipleLabelSelect.defaultProps = {
  variant: "outlined",
  sx: {},
  sizeLabel: "h3",
  required: true,
  boxWidth: "fit-content",
};

export default MultipleLabelSelect;
