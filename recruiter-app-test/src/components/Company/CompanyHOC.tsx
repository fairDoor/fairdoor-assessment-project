import React, { ComponentType, useEffect, memo } from "react";
import { Loading } from "@fairdoor/shared-code";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FirestoreError } from "firebase/firestore";
import { useLocalStorage } from "react-use";
import { getUserCompanyQuery } from "queries/company";
import { ICompany } from "types/index";
import isEmpty from "lodash/isEmpty";

type Iuid = {
  uid: string;
  userEmail: string;
  companyData: ICompany;
};

export function withCompanyData<T extends Iuid>(Base: ComponentType<T>) {
  // eslint-disable-next-line react/display-name
  const Component = memo((hocProps: Omit<T, "companyData">) => {
    const { uid } = hocProps;
    const [company, setCompany] = useLocalStorage<ICompany | null>(
      "company",
      null
    );
    const [companyData, loadingCompany] = useCollectionData(
      getUserCompanyQuery(uid),
      { idField: "id" }
    ) as [ICompany[] | undefined, boolean, FirestoreError | undefined];

    useEffect(() => {
      if (companyData) {
        if (!isEmpty(companyData)) {
          setCompany(companyData[0]);
          if (companyData.length > 1) {
            console.error(`user ${uid} is associated with multiple companies`);
          }
        }
      }
    }, [uid, companyData]);

    if (uid && isEmpty(companyData) && !loadingCompany) {
      return (
        <p>
          Your account is not linked to a company yet. Please contact us at
          benjamin@fairdoor.co
        </p>
      );
    }

    if (loadingCompany || company == null || !uid) return <Loading />;
    if (company !== null) {
      return (
        <Base
          {...(hocProps as T)}
          companyData={company}
          key={[company.id, uid].join("")}
        />
      );
    }
    return <p> error in getting company data </p>;
  });

  return Component;
}
