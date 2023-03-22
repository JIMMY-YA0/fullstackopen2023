import React from 'react'
import { Diagnosis, Entry } from '../../types'
import { Work, MedicalServices, LocalHospital } from '@mui/icons-material'

interface EntryInfoProps {
  entry: Entry
  diagnoses: Diagnosis[]
}

const EntryInfo = ({ entry, diagnoses }: EntryInfoProps) => {
  //   console.log('entry', entry)

  const typeIcon = (type: string) => {
    if (type === 'HealthCheck') {
      return <MedicalServices />
    }

    if (type === 'OccupationalHealthcare') {
      return <Work />
    }

    return <LocalHospital />
  }

  const diagnosis = (code: string): string => {
    const foundDiagnosis = diagnoses.find((d) => d.code === code)
    if (!foundDiagnosis) return 'unknown'
    return foundDiagnosis.name
  }
  return (
    <div>
      {entry.date} {entry.description} {typeIcon(entry.type)}
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code}:{diagnosis(code)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EntryInfo
