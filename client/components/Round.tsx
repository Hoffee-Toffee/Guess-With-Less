import { FormEvent, useState } from 'react'
import * as models from '../../models/prompts.js'
import { GuessForm } from './GuessForm.js'
import { Stage } from './Stage.js'
import { GameEnding } from './GameEnding.js'
import * as api from '../apis/prompts.js'
import { useQuery } from '@tanstack/react-query'
import { StageResult } from './StageResult.js'

function Round() {
  const [category, setCategory] = useState<string>('All')

  const initialGameState = {
    lastPrompt: undefined,
    currentPrompt: undefined,
    prompts: [],
    currentStage: undefined,
    guessInfo: [],
    currentRound: undefined,
    jigsaw: [],
    stats: false,
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

  function checkGuessInfo() {
    //creates initial first prompt
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
    return <StageResult gameState={gameState}/>
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
          <select onChange={handleChange}>
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
