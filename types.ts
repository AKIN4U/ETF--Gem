// FIX: Remove incorrect global declarations for React and ReactDOM.
export interface ParentData {
  surname: string;
  firstName: string;
  middleName: string;
  residentialAddress: string;
  telephoneNumber: string;
  stateOfOrigin: string;
  lga: string;
  town: string;
  occupation: string;
  employer: string;
  salaryGrade?: string;
  estimatedAnnualIncome?: string;
  hasOutstandingObligations: 'Yes' | 'No' | '';
  outstandingObligationsDetails?: string;
  spouseName?: string;
  numberOfChildren?: number;
  childrenAges?: string;
  yearsInChurch?: number;
  positionInChurch?: string;
  dutiesInChurch?: string;
}

export interface FormData {
  // Step 1
  personalInfo: {
    surname: string;
    firstName: string;
    middleName: string;
    applicationDate: string;
    age: number | '';
    dob: string;
    sex: 'Male' | 'Female' | '';
    stateOfOrigin: string;
    lga: string;
    town: string;
    passportPicture?: File;
    hasReceivedBefore: 'Yes' | 'No' | '';
    previousScholarshipDate?: string;
  };
  // Step 2
  academicStatus: {
    schoolName: string;
    schoolAddress: string;
    presentClass: string;
    jambScore?: number | '';
    childrenInClass?: number;
    positionInClass?: number;
    schoolFees: number | '';
    textbookFees: number | '';
    hasEnoughTextbooks: 'Yes' | 'No' | '';
    hasLibraryAccess: 'Yes' | 'No' | '';
    sentAwayForFees: 'Yes' | 'No' | '';
    repeatedClass: 'Yes' | 'No' | '';
  };
  // Step 3
  familyInfo: {
    father: ParentData;
    mother: ParentData;
  };
  // Step 4
  documents: {
    schoolFeesProof?: File;
    birthCertificate?: File;
    primarySchoolCertificate?: File;
    secondarySchoolCertificate?: File;
    jambResult?: File;
    latestSchoolResult?: File;
    financialAssistanceLetter?: File;
  };
  // Step 5
  declarations: {
    childConfirmation: boolean;
    parentConfirmation: boolean;
    churchMembershipConfirmation: string; // self-declaration for now
  };
}

export interface StepProps {
    data: FormData;
    updateFormData: (field: Partial<FormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

// Types for Admin Dashboard
export type ApplicationStatus = 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Approved' | 'Rejected';
export type ScholarshipType = 'Primary' | 'JSS' | 'SSS' | 'Tertiary';

export interface ApplicationSummary {
  id: string;
  applicantName: string;
  submissionDate: string; // ISO string date
  status: ApplicationStatus;
  scholarshipType: ScholarshipType;
}