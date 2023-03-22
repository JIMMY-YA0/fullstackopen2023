import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Male, Female, QuestionMark } from '@mui/icons-material'
import patientService from '../../services/patients'
import { Gender, Patient } from '../../types'
import EntryInfo from './EntryInfo'

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null)
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
      <h4>Entries</h4>
      {patient.entries?.map((entry) => (
        <EntryInfo key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export default SinglePatient
