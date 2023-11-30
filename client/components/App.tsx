import { useFruits } from '../hooks/useFruits.ts'
import { GuessForm } from './GuessForm.tsx'

function App() {
  /*
  gameStateRoughIdea = {
    currentPrompt: Prompt
    currentStage: number
    guesses = [{
      stage: number
      guess: string
      wasCorrect: boolean
    }]
  }

  gameState.guesses((...prev) => [...prev, currentGuess])
  currentGuess could be a useState
  */

  return (
    <>
      {/* Stage component to be passed a prompt and a number */}
      {/* GuessForm to be passed a prompt*/}
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
