import * as models from '../../models/prompts.js'
import { GuessForm } from './GuessForm.js'
import { GameEnding } from './GameEnding.js'
import * as api from '../apis/prompts.js'
import { useQuery } from '@tanstack/react-query'
import { StageResult } from './StageResult.js'

import JigsawStage from './JigsawStage.js'
import ClassicStage from './ClassicStage.js'
import PixelatedStage from './PixelatedStage.js'
import { FormEvent, MouseEventHandler, SetStateAction } from 'react'

function Round(props: models.GameStateProps) {
  const { gameState, setGameState, initialGameState } = props

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
  if (isError || isLoading || !data) {
    return <p>Stuff</p>
  }

  let prompts
  switch (gameState.mode) {
    case 'Classic':
      prompts = data['Classic']
      break

    default:
      prompts = data['Default']
  }

  console.log(prompts)

  const categories: models.Categories = { All: [] }
  prompts.forEach((prompt) => {
    if (categories[prompt.category]) {
      categories[prompt.category].push(prompt)
    } else {
      categories[prompt.category] = [prompt]
    }
    categories.All.push(prompt)
  })

  //Triggers the first prompt to be created and checks for game over
  console.log(JSON.stringify(gameState, null, 2))
  if (
    (gameState.prompts?.length || gameState.currentPrompt) &&
    gameState.stats
  ) {
    checkGuessInfo()
  } else if (
    gameState.guessInfo?.length &&
    !gameState.currentPrompt &&
    !gameState.stats
  ) {
    return (
      <GameEnding
        gameState={gameState}
        setGameState={setGameState}
        initialGameState={initialGameState}
      />
    )
  }
  //This function creates the first prompt.
  //Handles if a guess was true or false
  function checkGuessInfo() {
    //creates initial first prompt
    if (!gameState.guessInfo?.length && !gameState.currentPrompt) {
      nextPrompt()
    } else if (gameState.currentPrompt && gameState.guessInfo?.length) {
      const latestGuessIndex = gameState.guessInfo.length - 1
      const latestGuess = gameState.guessInfo[latestGuessIndex]
      if (
        latestGuess.stage === gameState.currentStage &&
        gameState.currentRound === latestGuess.round
      ) {
        if (latestGuess.wasCorrect) {
          nextPrompt()
        } else {
          nextStage()
        }
      }
    }
  }

  function nextPrompt() {
    const promptLength = gameState.prompts.length
    if (promptLength) {
      //choose random prompt. update current Prompt and remove current prompt from gameState.prompts
      const prompts = gameState.prompts
      const currentPrompt = prompts.pop()
      setGameState({
        ...gameState,
        lastPrompt: gameState.currentPrompt,
        currentPrompt,
        prompts,
        currentStage: 1,
        currentRound: (gameState.currentRound || 0) + 1,
        jigsaw: Array(16).fill(1),
        stats: true,
      })
      //If there are no prompts left, sets currentPrompt to undefined
    } else {
      setGameState({
        ...gameState,
        currentPrompt: undefined,
        lastPrompt: gameState.currentPrompt,
        stats: true,
      })
    }
  }

  if (gameState.stats && gameState.currentRound != 1) {
    setTimeout(() => {
      setGameState({
        ...gameState,
        stats: false,
      })
    }, 2000)
    return <StageResult gameState={gameState} setGameState={setGameState} />
  }
  //If there aren't any stages left go to next Prompt
  function nextStage() {
    const stages = gameState.currentPrompt?.images
      ? gameState.currentPrompt.images.length
      : 6
    if (stages === gameState.currentStage) {
      nextPrompt()
    } else {
      setGameState({
        ...gameState,
        currentStage: (gameState.currentStage || 0) + 1,
      })
    }
  }

  //Each render check guessinfo or end game
  if (gameState.prompts?.length || gameState.currentPrompt) {
    checkGuessInfo()
  } else if (gameState.guessInfo?.length && !gameState.currentPrompt) {
    return (
      <GameEnding
        gameState={gameState}
        setGameState={setGameState}
        initialGameState={initialGameState}
      />
    )
  }

  //Updates gameState without
  async function handleSubmit(e: MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const categoryPrompts = categories[e.target.id]
    let shufflePrompts = categoryPrompts?.sort(() => Math.random() - 0.5)
    shufflePrompts = shufflePrompts.filter((_, index) => index <= 8)
    if (gameState.mode !== 'Classic')
      shufflePrompts.splice(-1, 0, undefined as unknown as models.Prompt)
    setGameState({
      ...gameState,
      prompts: shufflePrompts,
      currentStage: 1,
      currentRound: 0,
      gameId:
        gameState.mode == 'Multiplayer'
          ? await api.addMultiplayerGame(shufflePrompts)
          : undefined,
    })
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
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      {!gameState.currentStage ? (
        gameState.mode == 'Join Multiplayer' ? (
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
        )
      ) : (
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
      )}
    </>
  )
}

export default Round
