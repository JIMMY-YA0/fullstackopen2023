import { CoursePart } from '../types/courseParts'
import Part from './Part'

interface coursePartsProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: coursePartsProps) => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </div>
  )
}

export default Content
