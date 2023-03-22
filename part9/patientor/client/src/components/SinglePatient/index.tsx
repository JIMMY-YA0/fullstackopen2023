import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Male, Female, QuestionMark } from '@mui/icons-material'
import patientService from '../../services/patients'
import { Diagnosis, EntryFormValues, Gender, Patient } from '../../types'
import { Alert } from '@mui/material'
import EntryInfo from './EntryInfo'
import AddEntryForm from './AddEntryForm'
import { getErrorMessage } from '../../util'

interface Props {
  diagnoses: Diagnosis[]
}

const SinglePatient = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [formVisible, setFormVisible] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { id } = useParams<{ id: string }>()

  const getGenderIcon = (gender: Gender) => {
    if (gender === Gender.Male) {
      return <Male />
    }

    if (gender === Gender.Female) {
      return <Female />
    }

    return <QuestionMark />
  }

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await patientService.getOne(id)
          setPatient(response)
          console.log('singlepatient', response)
        } catch (error) {
          console.error(error)
        }
      }
      void fetchData()
    }
  }, [id])

  const onNewEntry = async (values: EntryFormValues, resetter: () => void) => {
    if (!patient) return null
    try {
      const updatedPatient = await patientService.addEntry(patient.id, values)
      setPatient(updatedPatient)
      setFormVisible(false)
      setError(null)
      resetter()
    } catch (e: unknown) {
      const message = getErrorMessage(e)
      setError(message)
    }
  }

  const closeForm = () => {
    setFormVisible(false)
    setError(null)
  }

  if (!patient) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h3>
        {patient.name} {getGenderIcon(patient.gender)}
      </h3>
      <div>ssn {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm
        onSubmit={onNewEntry}
        visible={formVisible}
        onOpen={() => setFormVisible(true)}
        onCancel={closeForm}
        diagnoses={diagnoses}
      />

      <h4>Entries</h4>
      {patient.entries?.map((entry) => (
        <EntryInfo key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  )
}

export default SinglePatient
