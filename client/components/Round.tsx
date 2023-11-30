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

  const categories: Categories = {}

  prompts.forEach((prompt) => {
    if (categories[prompt.category]) {
      categories[prompt.category].push(prompt)
    } else {
      categories[prompt.category] = [prompt]
    }
  })

  console.log(gameState)

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
