import { useFruits } from '../hooks/useFruits.ts'
import { GuessForm } from './GuessForm.tsx'

function App() {
  // const { data } = useFruits()

  return (
    <>
      {/* <div className="app">
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul>
      </div> */}
      <GuessForm
        answer={{
          id: 1,
          name: 'apple',
          category: '',
          images: '',
        }}
      />
    </>
  )
}

export default App
