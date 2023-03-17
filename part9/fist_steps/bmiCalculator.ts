interface MultiplyValues {
  heightInCm: number
  weightInKg: number
}

export const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 2) throw new Error('Not enough arguments')
  if (args.length > 2) throw new Error('Too many arguments')

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      heightInCm: Number(args[0]),
      weightInKg: Number(args[1])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / height / height) * 10000

  if (bmi < 15) {
    return 'Very severely underweight'
  } else if (bmi > 15 && bmi < 16) {
    return 'Severely underweight'
  } else if (bmi > 16 && bmi < 18.5) {
    return 'Underweight'
  } else if (bmi > 18.5 && bmi < 25) {
    console.log('Normal (healthy weight)')
    return 'Normal (healthy weight)'
  } else if (bmi > 25 && bmi < 30) {
    return 'Overweight'
  } else if (bmi > 30 && bmi < 35) {
    return 'Obese Class I (Moderately obese)'
  } else if (bmi > 35 && bmi < 40) {
    return 'Obese Class II (Severely obese)'
  } else {
    return 'Obese Class III (Very severely obese)	'
  }
}

try {
  const { heightInCm, weightInKg } = parseArguments(process.argv)
  calculateBmi(heightInCm, weightInKg)
} catch (error: unknown) {
  let errorMessage = 'Somthing bad happed.'
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message
  }
  console.log(errorMessage)
}
