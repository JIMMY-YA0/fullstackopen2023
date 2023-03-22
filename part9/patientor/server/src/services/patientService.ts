import { v4 as uuidv4 } from 'uuid'
import patient_data from '../../data/patients'

import { NonSensitivePatient, Patient, NewPatient } from '../types'

const getPatientEntry = (): NonSensitivePatient[] => {
  return patient_data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const getPatientById = (id: string): Patient | undefined => {
  return patient_data.find((patient) => patient.id === id)
}

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  }
  return newPatientEntry
}

export default {
  getPatientEntry,
  getPatientById,
  addPatient
}
