import { useState, FormEvent, ChangeEvent } from 'react'
import * as models from '../../models/prompts'

export function GuessForm(props: models.GameStateProps) {
  const { gameState, setGameState } = props
  const { currentPrompt } = gameState

  const [guess, setGuess] = useState<string>('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    checkAnswer(currentPrompt?.name, guess)
    // setGuess('')
  }

  function checkAnswer(
    correctName: string | undefined,
    guess: string | undefined,
  ) {
    if (correctName?.toLowerCase() === guess?.toLowerCase()) {
      logGuess(true)
    } else {
      logGuess(false)
    }
  }

  function logGuess(isCorrect: boolean) {
    setGameState((prevGameState) => ({
      ...prevGameState,
      guessInfo: [
        ...prevGameState.guessInfo,
        {
          stage: prevGameState.currentStage as number,
          guess: guess,
          wasCorrect: isCorrect,
          round: prevGameState.currentRound as number,
          prompt: currentPrompt as models.Prompt,
        },
      ],
      newGuess: true,
      updated: false,
    }))
    setGuess('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="enterGuess" htmlFor="guess">Enter a guess: </label>
        <input
          className="guessInput"
          autoFocus
          autoComplete="off"
          id="guess"
          type="text"
          value={guess}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGuess(e.target.value)
          }
        />
        <button className="cybr-btn" type="submit">
          Submit
          <span aria-hidden>_</span>
          <span aria-hidden className="cybr-btn__glitch">
            _\-?-_*
          </span>
          <span aria-hidden className="cybr-btn__tag">
            #6U3S
          </span>
        </button>
      </form>
    </>
  )
}
