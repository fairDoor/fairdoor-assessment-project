import React from "react";
import { useTranslation } from "next-i18next";

// mui
import {
  useGridApiRef,
} from "@mui/x-data-grid-pro";
import { Box, Stack } from "@mui/material";

//helpers
import {
  IJobApplication
} from "types/index";
import {
  DataGridWrapper,
} from "@fairdoor/shared-code";

import applicationsColumns from "components/Applications/ApplicationsColumns";


type IProps = {
  rows: IJobApplication[];
};

const ApplicationsTable = (props: IProps) => {
  const apiRef = useGridApiRef();
  const { t } = useTranslation();

  const onClickPayCandidate  = () => {
    /**
     * TODO: open modal to select assessments
     *
     */

    console.log('click on pay candidate button')
  }


  const cols = applicationsColumns({ t , onClickPayCandidate});

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Stack direction="row" xs={{m:3, width:"90%"}}>
          <DataGridWrapper
            apiRef={apiRef}
            rows={props.rows}
            columns={cols}
            rowsPerPageOptions={[5, 10, 20, 50]}
            rowCount={props.rows.length}
            defaultPageSize={10}
            disableColumnFilter
            disableColumnSelector
            pagination
          />
      </Stack>
    </Box>
  );
};

export default ApplicationsTable;
