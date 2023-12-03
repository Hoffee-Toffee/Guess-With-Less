import { FormEvent, useState } from 'react'
import * as models from '../../models/prompts.js'
import { GuessForm } from './GuessForm.js'
import { Stage } from './Stage.js'
import { GameEnding } from './GameEnding.js'
import * as api from '../apis/prompts.js'
import { useQuery } from '@tanstack/react-query'

function Round() {
  const [category, setCategory] = useState<string>('all')

  const initialGameState = {
    currentPrompt: undefined,
    prompts: [],
    currentStage: undefined,
    guessInfo: [],
    currentRound: undefined,
    jigsaw: [],
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
    queryKey: ['sd-prompts'],
    queryFn: api.getAllSdPrompts,
  })
  if (isError || isLoading || !prompts) {
    return <p>Stuff</p>
  }

  const categories: models.Categories = {'all': []}
  prompts.forEach((prompt) => {
    if (categories[prompt.category]) {
      categories[prompt.category].push(prompt.name)
    } else {
      categories[prompt.category] = [prompt.name]
    }
    categories.all.push(prompt.name)
  })
  console.log(categories)

  
  function checkGuessInfo() {
    //If guessinfo doesn't exist and no currentPrompt creates first prompt
    if (!gameState.guessInfo?.length && !gameState.currentPrompt) {
      nextPrompt()
      return
    } else if (gameState.currentPrompt && gameState.guessInfo?.length) {
      //if lastGuess wasCorrect next Prompt, if false Next Stage
      const lastGuessIndex = gameState.guessInfo.length - 1
      const lastGuess = gameState.guessInfo[lastGuessIndex]
      if (
        lastGuess.stage === gameState.currentStage &&
        gameState.currentRound === lastGuess.round
      ) {
        if (lastGuess.wasCorrect) {
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
      //choose random prompt. update current Prompt and remove current promp from gameState.prompts
      const prompts = gameState.prompts
      const currentPrompt = prompts.pop()
      setGameState({
        ...gameState,
        currentPrompt,
        prompts,
        currentStage: 1,
        currentRound: (gameState.currentRound || 0) + 1,
        jigsaw: Array(16).fill(1),
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
    if (6 === gameState.currentStage) {
      nextPrompt()
    } else {
      setGameState({
        ...gameState,
        currentStage: (gameState.currentStage || 0) + 1,
      })
    }
  }

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const categoryPrompts = categories[category]
    const shufflePrompts = categoryPrompts?.sort(() => Math.random() - 0.5)
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
          <select onChange={handleChange}>
            <option value="all">All</option>

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
