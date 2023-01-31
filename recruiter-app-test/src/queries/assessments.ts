import { db } from "config/firebaseInit";
import { query, where, collection, documentId } from "firebase/firestore";

export const getAssessmentsFromIdList = (ids: string[]) => {
  const assessRef = collection(db, "assessments");
  return query(assessRef, where(documentId(), "in", ids));
};
