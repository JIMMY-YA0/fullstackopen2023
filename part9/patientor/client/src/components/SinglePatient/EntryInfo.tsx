import React from 'react'
import { Entry } from '../../types'
import { Work, MedicalServices, LocalHospital } from '@mui/icons-material'

interface EntryInfoProps {
  entry: Entry
}

const EntryInfo = ({ entry }: EntryInfoProps) => {
  console.log('entry', entry)
  const typeIcon = (type: string) => {
    if (type === 'HealthCheck') {
      return <MedicalServices />
    }

    if (type === 'OccupationalHealthcare') {
      return <Work />
    }

    return <LocalHospital />
  }
  return (
    <div>
      {entry.date} {entry.description} {typeIcon(entry.type)}
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    </div>
  )
}

export default EntryInfo
