import { db } from "config/firebaseInit";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where
} from "firebase/firestore";
import { ICompanyForm } from "types/index";

import { constants } from "@fairdoor/shared-code";

const { collectionNames, medias, TOVALIDATE } = constants;

export const getUserCompanyQuery = (uid: string) => {
  const companyRef = collection(db, collectionNames.companies);
  return query(companyRef, where("members", "array-contains", uid));
};


export const createCompany = async (
  uid: string,
  companyFormData: ICompanyForm
) => {
  //FixMe: we use companyName as company Id, easier to link a job to a company but such a good pratice
  const newCompanyDocRef = doc(
    db,
    collectionNames.companies,
    companyFormData.companyName
  );
  const companyInfo = {
    name: companyFormData.companyName,
    size: companyFormData.companySize,
    owner: uid,
    sector: companyFormData.sector,
    members: [uid],
    creationDate: serverTimestamp(),
    medias: medias,
    status: TOVALIDATE,
  };

  return await setDoc(newCompanyDocRef, companyInfo);
};

