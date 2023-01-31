import { auth, db } from "config/firebaseInit";
import { collection, getDocs } from "firebase/firestore";
import {
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
// see https://firebase.google.com/docs/auth/web/password-auth

import { handleAuthMessages } from "helpers/helpers";
import { IAuthMessage, IContactForm, ICodeBackend } from "types/index";
import { createCompany } from "queries/company";
import { createRecruiter } from "queries/recruiters";
import { constants } from "@fairdoor/shared-code";

const {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  RESET_SUCCESS,
  collectionNames,
  COMPANY_ALREADY_EXIST,
} = constants;

type AuthFn = (a: IAuthMessage) => void;

interface IAuthMethods {
  signupCompany: (
    dataForm: IContactForm,
    clbck: AuthFn,
    clbkError: AuthFn
  ) => Promise<void>;
  signin: (
    email: string,
    password: string,
    clbck: AuthFn,
    clbkError: AuthFn
  ) => Promise<void>;
  signout: (clbck: AuthFn) => void;
  passwordReset: (
    email: string,
    url: string,
    clbck: AuthFn,
    clbkError: AuthFn
  ) => Promise<void>;
}

export const authMethods: IAuthMethods = {
  signupCompany: async (dataForm, clbck, clbkError) => {
    const {
      firstName,
      lastName,
      email,
      password,
      companyName,
      phone,
      companySize,
      sector,
      medias,
    } = dataForm;

    const trimmedCompanyName = companyName.trimStart().trimEnd(); // important to avoid duplicates
    // get all company names to check if new company already exists
    const companiesRef = collection(db, collectionNames.companies);
    const querySnapshot = await getDocs(companiesRef);
    let isSubmittedCompanyAlreadyExist = false;
    querySnapshot.forEach((doc) => {
      const name = doc.data().name;
      if (trimmedCompanyName === name) isSubmittedCompanyAlreadyExist = true;
    });

    if (!isSubmittedCompanyAlreadyExist) {
      return createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          // create a new company
          await createCompany(res.user.uid, {
            companyName: trimmedCompanyName,
            companySize,
            sector,
            medias,
          });
          // create a new recruiter document in collection "recruiters"  linked to collection user with uid
          await createRecruiter(res.user.uid, {
            firstName: firstName.trimStart().trimEnd(),
            lastName: lastName.trimStart().trimEnd(),
            email: email.trimStart().trimEnd(),
            phone,
            companyName: trimmedCompanyName,
          });
        })
        .then(() => {
          clbck(handleAuthMessages(SIGNUP_SUCCESS));
        })
        .then(() => {
          if (auth.currentUser) {
            updateProfile(auth.currentUser, { displayName: firstName });
          }
        })
        .catch((error: ICodeBackend) => {
          console.error("error in signupCompany", error);
          clbkError(handleAuthMessages(error.code));
        });
    } else return clbkError(handleAuthMessages(COMPANY_ALREADY_EXIST));
  },
  signin: (email, password, clbck, clbkError) => {
    return setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password)
          .then(async () => {
            clbck(handleAuthMessages(LOGIN_SUCCESS));
          })
          .catch((error: ICodeBackend) => {
            clbkError(handleAuthMessages(error.code));
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.error("Error in setPersistence in sign in", error);
        clbkError(handleAuthMessages(errorCode));
      });
  },
  signout: (clbck) => {
    return signOut(auth)
      .then(() => {
        clbck(handleAuthMessages(SIGNOUT_SUCCESS));
        localStorage.removeItem("uid");
      })
      .catch((err: ICodeBackend) => {
        localStorage.removeItem("uid");
        console.error(err.message);
      });
  },
  passwordReset: (email, url, clbck, clbkError) => {
    return sendPasswordResetEmail(auth, email)
      .then(() => clbck(handleAuthMessages(RESET_SUCCESS)))
      .catch((err) => {
        clbkError(handleAuthMessages(err.code));
      });
  },
};
