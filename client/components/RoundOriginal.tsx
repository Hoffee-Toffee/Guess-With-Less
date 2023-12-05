import { FormEvent, useCallback, useEffect, useState } from 'react'
import * as models from '../../models/prompts.js'
import { GuessForm } from './GuessForm.js'
import { GameEnding } from './GameEnding.js'
import * as api from '../apis/prompts.js'
import { useQuery } from '@tanstack/react-query'
import { StageResult } from './StageResult.js'

import JigsawStage from './JigsawStage.js'
import ClassicStage from './ClassicStage.js'
import PixelatedStage from './PixelatedStage.js'

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
    queryKey: ['prompts'],
    queryFn: () => {
      switch (gameState.mode) {
        case 'Classic':
          return api.getAllPrompts()

        default:
          return api.getAllSdPrompts()
      }
    },
  })
  if (isError || isLoading || !prompts) {
    return <p>Stuff</p>
  }

  //Triggers the first prompt to be created and checks for game over
  if (gameState.prompts?.length || gameState.currentPrompt || gameState.stats) {
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

  const nextPrompt = useCallback(() => {
    setGameState((prevGameState) => {
      const promptLength = prevGameState.prompts.length
      if (promptLength) {
        //choose random prompt. update current Prompt and remove current prompt from gameState.prompts
        //const currentPrompt = prompts.pop() //happening twice
        return {
          ...prevGameState,
          lastPrompt: prevGameState.currentPrompt,
          currentPrompt: prevGameState.prompts.at(-1),
          prompts: prevGameState.prompts.slice(0, -1),
          currentStage: 1,
          currentRound: (prevGameState.currentRound || 0) + 1,
          jigsaw: Array(16).fill(1),
          stats: true,
        }
        //If there are no prompts left, sets currentPrompt to undefined
      } else {
        console.log(`I should only be happening at the end`)
        return {
          ...prevGameState,
          currentPrompt: undefined,
          lastPrompt: prevGameState.currentPrompt,
          stats: true,
        }
      }
    })
  }, [setGameState])

  // const { stats, currentRound } = gameState
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (stats && currentRound != 1) {
  //       setGameState((prev) => ({
  //         ...prev,
  //         stats: false,
  //       }))
  //     }
  //   }, 2000)

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [stats, currentRound, setGameState])

  
  const categories: models.Categories = { All: [] }
  prompts.forEach((prompt) => {
    if (categories[prompt.category]) {
      categories[prompt.category].push(prompt)
    } else {
      categories[prompt.category] = [prompt]
    }
    categories.All.push(prompt)
  })

  

  if (gameState.stats && gameState.currentRound != 1) {
    return <StageResult gameState={gameState} />
  }
  //If there aren't any stages left go to next Prompt
  function nextStage() {
    if (
      (gameState.currentPrompt.images?.length || 6) === gameState.currentStage
    ) {
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
  async function handleSubmit(e: React.DOMAttributes<HTMLButtonElement>) {
    e.preventDefault()
    const categoryPrompts = categories[e.target.id]
    console.log('I am category prompts log', categoryPrompts)
    let shufflePrompts = categoryPrompts?.sort(() => Math.random() - 0.5)
    shufflePrompts = shufflePrompts.filter((_, index) => index <= 8)
    console.log('I am shuffle prompts log', shufflePrompts)
    setGameState({
      ...gameState,
      prompts: shufflePrompts,
      currentStage: 1,
      currentRound: 0,
    })
  }

  return (
    <>
      {!gameState.currentStage ? (
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
      ) : (
        <>
          {gameState.mode === 'Classic' && (
            <ClassicStage gameState={gameState} setGameState={setGameState} />
          )}
          {gameState.mode === 'Jigsaw' && (
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
