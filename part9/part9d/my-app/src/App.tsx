interface HeaderProps {
  courseName: string
}

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>
}

interface ContentProps {
  courseParts: {
    name: string
    exerciseCount: number
  }[]
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <p key={coursePart.name}>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      ))}
    </div>
  )
}

const Total = ({ courseParts }: ContentProps) => {
  return (
    <div>
      <p>{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
    </div>
  )
}

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14
    }
  ]

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
