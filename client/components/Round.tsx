import { FormEvent, FormEventHandler, useState } from 'react'
import * as models from '../../models/prompts.js'
import * as api from '../apis/prompts.js'
import { useQuery } from '@tanstack/react-query'
import { GuessForm } from './GuessForm.js'
interface Categories {
  [category: string]: models.Prompt[]
}

function Round() {
  const [category, setCategory] = useState<string | null>(null)
  const [gameState, setGameState] = useState({
    currentPrompt: undefined,
    prompts: undefined,
    currentStage: undefined,
    guessInfo: undefined,
  } as models.GameState)

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

  

  function checkGuessInfo(){
    //If guessinfo doesn't exist and no currentPrompt creates first prompt
    if(!gameState.guessInfo && !gameState.currentPrompt){
      nextPrompt()
      return
    }else if(gameState.currentPrompt){
      //if lastGuess wasCorrect next Prompt, if false Next Stage
      const lastGuessIndex = gameState.guessInfo.length -1
      const lastGuess = gameState.guessInfo[lastGuessIndex]
      if(lastGuess.stage === gameState.currentStage){
        if(lastGuess.wasCorrect){
          nextPrompt()
        }else{
          nextStage()
        }
      }
    }
  }
  console.log(gameState)

  function nextPrompt(){
    const promptLength = gameState.prompts.length
    if(promptLength){
      //choose random prompt. update current Prompt and remove current promp from gameState.prompts
      const randomPromptIndex = randomNumber(promptLength)
      setGameState({
        ...gameState,
        currentPrompt: gameState.prompts[randomPromptIndex],
        prompts: gameState.prompts.splice([randomPromptIndex],1)
      })
      //If there are no prompts left, sets currentPrompt to null
    } else {
      setGameState({
        ...gameState,
        currentPrompt:null
      })
    }

  }

  function randomNumber(max){
    return Math.floor(Math.random()* max)
  }

  //If there aren't any stages left go to next Prompt
  function nextStage(){
    const maxStages = gameState.currentPrompt.images.length
    if(maxStages === gameState.currentStage){
      nextPrompt()
    } else {
      setGameState({
        ...gameState,
        currentStage: gameState.currentStage + 1
      })
    }
  }

  if(gameState.prompts){
    checkGuessInfo()
  } else if (gameState.guessInfo && !gameState.currentPrompt) {
    return <p>game over man game over</p>
    // endGame()
  }

  const categories: Categories = {}

  prompts.forEach((prompt) => {
    if (categories[prompt.category]) {
      categories[prompt.category].push(prompt)
    } else {
      categories[prompt.category] = [prompt]
    }
  })

  console.log('this is prompts' + prompts)



  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const categoryPrompts = category ? categories[category] : prompts
    setGameState({
      ...gameState,
      prompts: categoryPrompts,
      currentStage: 1,
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
        <GuessForm gameState={gameState} setGameState={setGameState} />
      )}
    </>
  )
}

export default Round
