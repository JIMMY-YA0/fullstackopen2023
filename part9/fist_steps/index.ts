// const express = require('express')
// const { parseArguments, calculateBmi } = require('./bmiCalculator')
// const app = express()
// import express from 'express';

import express from 'express'

import { parseArguments, calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'
const app = express()
app.use(express.json())

app.get('/bmi', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { height, weight } = req.query

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({
      error: 'missing parameter height or weight'
    })
  } else {
    try {
      const { heightInCm, weightInKg } = parseArguments([height.toString(), weight.toString()])
      const bmi = calculateBmi(heightInCm, weightInKg)
      res.send({
        height: heightInCm,
        weight: weightInKg,
        bmi
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    } catch (error: unknown) {
      const errorMessage = 'Somthing bad happed.'
      if (error instanceof Error) {
        res.status(400).send({ error: error.message })
      } else {
        res.status(400).send({ error: errorMessage })
      }
    }
  }
})

app.post('/exercises', (req, res) => {
  //   const dailyExercises = req.body.dailyExerciseHours
  //   const dailyTarget = req.body.target

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { target, dailyExerciseHours } = req.body

  if (!dailyExerciseHours || !target) {
    res.status(400).send({ error: 'missing parameter daily_exercises or target' })
  } else {
    try {
      //   const { target, dailyExerciseHours } = parseExerciseArguments(dailyTarget, dailyExercises)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      res.send(calculateExercises(target, dailyExerciseHours))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: unknown) {
      const errorMessage = 'Somthing bad happed.'
      if (error instanceof Error) {
        res.status(400).send({ error: error.message })
      } else {
        res.status(400).send({ error: errorMessage })
      }
    }
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
