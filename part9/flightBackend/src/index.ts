import express from 'express'
import diaryRouter from './routes/diariesRouter'

import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())
const PORT = 3001

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
