import { FormEvent } from 'react'
import * as models from '../../models/prompts.js'
import { GuessForm } from './GuessForm.js'
import { GameEnding } from './GameEnding.js'
import * as api from '../apis/prompts.js'
import { useQuery } from '@tanstack/react-query'
import { StageResult } from './StageResult.js'

import JigsawStage from './JigsawStage.js'
import ClassicStage from './ClassicStage.js'
import PixelatedStage from './PixelatedStage.js'

export default function Round(props: models.GameStateProps) {
  const { gameState, initialGameState, setGameState } = props

  const {
    data,
    isError,
    isLoading,
  }: {
    data: models.APIData | undefined
    isError: boolean
    isLoading: boolean
  } = useQuery({
    queryKey: ['prompts'],
    queryFn: api.getData,
  })

  if (isError || !data) {
    return <p>Error</p>
  }

  if (isLoading) {
    return <img alt="loading spinner" src="https://i.gifer.com/Mr3W.gif" />
  }

  let prompts
  switch (gameState.mode) {
    case 'Classic':
      prompts = data['Classic']
      break

    default:
      prompts = data['Default']
  }

  const categories: models.Categories = { All: [] }
  prompts.forEach((prompt) => {
    if (categories[prompt.category]) {
      categories[prompt.category].push(prompt)
    } else {
      categories[prompt.category] = [prompt]
    }
    categories.All.push(prompt)
  })

  function roundHandler() {
    switch (gameState.currentRound) {
      case 0:
        setGameState((prev) => ({
          ...prev,
          currentPrompt: prev.prompts?.at(-1),
          prompts: prev.prompts?.slice(0, -1),
          currentRound: prev.currentRound + 1,
          jigsaw: Array(16).fill(1),
        }))
        break
      case 4:
        // ^ this is how many rounds there are per playthrough
        setGameState((prev) => ({
          ...prev,
          currentRound: 0,
          currentStage: 0,
          gameIsOver: true,
        }))
        break
      default:
        console.log('i have been called, I am default case in roundhandler')
      // setGameState((prev) => ({
      //   ...prev,
      //   currentPrompt: prev.prompts.at(-1),
      //   prompts: prev.prompts.slice(0, -1),
      //   currentRound: prev.currentRound + 1,
      //   jigsaw: Array(16).fill(1),
      // }))
    }
  }

  function guessHandler() {
    if ((gameState.currentStage || 0) >= 5) {
      setGameState((prev) => ({
        ...prev,
        currentPrompt: prev.prompts.at(-1),
        prompts: prev.prompts.slice(0, -1),
        currentRound: prev.currentRound + 1,
        jigsaw: Array(16).fill(1),
        showSummary: true,
        currentStage: 0,
        newGuess: false,
      }))
    } else {
      switch (gameState.guessInfo.at(-1)?.wasCorrect) {
        case true:
          setGameState((prev) => ({
            ...prev,
            currentPrompt: prev.prompts.at(-1),
            prompts: prev.prompts.slice(0, -1),
            currentRound: prev.currentRound + 1,
            jigsaw: Array(16).fill(1),
            showSummary: true,
            currentStage: 1,
            newGuess: false,
          }))
          break
        case false:
          setGameState((prev) => ({
            ...prev,
            newGuess: false,
            currentStage: (prev.currentStage || 0) + 1,
          }))
          break
        default:
          console.log('guess', gameState.guessInfo.at(-1))
      }
    }
  }

  if (gameState.gameHasStarted) {
    roundHandler()
    console.log('round', gameState.currentPrompt)
  }

  if (gameState.newGuess) {
    guessHandler()
  }

  if (gameState.gameIsOver && !gameState.showSummary) {
    return (
      <GameEnding
        gameState={gameState}
        setGameState={setGameState}
        initialGameState={initialGameState}
      />
    )
  }

  if (gameState.showSummary) {
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        showSummary: false,
      }))
    }, 2000)
    return <StageResult gameState={gameState} setGameState={setGameState} />
  }

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    const target = e.target as HTMLElement
    const promptsByMode: models.Prompt[] = categories[target.id]
    // shuffling prompts
    promptsByMode?.sort(() => Math.random() - 0.5)
    //
    if (gameState.mode == 'Multiplayer') {
      api
        .addMultiplayerGame(promptsByMode)
        .then((res) => {
          if (res) {
            setGameState({
              ...gameState,
              prompts: promptsByMode,
              currentStage: 1,
              currentRound: 0,
              gameId: res,
              gameHasStarted: true,
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      setGameState((prev) => ({
        ...prev,
        prompts: promptsByMode,
        gameHasStarted: true,
      }))
    }
  }

  async function handleJoin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const input = target.children[1] as HTMLInputElement
    const gameId = Number(input.value)
    api
      .getMultiplayer(gameId)
      .then((res) => {
        if (res) {
          setGameState({
            ...gameState,
            prompts: res.prompts,
            currentStage: 1,
            currentRound: 0,
            gameId,
            gameHasStarted: true,
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      {gameState.gameHasStarted ? (
        <>
          {gameState.mode === 'Classic' && (
            <ClassicStage gameState={gameState} setGameState={setGameState} />
          )}
          {['Jigsaw', 'Multiplayer', 'Join Multiplayer'].includes(
            gameState.mode,
          ) && (
            <JigsawStage gameState={gameState} setGameState={setGameState} />
          )}
          {gameState.mode === 'Pixelated' && (
            <PixelatedStage gameState={gameState} setGameState={setGameState} />
          )}
          <GuessForm gameState={gameState} setGameState={setGameState} />
        </>
      ) : gameState.mode == 'Join Multiplayer' ? (
        <form className="categoryForm" onSubmit={handleJoin}>
          <h2>Enter Lobby Code</h2>
          <input type="text" />
        </form>
      ) : (
        <form className="categoryForm">
          <h2>Choose a Category!</h2>
          <div>
            {Object.keys(categories).map((category, index) => (
              <button
                key={category}
                id={category}
                onClick={handleSubmit}
                className="cybr-btn"
              >
                {category}
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
      )}
    </>
  )
}
