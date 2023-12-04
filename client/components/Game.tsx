import { useState } from 'react'
import * as models from '../../models/prompts'
import Round from './Round'
import LiveRound from './LiveRound'
import * as api from '../apis/prompts'
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
    multiplayerData: [],
  } as models.GameState

  const [gameState, setGameState] = useState(initialGameState)
  const modes = ['Classic', 'Live', 'Jigsaw', 'Pixelated']
  const [mode, setMode] = useState<models.GameState['mode']>(modes[0])
  setTimeout(async () => {
    api
      .getMultiplayer()
      .then((multiplayerData) => {
        if (
          JSON.stringify(gameState.multiplayerData) !=
          JSON.stringify(multiplayerData)
        )
          console.log(multiplayerData)
        setGameState({
          ...gameState,
          multiplayerData,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, 800)

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
