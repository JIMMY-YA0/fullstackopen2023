import diagnose_data from '../../data/diagnose'
import { Diagnosis } from '../types'

const getDiagnoses = (): Diagnosis[] => {
  return diagnose_data
}

export default {
  getDiagnoses
}
