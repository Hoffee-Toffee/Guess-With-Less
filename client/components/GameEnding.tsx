import { useState, FormEvent, ChangeEvent } from 'react'
import * as models from '../../models/prompts'

export function GameEnding({
  gameState,
  setGameState,
  initialGameState,
}: models.GameStateProps) {
  const correct = gameState.guessInfo.filter(
    (guess) => guess.wasCorrect === true,
  )

  function handleReset() {
    setGameState(initialGameState as models.GameState)
  }

  return (
    <>
      <ul>
        {gameState.guessInfo.map((guess, i) => (
          <li key={i}>
            You {guess.wasCorrect || 'in'}correctly guessed {guess.guess} on
            stage {guess.stage} of image {guess.round}
          </li>
        ))}
      </ul>
      <p>
        You guessed {gameState.guessInfo.length} times, to get {correct.length}{' '}
        correct guesses.
        <br /> So you were correct for an average of 1 in{' '}
        {(gameState.guessInfo.length / correct.length).toLocaleString()}{' '}
        guesses.
      </p>
      <button onClick={handleReset}>Reset</button>
    </>
  )
}
