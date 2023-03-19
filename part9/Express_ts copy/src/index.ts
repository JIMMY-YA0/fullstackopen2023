import express from 'express'
import diaryRouter from './routes/diariesRouter'
import diagnosesRouter from './routes/diagnoseRouter'
import patientRouter from './routes/patientRouter'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())
const PORT = 3001

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/diaries', diaryRouter)
app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
