import { FormEvent, useState } from 'react'
import * as models from '../../models/prompts.js'
import { GuessForm } from './GuessForm.js'
import JigsawStage from './JigsawStage.js'
import { GameEnding } from './GameEnding.js'
import * as api from '../apis/prompts.js'
import { useQuery } from '@tanstack/react-query'
import { StageResult } from './StageResult.js'

function Round(props: models.GameStateProps) {
  const { gameState, setGameState, initialGameState } = props

  const [category, setCategory] = useState<string>('All')

  const {
    data: prompts,
    isError,
    isLoading,
  }: {
    data: models.Prompt[] | undefined
    isError: boolean
    isLoading: boolean
  } = useQuery({
    queryKey: ['sd-prompts'],
    queryFn: api.getAllSdPrompts,
  })
  if (isError || isLoading || !prompts) {
    return <p>Stuff</p>
  }
  console.log(prompts)
  const categories: models.Categories = { All: [] }
  prompts.forEach((prompt) => {
    if (categories[prompt.category]) {
      categories[prompt.category].push(prompt.name)
    } else {
      categories[prompt.category] = [prompt.name]
    }
    categories.All.push(prompt.name)
  })
  console.log(categories)

  const categories: Categories = {}

  prompts.forEach((prompt) => {
    if (categories[prompt.category]) {
      categories[prompt.category].push(prompt)
    } else {
      categories[prompt.category] = [prompt]
    }
  })

  //Triggers the first prompt to be created and checks for game over
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
  //This function creates the first prompt.
  //Handles if a guess was true or false
  function checkGuessInfo() {
    //creates initial first prompt
    if (!gameState.guessInfo?.length && !gameState.currentPrompt) {
      nextPrompt()
      return
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
  console.log(gameState)

  if (gameState.stats && gameState.currentRound != 1) {
    setTimeout(() => {
      setGameState({
        ...gameState,
        stats: false,
      })
    }, 3000)
    return <StageResult gameState={gameState} />
  }
  //If there aren't any stages left go to next Prompt
  function nextStage() {
    if (6 === gameState.currentStage) {
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
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const categoryPrompts = categories[category]
    let shufflePrompts = categoryPrompts?.sort(() => Math.random() - 0.5)
    shufflePrompts = shufflePrompts.filter((_, index) => index <= 5)
    setGameState({
      ...gameState,
      prompts: shufflePrompts,
      currentStage: 1,
      currentRound: 0,
    })
  }

  async function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value)
  }

  return (
    <>
      {!gameState.currentStage ? (
        <form onSubmit={handleSubmit}>
          <p>Choose your category!</p>
          <select onChange={handleChange}>
            {Object.keys(categories).map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <button>Start</button>
        </form>
      ) : (
        <>
          {gameState.mode === 'Jigsaw' && (
            <JigsawStage gameState={gameState} setGameState={setGameState} />
          )}
          <GuessForm gameState={gameState} setGameState={setGameState} />
        </>
      )}
    </>
  )
}

export default Round
