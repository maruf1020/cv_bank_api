// src/modules/applicant/enums/applicant.enum.ts

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  NON_BINARY = 'Non-binary',
  TRANSGENDER = 'Transgender',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

export enum MaritalStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  DIVORCED = 'Divorced',
  WIDOWED = 'Widowed',
  SEPARATED = 'Separated',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

export enum Religion {
  ISLAM = 'Islam',
  HINDUISM = 'Hinduism',
  CHRISTIANITY = 'Christianity',
  BUDDHISM = 'Buddhism',
  JUDAISM = 'Judaism',
  SIKHISM = 'Sikhism',
  ATHEIST = 'Atheist',
  AGNOSTIC = 'Agnostic',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

export enum BloodGroup {
  A_POS = 'A+',
  A_NEG = 'A-',
  B_POS = 'B+',
  B_NEG = 'B-',
  AB_POS = 'AB+',
  AB_NEG = 'AB-',
  O_POS = 'O+',
  O_NEG = 'O-',
  UNKNOWN = 'Unknown',
}

export enum Proficiency {
  BASIC = 'Basic',
  CONVERSATIONAL = 'Conversational',
  FLUENT = 'Fluent',
  NATIVE = 'Native',
}
