import { AlertColor } from "@mui/material/Alert";
import { GridFilterItem } from "@mui/x-data-grid-pro";
import { GridLinkOperator } from "@mui/x-data-grid-pro";
export type TranslationT = (
  a: string | string[],
  b?: Record<string, unknown>
) => string;
export type Variant = "success" | "error" | "info" | "warning";
export type ButtonVariant = "contained" | "outlined" | "text";
export type ButtonColor = "primary" | "secondary";
import { FieldValue } from "@firebase/firestore-types";

export type IApplicationStatus =
  | "archived"
  | "new"
  | "interview"
  | "assessment"
  | "offer"
  | "refcall"
  | "other"
  | "hired"
  | "notHired"
  | "newNotVetted"
  | "screeningScheduled"
  | "screeningDone"
  | "signedUp";

export type FirestorMessage =
  | "auth/email-already-in-use"
  | "auth/wrong-password"
  | "auth/user-not-found"
  | "auth/invalid-continue-uri"
  | "auth/invalid-email"
  | "auth/login-success"
  | "auth/signup-success"
  | "auth/signout-success"
  | "auth/signout-success"
  | "auth/reset-success";

export interface IRemote {
  name: string;
  definition: string;
}

export type IAuthMessage = { message: string; variant: Variant };
export interface ISnack extends IAuthMessage {
  open: boolean;
}

export interface ISnackContext {
  snack: ISnack;
  setSnack: (snack: ISnack) => void;
  autoHideDuration: number;
}

export type TypographyVariant =
  | "button"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "inherit"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "overline"
  | undefined;

export type MuiVariant = "standard" | "outlined" | "filled" | undefined;

export type ICodeBackend = {
  message: string;
  code: FirestorMessage;
  variant: AlertColor;
};

export interface ICommonSelect {
  label: string;
  variant: MuiVariant;
  sx: { wrapper?: Record<string, unknown>; select?: Record<string, unknown> };
  sizeLabel: TypographyVariant;
  required: boolean;
}

export interface ILocation {
  address: string;
  name: string;
}

type IMediaName = "Facebook" | "LinkedIn" | "GitHub" | "Instagram" | "Twitter";
export interface IMedia {
  name: IMediaName;
  prefix: string;
  required: boolean;
  suffix: string;
}

export interface ISelectItem {
  name: string;
  label: string;
  description?: string;
  order?: number;
}

export interface IJobLevel {
  name: string;
}

export interface INameDescription {
  name: string;
  description: string;
}

export interface IJobCategory {
  name: string;
  subCategory: INameDescription[];
}

export interface ITeam {
  name: string;
  definition: string;
}

export type IImageType = "logo" | "cover" | "gallery" | "profile" | "resume";
export interface IImage {
  type: IImageType;
  name: string;
  url: string;
  storageUri: string;
}

export interface IRecruiterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
}

export interface ICompanyForm {
  companySize: string;
  sector: string;
  medias: IMedia[];
  companyName: string;
}

export interface IContactForm extends IRecruiterForm {
  password: string;
  companySize: string;
  sector: string;
  medias: IMedia[];
}
export interface ICompany {
  id: string;
  name: string;
  assessments: string[];
  jobs: string[];
  description?: string | Record<string, unknown>;
  location?: IPlace;
  offices?: IPlace[];
  medias: IMedia[];
  members: string[];
  remote?: string;
  sector: string;
  size: string;
  teams?: ITeam[];
  timestamp?: Date;
  status?: string;
  images?: IImage[];
  editionDate: FieldValue;
  creationDate: FieldValue;
  archiveDate: FieldValue;
}
export type ICompanyEditForm = Omit<ICompany, "id" | "name">;

// contact form only
export interface ICompanyDataForm {
  companyName: string;
  companySize: string;
  sector: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  status: string;
  medias: IMedia[];
}

export type IJobStatus = "unpublished" | "published" | "archived";

export type IPlace = {
  description: string | null;
  placeId: string | null;
};

export type IContractType =
  | "full-time"
  | "part-time"
  | "contractor"
  | "internship";

export type companyInfo = Pick<
  ICompany,
  "description" | "name" | "images" | "medias" | "size" | "sector"
>;
export type IEditorText = string | Record<string, unknown>;
export type IBonusType = "capped" | "uncapped";
export type ICompensationPlan = {
  baseMin: number;
  baseMax: number;
  bonusMin: number;
  bonusMax: number;
  bonusType: IBonusType;
  on: boolean;
};
export type IEquityPlan = {
  minShare: number;
  maxShare: number;
  on: boolean;
};

export type ISignUpData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  linkedin: string;
  referralId: string | null;
};

export interface IPartner extends ISignUpData {
  role?: "admin" | "partner";
  status: string;
  uid: string;
  id: string;
  agendaLink: string;
}

