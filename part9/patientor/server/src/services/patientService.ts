import { v4 as uuidv4 } from 'uuid'
import patient_data from '../../data/patients'

import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types'

const getPatientEntry = (): NonSensitivePatientEntry[] => {
  return patient_data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const getPatientById = (id: string): PatientEntry | undefined => {
  return patient_data.find((patient) => (patient.id = id))
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
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
