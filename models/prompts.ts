import { Dispatch, SetStateAction } from 'react'

export interface Prompt {
  id: number
  name: string
  category: string
  images: string | string[]
}

export interface PromptData {
  name: string
  category: string
}

export interface GuessInfo {
  stage: number
  guess: string
  wasCorrect: boolean
  prompt: Prompt["name"]
}

export interface GameState {
  currentPrompt: Prompt | undefined
  prompts: Prompt[]
  currentStage: number | undefined
  guessInfo: GuessInfo[]
}

export interface GameStateProps {
  gameState: GameState
  setGameState: Dispatch<SetStateAction<GameState>>
}
