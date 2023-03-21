interface ContentProps {
  courseParts: {
    name: string
    exerciseCount: number
  }[]
}

const Total = ({ courseParts }: ContentProps) => {
  return (
    <div>
      <p>{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
    </div>
  )
}

export default Total
