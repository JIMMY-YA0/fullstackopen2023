import { CoursePart } from '../types/courseParts'

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>{coursePart.description}</p>
        </div>
      )
    case 'background':
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>{coursePart.description}</p>
          <p>submit to: {coursePart.backroundMaterial}</p>
        </div>
      )
    case 'group':
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>project exercises: {coursePart.groupProjectCount}</p>
        </div>
      )
    case 'special':
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>{coursePart.description}</p>
          <p>Requirements: {coursePart.requirements}</p>
        </div>
      )
    default:
      return null
  }
}

export default Part
