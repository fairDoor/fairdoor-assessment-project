import * as React from "react";
import {
  GridFilterInputValueProps,
  GridColTypeDef,
  GridFilterItem,
  GridCellParams,
} from "@mui/x-data-grid-pro";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

function buildApplyDateFilterFn(
  filterItem: GridFilterItem,
  compareFn: (value1: number, value2: number) => boolean,
  showTime = false
) {
  if (!filterItem.value) {
    return null;
  }
  const filterValueMs = filterItem.value.getTime();

  return ({ value }: GridCellParams<Date, any, any>): boolean => {
    if (!value) {
      return false;
    }

    // Make a copy of the date to not reset the hours in the original object
    const dateCopy = new Date(value);
    dateCopy.setHours(
      showTime ? value.getHours() : 0,
      showTime ? value.getMinutes() : 0,
      0,
      0
    );
    const cellValueMs = dateCopy.getTime();

    return compareFn(cellValueMs, filterValueMs);
  };
}

function GridFilterDateInput(
  props: GridFilterInputValueProps & { showTime?: boolean }
) {
  const { item, showTime, applyValue, apiRef } = props;

  const Component = showTime ? DateTimePicker : DatePicker;

  const handleFilterChange = (newValue: unknown) => {
    applyValue({ ...item, value: newValue });
  };

  return (
    <Component
      value={item.value || null}
      renderInput={(params) => (
        <TextField
          {...params}
          //variant="standard"
          label={apiRef.current.getLocaleText("filterPanelInputLabel")}
        />
      )}
      InputAdornmentProps={{
        sx: {
          "& .MuiButtonBase-root": {
            marginRight: -1,
          },
        },
      }}
      onChange={handleFilterChange}
    />
  );
}

export function getDateFilterOperators(
  showTime = false
): GridColTypeDef["filterOperators"] {
  return [
    {
      value: "is",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 === value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "not",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 !== value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "after",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 > value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "onOrAfter",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 >= value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "before",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 < value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "onOrBefore",
      getApplyFilterFn: (filterItem) => {
        return buildApplyDateFilterFn(
          filterItem,
          (value1, value2) => value1 <= value2,
          showTime
        );
      },
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime },
    },
    {
      value: "isEmpty",
      getApplyFilterFn: () => {
        return ({ value }): boolean => {
          return value == null;
        };
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      requiresFilterValue: false,
    },
    {
      value: "isNotEmpty",
      getApplyFilterFn: () => {
        return ({ value }): boolean => {
          return value != null;
        };
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      requiresFilterValue: false,
    },
  ];
}
