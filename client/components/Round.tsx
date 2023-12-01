import { FormEvent, useState } from 'react'
import * as models from '../../models/prompts.js'
import * as api from '../apis/prompts.js'
import { useQuery } from '@tanstack/react-query'
import { GuessForm } from './GuessForm.js'
import { Stage } from './Stage.js'
import { GameEnding } from './GameEnding.js'
interface Categories {
  [category: string]: models.Prompt[]
}

function Round() {
  const [category, setCategory] = useState<string | null>(null)

  const initialGameState = {
    currentPrompt: undefined,
    prompts: [],
    currentStage: undefined,
    guessInfo: [],
    currentRound: undefined,
  } as models.GameState

  const [gameState, setGameState] = useState(initialGameState)

  const {
    data: prompts,
    isError,
    isLoading,
  }: {
    data: models.Prompt[] | undefined
    isError: boolean
    isLoading: boolean
  } = useQuery({
    queryKey: ['prompts'],
    queryFn: api.getAllPrompts,
  })

  if (isError || isLoading || !prompts) {
    return <p>Stuff</p>
  }

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
        currentPrompt,
        prompts,
        currentStage: 1,
        currentRound: (gameState.currentRound || 0) + 1,
      })
      //If there are no prompts left, sets currentPrompt to undefined
    } else {
      setGameState({
        ...gameState,
        currentPrompt: undefined,
      })
    }
  }

  //If there aren't any stages left go to next Prompt
  function nextStage() {
    const maxStages = gameState.currentPrompt?.images.length
    if (maxStages === gameState.currentStage) {
      nextPrompt()
    } else {
      setGameState({
        ...gameState,
        currentStage: (gameState.currentStage || 0) + 1,
      })
    }
  }

  //Updates gameState without
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const categoryPrompts = category ? categories[category] : prompts
    const shufflePrompts = categoryPrompts?.sort(() => Math.random() - 0.5)
    setGameState({
      ...gameState,
      prompts: shufflePrompts as models.Prompt[],
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
          <select onChange={handleChange}>
            <option value="">All</option>

            {Object.keys(categories).map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <button>Start</button>
        </form>
      ) : (
        <>
          <Stage gameState={gameState} setGameState={setGameState} />
          <GuessForm gameState={gameState} setGameState={setGameState} />
        </>
      )}
    </>
  )
}

export default Round
