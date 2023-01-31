import React from "react";
import { mapValues, groupBy, omit } from "lodash";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { ICommonSelect } from "types/index";
import { LabelSelectWrapper } from "@fairdoor/shared-code";

interface Props extends ICommonSelect {
  groupItems: { name: string; head: string }[];
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  getLabel: (a: string) => string;
}
export default function GroupSelect({
  groupItems,
  value,
  label,
  onChange,
  sizeLabel,
  variant,
  sx,
  required,
  getLabel,
}: Props) {
  const grouped = mapValues(groupBy(groupItems, "head"), (clist) =>
    clist.map((group) => omit(group, "head"))
  );

  const heads = Object.keys(grouped);
  return (
    <LabelSelectWrapper
      label={label ?? ""}
      variant={variant}
      sx={sx.wrapper}
      sizeLabel={sizeLabel}
      required={required}
    >
      <Select
        native
        id="grouped-select"
        value={value}
        onChange={onChange}
        sx={sx.select}
      >
        <option aria-label="None" value="" />
        {heads.map((head) => {
          return (
            <optgroup key={head} label={head}>
              {grouped[head].map((item, idx) => (
                <option key={idx} value={item.name}>
                  {getLabel(item.name)}
                </option>
              ))}
            </optgroup>
          );
        })}
      </Select>
    </LabelSelectWrapper>
  );
}

GroupSelect.defaultProps = {
  variant: "outlined",
  sx: {},
  sizeLabel: "h3",
  required: true,
};
