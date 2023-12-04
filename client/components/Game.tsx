import { useState } from 'react'
import * as models from '../../models/prompts'
import Round from './Round'
import LiveRound from './LiveRound'

export default function Game() {
  const initialGameState = {
    lastPrompt: undefined,
    currentPrompt: undefined,
    prompts: [],
    currentStage: undefined,
    guessInfo: [],
    currentRound: undefined,
    currentEndpoint: undefined,
    stageStart: undefined,
    updated: false,
    jigsaw: [],
    stats: false,
    mode: '',
  } as models.GameState

  const [gameState, setGameState] = useState(initialGameState)
  const modes = ['Classic', 'Live', 'Jigsaw', 'Pixelated', 'Leaderboard']
  const [mode, setMode] = useState<models.GameState['mode']>(modes[0])
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setGameState({
      ...gameState,
      mode: e.target.id
    })
  }

  return (
    <>
      {!gameState.mode ? (
        <form className='modeForm'
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <h2>Choose your mode!</h2>
          <div>
            {modes.map((mode, index) => (
              <button id={mode} onClick={handleSubmit} class="cybr-btn">
              {mode}<span aria-hidden>_</span>
              <span aria-hidden class="cybr-btn__glitch">_\-?-_*</span>
              <span aria-hidden class="cybr-btn__tag">#{index + 1}{index + 4}</span>
            </button>
            ))}
          </div>
        </form>
      ) : gameState.mode == 'Live' ? (
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
    </>
  )
}
