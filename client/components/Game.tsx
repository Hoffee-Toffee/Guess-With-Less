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
    updated: false,
    jigsaw: [],
    stats: false,
    mode: '',
    stageStart: new Date(),
  } as models.GameState

  const [gameState, setGameState] = useState(initialGameState)
  const [mode, setMode] = useState<models.GameState['mode']>('')
  const modes = ['Classic', 'Live', 'Jigsaw', 'Pixelated']
  return (
    <>
      {!gameState.mode ? (
        <form
          onSubmit={(e) => {
            e.preventDefault
            setGameState({ ...gameState, mode })
          }}
        >
          <p>Choose your mode!</p>
          <select onChange={(e) => setMode(e.target.value)}>
            {modes.map((mode) => (
              <option key={mode}>{mode}</option>
            ))}
          </select>
          <button>Start</button>
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
