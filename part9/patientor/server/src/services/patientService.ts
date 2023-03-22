import { v4 as uuidv4 } from 'uuid'
import patient_data from '../../data/patients'

import { NonSensitivePatient, Patient, NewPatient, EntryWithoutId } from '../types'

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

const addPatient = (patient: NewPatient): Patient => {
  const newPatientEntry = {
    ...patient,
    id: uuidv4()
  }
  return newPatientEntry
}

const addEntry = (id: string, newEntry: EntryWithoutId): Patient | undefined => {
  const patient = patient_data.find((p) => p.id === id)
  if (patient) {
    const entry = {
      ...newEntry,
      id: uuidv4()
    }
    patient.entries = patient.entries.concat(entry)
  }
  return patient
}

export default {
  getPatientEntry,
  getPatientById,
  addPatient,
  addEntry
}
