interface AverageValues {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (target: number, dailyExerciseHours: number[]): AverageValues => {
  const periodLength = dailyExerciseHours.length
  const trainingDays = dailyExerciseHours.filter((day) => day > 0).length
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength

  const success = average >= target ? true : false
  let rating
  let ratingDescription

  if (average < target) {
    rating = 1
    ratingDescription = 'not too bad but could be better'
  } else if (average === target) {
    rating = 2
    ratingDescription = 'good'
  } else {
    rating = 3
    ratingDescription = 'very good'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises(10, [10, 10, 10, 10, 10, 10, 10]))

export { calculateExercises }
