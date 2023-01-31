import { db } from "config/firebaseInit";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import { IRecruiterForm } from "types/index";

import { constants } from "@fairdoor/shared-code";
const { collectionNames, TOVALIDATE } = constants;

export const createRecruiter = async (
  uid: string,
  companyFormData: IRecruiterForm
) => {
  const newRecruiterDocRef = doc(db, collectionNames.recruiters, uid);
  const recruiterInfo = {
    uid,
    firstName: companyFormData.firstName,
    lastName: companyFormData.lastName,
    email: companyFormData.email,
    phone: companyFormData.phone,
    companyId: companyFormData.companyName,
    status: TOVALIDATE,
  };
  return await setDoc(newRecruiterDocRef, recruiterInfo);
};
