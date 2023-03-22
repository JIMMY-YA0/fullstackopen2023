import { NewPatient, Gender, EntryWithoutId, Diagnosis } from './types'

//type predicate based type guard
const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String
}

const parseString = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing input: ${value}`)
  }
  return value
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

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number'
}

const parseHealtCheckRating = (value: unknown): 0 | 1 | 2 | 3 => {
  if (isNumber(value) && (value === 0 || value === 1 || value === 2 || value === 3)) {
    return value
  }
  throw new Error(`Incorrect or missing HealthCheckRating: ${value}`)
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>
}

type DischargeType = {
  date: string
  criteria: string
}

const parseDischarge = (object: unknown): DischargeType | undefined => {
  if (!object || typeof object !== 'object' || !('discharge' in object)) {
    return undefined
  }

  const discharege = object.discharge

  if (!discharege || typeof discharege !== 'object') throw new Error('invalid discharge')
  if (!('date' in discharege) || !isString(discharege.date) || !isDate(discharege.date)) {
    throw new Error('discharge date missing or wrong type')
  }

  if (!('criteria' in discharege) || !isString(discharege.criteria)) {
    throw new Error('discharge criteria missing or wrong type')
  }

  return {
    date: discharege.date,
    criteria: discharege.criteria
  }
}

type SickLeaveType = {
  startDate: string
  endDate: string
}

const parseSickLeave = (object: unknown): SickLeaveType | undefined => {
  if (!object || typeof object !== 'object' || !('sickLeave' in object)) {
    return undefined
  }

  const siclLeave = object.sickLeave

  if (!siclLeave || typeof siclLeave !== 'object') throw new Error('invalid siclLeave')
  if (
    !('startDate' in siclLeave) ||
    !isString(siclLeave.startDate) ||
    !isDate(siclLeave.startDate)
  ) {
    throw new Error('sickLeave startDate missing or wrong type')
  }
  if (!('endDate' in siclLeave) || !isString(siclLeave.endDate) || !isDate(siclLeave.endDate)) {
    throw new Error('sickLeave endDate missing or wrong type')
  }

  return {
    startDate: siclLeave.startDate,
    endDate: siclLeave.endDate
  }
}

export const parsePatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Data missing or in wrong format')
  }

  if (!('name' in object)) throw new Error('name missing')
  if (!('occupation' in object)) throw new Error('occupation missing')
  if (!('ssn' in object)) throw new Error('ssn missing')
  if (!('gender' in object)) throw new Error('gender missing')
  if (!('dateOfBirth' in object)) throw new Error('dateOfBirth missing')

  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    ssn: parseSsn(object.ssn),
    entries: []
  }
}

export const parseEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Data missing or in wrong format')
  }

  if (!('type' in object)) throw new Error('type missing')
  if (!('date' in object)) throw new Error('date missing')
  if (!('specialist' in object)) throw new Error('specialist missing')
  if (!('description' in object)) throw new Error('description missing')

  const common = {
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    description: parseString(object.description),
    diagnosisCodes: parseDiagnosisCodes(object)
  }

  if (object.type === 'HealthCheck') {
    if (!('healthCheckRating' in object)) throw new Error('healthCheckRating missing')
    return {
      ...common,
      type: 'HealthCheck',
      healthCheckRating: parseHealtCheckRating(object.healthCheckRating)
    }
  } else if (object.type === 'OccupationalHealthcare') {
    if (!('employerName' in object)) throw new Error('employerName missing')
    return {
      ...common,
      type: 'OccupationalHealthcare',
      employerName: parseString(object.employerName),
      sickLeave: parseSickLeave(object)
    }
  } else if (object.type === 'Hospital') {
    return {
      ...common,
      type: 'Hospital',
      discharge: parseDischarge(object)
    }
  }

  throw new Error(`Incorrect type: ${object.type}`)
}
