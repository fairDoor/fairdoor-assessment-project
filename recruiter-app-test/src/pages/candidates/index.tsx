import * as React from "react";
import { Typography } from "@mui/material";
//helpers
import { Loading } from "@fairdoor/shared-code";
import { ICompany, IJobApplication } from "types/index";
import { useTranslation } from "next-i18next";
// firestore
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getCompanyApplicationsInAssessment } from "queries/applications";
import { FirestoreError } from "firebase/firestore";

import ApplicationsTable from "components/Applications/ApplicationsTable";
// HOC
import { withCompanyData } from "components/Company/CompanyHOC";
import { withUserData } from "components/Auth/AuthHOC";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export const getServerSideProps = async ({
  locale,
}: {
  locale: "en" | "fr";
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "backend"])),
    },
  };
};

export interface IAuthProps {
  companyData: ICompany;
}

const ApplicationsPage: React.FunctionComponent<IAuthProps> = (props) => {
  const { t } = useTranslation(["common", "backend"]);

  const { companyData } = props;

  const qApplications = getCompanyApplicationsInAssessment(companyData.id);
  const [applications, loadingApp, errorApp] = useCollectionData(
    qApplications,
    { idField: "id" }
  ) as [IJobApplication[] | undefined, boolean, FirestoreError | undefined];
  if (loadingApp) return <Loading error={errorApp} />;
  else if (applications) {
    return <ApplicationsTable rows={applications} />;
  }
  return (
    <Typography variant="h4"> {t("application.noApplications")} </Typography>
  );
};

export default withUserData(withCompanyData(ApplicationsPage));
