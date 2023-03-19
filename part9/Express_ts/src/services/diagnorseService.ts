import diagnose_data from '../../data/diagnose'
import { DiagnoseEntry } from '../types'

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnose_data
}

export default {
  getDiagnoses
}
