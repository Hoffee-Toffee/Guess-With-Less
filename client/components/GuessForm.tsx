import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import * as models from '../../models/prompts'
import { useQueryClient } from '@tanstack/react-query'

export function GuessForm(props: models.GameStateProps) {
  const { gameState, setGameState } = props
  const { currentPrompt } = gameState

  const [guess, setGuess] = useState<string>('')
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const queryClient = useQueryClient()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(currentPrompt?.name, guess)
    checkAnswer(currentPrompt?.name, guess)
    // setGuess('')
  }

  function checkAnswer(
    correctName: models.Prompt['name'] | undefined,
    guess: string | undefined,
  ) {
    if (correctName?.toLowerCase() === guess?.toLowerCase()) {
      logGuess(true)
    } else {
      logGuess(false)
    }
  }

  function logGuess(isCorrect: boolean) {
    // console.log('before', gameState)
    setGameState((prevGameState) => ({
      ...prevGameState,
      guessInfo: [
        ...prevGameState.guessInfo,
        {
          stage: prevGameState.currentStage as number,
          guess: guess,
          wasCorrect: isCorrect,
          prompt: currentPrompt?.name as models.Prompt['name'],
        },
      ],
    }))
    // console.log(gameState)
    setGuess('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="guess">Guess the Image!</label>
        <input
          id="guess"
          type="text"
          value={guess}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGuess(e.target.value)
          }
        />
        <button type="submit">Submit Guess</button>
      </form>
    </>
  )
}
