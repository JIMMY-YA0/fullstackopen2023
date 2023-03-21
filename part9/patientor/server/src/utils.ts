import { Gender, NewPatientEntry } from './types'

//type predicate based type guard
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing input: ${text}`)
  }

  return text
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

// check if it's of right string data type  before call isData
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`)
  }
  return date
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn')
  }
  return ssn
}

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`)
  }
  return gender
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation ${occupation}`)
  }
  return occupation
}

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    }
    return newEntry
  }
  throw new Error('Incorrect data: a field missing')
}

// const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   if (!object || typeof object !== 'object') {
//     throw new Error('Incorrect or missing data')
//   }

//   if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
//     const newEntry: NewDiaryEntry = {
//       weather: parseWeather(object.weather),
//       visibility: parseVisibility(object.visibility),
//       date: parseDate(object.date),
//       comment: parseComment(object.comment)
//     }

//     return newEntry
//   }

//   throw new Error('Incorrect data: some fields are missing')
// }

//patients

export default toNewPatientEntry
