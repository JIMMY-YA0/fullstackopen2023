// ******Diaries*****
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy'
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor'
}

export interface DiaryEntry {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comment?: string
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

// ******Diagnose*****
export interface DiagnoseEntry {
  code: string
  name: string
  latin?: string
}

// ******Patients*****
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export interface PatientEntry {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>
