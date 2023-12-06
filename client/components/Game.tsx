import { useState, FormEvent } from 'react'
import * as models from '../../models/prompts'
import Round from './Round'
import LiveRound from './LiveRound'
import Leaderboard from './Leaderboard'

export default function Game() {
  const initialGameState = {
    lastPrompt: undefined,
    currentPrompt: undefined,
    prompts: [],
    currentStage: 0,
    guessInfo: [],
    currentRound: 0,
    currentEndpoint: undefined,
    updated: false,
    jigsaw: [],
    showSummary: false,
    mode: '',
    gameHasStarted: false,
    newGuess: false,
    gameIsOver: false,
    multiplayerData: [],
    gameId: undefined,
  } as models.GameState

  const [gameState, setGameState] = useState(initialGameState)
  console.log(gameState)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const modes = [
    'Jigsaw',
    'Jigsaw Leaderboard',
    'Pixelated',
    'Pixelated Leaderboard',
    'Classic',
    'Classic Leaderboard',
    'Live',
    'Live Leaderboard',
    'Multiplayer',
    'Join Multiplayer',
  ]
  const [mode, setMode] = useState<models.GameState['mode']>(modes[0])

  async function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    const clickedMode = e.currentTarget.id

    if (clickedMode.includes('Leaderboard')) {
      const modeLeaderBrd = clickedMode.replace(' Leaderboard', '')
      setShowLeaderboard(true)
      setMode(modeLeaderBrd)
    } else {
      setGameState({
        ...gameState,
        mode: clickedMode,
      })
      setShowLeaderboard(false)
    }
  }

  return (
    <main>
      {showLeaderboard && <Leaderboard gameMode={mode} />}

      {!gameState.mode ? (
        <form
          className="modeForm"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <h2>Choose your mode!</h2>
          <div>
            {modes.map((mode, index) => (
              <button
                key={index}
                id={mode}
                onClick={handleSubmit}
                className={mode.endsWith('Leaderboard') ? 'neon' : 'cybr-btn'}
              >
                {mode}
                <span aria-hidden>_</span>
                <span aria-hidden className="cybr-btn__glitch">
                  _\-?-_*
                </span>
                <span aria-hidden className="cybr-btn__tag">
                  #{index + 1}
                  {index + 4}
                </span>
              </button>
            ))}
          </div>
        </form>
      ) : gameState.mode === 'Live' ? (
        <LiveRound
          gameState={gameState}
          setGameState={setGameState}
          initialGameState={initialGameState}
        />
      ) : (
        <Round
          gameState={gameState}
          setGameState={setGameState}
          initialGameState={initialGameState}
        />
      )}
    </main>
  )
}
