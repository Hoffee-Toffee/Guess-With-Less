import { useState } from 'react'
import * as models from '../../models/prompts.js'
import * as api from '../apis/prompts.js'

function Round() {
  const [category, setCategory] = useState(null)
  const [gameState, setGameState] = useState({
    currentPrompt: undefined,
    prompts: undefined,
    currentStage: undefined,
    guessInfo: undefined,
  } as models.GameState)
  const prompts = api.getAllPrompts() as models.Prompt[]

  const categories = {}

  prompts.forEach((prompt) => {
    if (categories[prompt.category]) {
      categories[prompt.category].push(prompt)
    } else {
      categories[prompt.category] = [prompt]
    }
  })

  console.log(gameState)

  async function handleSubmit(event) {
    event.preventDefault()
    const categoryPrompts = category ? categories[category] : prompts
    setGameState({
      ...gameState,
      prompts: categoryPrompts,
      currentStage: 1,
    })
  }

  async function handleChange(event) {
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
        <p>Weeee!</p>
      )}
    </>
  )
}

export default Round
