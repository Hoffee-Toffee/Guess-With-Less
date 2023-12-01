import { useState, FormEvent, ChangeEvent } from 'react'
import * as models from '../../models/prompts'

export function GameEnding({ gameState }: models.GameStateProps) {
  const correct = gameState.guessInfo.filter(
    (guess) => guess.wasCorrect === true,
  )
  return (
    <>
      <ul>
        {gameState.guessInfo.map((guess, i) => (
          <li key={i}>
            You guessed {guess.guess} for {guess.prompt} on stage {guess.stage}
          </li>
        ))}
      </ul>
      <p>
        You guessed {gameState.guessInfo.length} times, to get {correct.length}{' '}
        correct guesses. So you were correct every{' '}
        {gameState.guessInfo.length / correct.length} guesses.
      </p>
    </>
  )
}
