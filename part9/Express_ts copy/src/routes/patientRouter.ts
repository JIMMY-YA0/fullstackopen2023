import express from 'express'
import patientService from '../services/patientService'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getPatientEntry())
})

router.post('/',(req,res)=>{
    try{
        
    }
}))

export default router
