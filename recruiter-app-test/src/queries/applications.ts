import { db } from "config/firebaseInit";
import {
  collection,
  query,
  where,
} from "firebase/firestore";

export const getCompanyApplicationsInAssessment = (companyId: string) => {
  const applicationsRef = collection(db, "jobApplications");
  return query(applicationsRef,
    where("companyInfo.id", "==", companyId),
    where("status", "==", "assessment")
    );
};