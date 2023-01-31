import * as React from "react";
import { format } from "date-fns";

// mui
import {
  GridCellParams,
  GridCellValue,
  GridValueGetterParams,
  GridValueFormatterParams,
  GridColDef,
} from "@mui/x-data-grid-pro";
import { Stack, Tooltip, Box, Button } from "@mui/material";

//helpers
import { TranslationT, IApplicationStatus } from "types/index";
import {
  constants,
  ApplicationStatus,
  commonHelpers,
} from "@fairdoor/shared-code";
const {  COLUMN_JOB, COLUMN_CANDIDATE } = constants;
const { getBackendLabel } = commonHelpers;



export const SingleSelectCellWrapper = ({
  children,
  tooltipLabel,
}: {
  children: React.ReactNode;
  tooltipLabel: string;
}) => {
  return (
    <Tooltip title={tooltipLabel}>
      <Stack
        sx={{ width: "100%" }}
        direction="row"
        justifyContent="space-between"
      >
        {children}
      </Stack>
    </Tooltip>
  );
};

export function renderSelect(
  value: IApplicationStatus,
  t: TranslationT,
  field: string,
  tooltip: string
) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return (
    <SingleSelectCellWrapper tooltipLabel={tooltip}>
      {value && (
        <ApplicationStatus
          status={value ?? ""}
          getLabel={(sts: string) => getBackendLabel(sts, field, t)}
        />
      )}
      {value && <Box sx={{ width: "100%" }}></Box>}
    </SingleSelectCellWrapper>
  );
}


const applicationsColumns = ({
  onClickPayCandidate,
  t,
}: {
  onClickPayCandidate: (row: IJobApplication) => void;
  t: TranslationT;
}) => {
  const columns: GridColDef[] = React.useMemo(
    () => [
      {
        field: COLUMN_CANDIDATE,
        headerName: "Name",
        editable: false,
        width: 150,
        valueFormatter: (params: GridValueFormatterParams) => {
          const row = params.api.getRow(params.id);
          return [
            row?.candidateInfo?.firstName,
            row?.candidateInfo?.lastName,
          ].join(" ");
        },
      },
      {
        field: COLUMN_JOB,
        headerName: "Position",
        width: 150,
        editable: false,
        valueFormatter: (params: GridValueFormatterParams) =>
          params?.api?.getRow(params.id)?.jobInfo.title || "",
      },
      {
        field: "status",
        headerName: "Status",
        width: 180,
        renderCell: (params: GridCellParams) =>
          renderSelect(params.value, t, "applicationStatus", "edit status"),
        editable: false,
        type: "singleSelect",
        valueFormatter: (params: GridValueFormatterParams) =>
          getBackendLabel(params.value, "applicationStatus", t),
      },
      {
        field: "creationDate",
        headerName: "Applied on",
        editable: false,
        type: "date",
        width: 130,
        valueGetter: (params: GridValueGetterParams): GridCellValue => {
          const dateS = params.value && params.value.toDate();
          return dateS ? format(dateS, "MM/dd/yyyy") : "";
        },
      },
      {
        field: "id",
        headerName: "Payment",
        width: 130,
        renderCell: (params) => (
          <Button
            sx={{ m: 0 }}
            variant="outlined"
            onClick={() => {
              onClickPayCandidate(params.row);
            }}
          >
            Pay candidate
          </Button>
        ),
      },
    ],
    []
  );

  return columns;
};

export default applicationsColumns;
