import { useState } from 'react'
import * as models from '../../models/prompts'
import Round from './Round'

export default function Game() {
  const initialGameState = {
    lastPrompt: undefined,
    currentPrompt: undefined,
    prompts: [],
    currentStage: undefined,
    guessInfo: [],
    currentRound: undefined,
    jigsaw: [],
    stats: false,
    mode: '',
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
      ) : (
        <Round gameState={gameState} setGameState={setGameState} />
      )}
    </>
  )
}
