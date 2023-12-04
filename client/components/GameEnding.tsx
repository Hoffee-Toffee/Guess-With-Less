import { useState, FormEvent, ChangeEvent } from 'react'
import * as models from '../../models/prompts'
import * as api from '../apis/prompts'
import Leaderboard from './Leaderboard'

export function GameEnding({
  gameState,
  setGameState,
  initialGameState,
}: models.GameStateProps) {
  const [username, setUsername] = useState('????')
  const correct = gameState.guessInfo.filter(
    (guess) => guess.wasCorrect === true,
  )
  const correctLength = correct.length

  const totalGuesses = gameState.guessInfo.length

  function handleReset() {
    setGameState(initialGameState as models.GameState)
  }

  function handleSubmit() {
    api.addToLeaderboard({
      username,
      correct: correctLength,
      totalGuesses,
      mode: gameState.mode,
    })
  }

  return (
    <>
      {/* <ul>
        {gameState.guessInfo.map((guess, i) => (
          <li key={i}>
            You {guess.wasCorrect || 'in'}correctly guessed {guess.guess} on
            stage {guess.stage} of image {guess.round}
          </li>
        ))}
      </ul> */}
      <p>
        You guessed {gameState.guessInfo.length} times, to get {correct.length}{' '}
        correct guesses.
        <br /> So you were correct for an average of 1 in{' '}
        {(gameState.guessInfo.length / correct.length).toLocaleString()}{' '}
        guesses.
      </p>
      <button onClick={handleReset}>Reset</button>

      <form onSubmit={handleSubmit}>
        <p>Save this game to the leaderboard!</p>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          maxLength={4}
          onChange={(e) => setUsername(e.target.value)}
        >
          ????
        </input>
        <button>Save</button>
      </form>
      <Leaderboard />
    </>
  )
}
