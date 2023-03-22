import express from 'express'
import patientService from '../services/patientService'
import { parsePatient, parseEntry } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getPatientEntry())
})

router.get('/:id', (req, res) => {
  // res.send(patientService.)

  res.send(patientService.getPatientById(req.params.id))
})

//create a new patient
router.post('/', (req, res) => {
  try {
    const newPatientEntry = parsePatient(req.body)
    const addedPatient = patientService.addPatient(newPatientEntry)

    res.json(addedPatient)
  } catch (error: any) {
    res.status(400).send({ error: error.message })
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = parseEntry(req.body)
    const patient = patientService.addEntry(req.params.id, newEntry)
    res.send(patient)
  } catch (error) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router