export interface IJob {
  id: string | null;
  title: string;
  description: IEditorText;
  location: IPlace;
  locations: IPlace[];
  remote: string;
  team: string;
  minSalary: number;
  maxSalary: number;
  currency: string;
  workingTimeZone?: string;
  companyId: string;
  assessments: string[];
  assessmentsDetails: Record<string, AssessmentForJob>;
  jobLevel: string;
  jobCategory: string;
  process: IEditorText;
  requirements: IEditorText;
  status: IJobStatus;
  contractType: IContractType;
  interestedUsers?: string[];
  yearsOfExperience: number;
  benefits: IEditorText;
  jobApplications: string[];
  assessmentsSalarySum: number;
  companyInfo: companyInfo;
  compensationPlan: ICompensationPlan;
  equity: IEquityPlan;
  assignedPartner: IPartner;
}

export interface IJobWithCompany extends IJob {
  companyData: ICompany;
}

export interface IAssessment {
  id?: string;
  companyId?: string[];
  name: string;
  description: IEditorText;
  salary: number;
  currency: string;
  jobCategories: string;
  skills: ISkills[];
  length: number;
}

export interface IRecruiter {
  companyId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  uid: string;
  status?: string;
  role: "superadmin" | "recruiter" | undefined;
}

export type IStep = {
  index: number;
  label: string;
  onClick: () => void;
  completed: boolean;
  disabled: boolean;
};

export type ISkills = {
  name: string;
  label: string;
  description: string;
  category: string;
};

export interface IFlattenCat {
  head: string;
  name: string;
  description: string;
}

export interface IJobView {
  id: string;
  title: string;
  viewDate: string;
  hasApplied: boolean;
  companyId: string;
  jobCategory: string;
  remote: string;
  minSalary: number;
  locations: IPlace[];
}

export type ICandidateStatus = "vetted" | "unvetted" | "vetting";

export interface ICandidate {
  id?: string;
  uid: string; //same as id,
  firstName: string;
  lastName: string;
  linkedin: string;
  phone: string;
  userCity: IPlace | null;
  jobLevel?: string;
  jobCategory?: string[];
  expectedSalary?: number;
  currency?: string;
  jobSearchActivity?: string;
  authorizedToWorkInUS?: boolean;
  requireSponsorship?: boolean;
  email: string;
  interestingJobs: string[];
  jobApplications: string[];
  remote?: string[];
  jobsViewed: IJobView[];
  resume?: IImage;
  profileUpdated?: boolean;
  lookingFor: IEditorText;
  achievements: IEditorText;
  status: ICandidateStatus;
  companySizes: string[];
  sectors: string[];
  workMotivations: string[];
  salesTypes: string[];
  yearsAsClosing: string;
  yearsTotalSalesXp: string;
  rating: number;
  hasBeenScreened?: boolean;
  screeningStatusDate?: FieldValue;
  ratingDate: FieldValue;
  vettingStatusDate: FieldValue;
  unresponsive?: boolean;
  unresponsiveStatusDate?: FieldValue;
  internalNotes: IEditorText;
  willingToRelocate?: boolean;
  relocateIn: IPlace[] | null;
}

export type IStatusLabelOrder = {
  name: string;
  order?: number;
  label: string;
};

export type IStatusOrder = {
  name: string;
  order?: number;
};

export interface IJobApplication {
  id: string;
  candidateInfo: {
    id: string;
    firstName: string;
    lastName: string;
    linkedin: string;
    email: string;
    phone: string;
    resume?: string;
    hasBeenScreened: boolean;
    status: ICandidateStatus;
    unresponsive: boolean;
  };
  jobInfo: {
    id: string;
    title: string;
  };
  companyInfo: {
    id: string;
    name: string;
  };
  creationDate: FieldValue;
  message: string;
  status: IApplicationStatus;
  rating: string;
  note: string | Record<string, unknown>;
  candidateDeclaration: {
    hasDoneAssessment: boolean;
  };
  nextInterviewDate: FieldValue;
  nextStep: string;
  archiveMessage?: string;
  statusDates: Record<string, FieldValue>;
  assignedPartner?: IPartner;
  archiveReason: string;
}

export type AssessmentForJob = Omit<IAssessment, "id">;

export interface ExtendedGridFilterItem extends GridFilterItem {
  options?: ISelectItem[];
  hide?: boolean;
}

export interface ExtendedGridFilterModel {
  items: ExtendedGridFilterItem[];
  linkOperator?: GridLinkOperator.And | GridLinkOperator.Or;
}

export interface IReferralFormData {
  refereeEmail: string;
  message: string;
}

export interface IReferral extends IReferralFormData {
  referrerId: string;
  referrerName?: string;
  status: string;
  createdAt: FieldValue;
  jobId?: string;
  companyId?: string;
  refereeId?: string;
  refereeName?: string;
}

export type IField = {
  id: string;
  field: string;
  value: string | Record<string, unknown>;
};
