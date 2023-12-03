import { Dispatch, SetStateAction } from 'react'

export interface Prompt {
  id: number
  name: string
  category: string
}

export interface PromptData {
  name: string
  category: string
}

export interface GuessInfo {
  stage: number
  guess: string
  wasCorrect: boolean
  round: number
}

export interface GameState {
  lastPrompt: string | undefined
  currentPrompt: string | undefined
  prompts: string[]
  currentStage: number | undefined
  guessInfo: GuessInfo[]
  currentRound: number | undefined
  jigsaw: number[]
  stats: boolean
  mode: string
}

export interface GameStateProps {
  gameState: GameState
  setGameState?: Dispatch<SetStateAction<GameState>>
  initialGameState?: GameState
}

export interface StageImageProps {
  image: string
  stage: number
  jigsaw: number[]
}

export interface Categories {
  [category: string]: string[]
}
