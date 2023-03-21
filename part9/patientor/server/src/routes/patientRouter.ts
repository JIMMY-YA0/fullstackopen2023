import express from 'express'
import patientService from '../services/patientService'
import toNewPatientEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getPatientEntry())
})

router.get('/:id', (req, res) => {
  // res.send(patientService.)

  res.send(patientService.getPatientById(req.params.id))
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body)
    const addedPatient = patientService.addPatient(newPatientEntry)

    res.json(addedPatient)
  } catch (error: any) {
    res.status(400).send({ error: error.message })
  }
})

export default router
