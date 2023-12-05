import { Dispatch, SetStateAction } from 'react'

export interface Prompt {
  id: number
  name: string
  category: string
  images?: string[]
}

export interface PromptData {
  name: string
  category: string
}

export interface APIData {
  Default: Prompt[]
  Classic: Prompt[]
}

export interface GuessInfo {
  stage: number
  guess: string
  wasCorrect: boolean
  round: number
  prompt: Prompt
}

export interface GameState {
  lastPrompt: Prompt | undefined
  currentPrompt: Prompt | undefined
  prompts: Prompt[]
  currentStage: number | undefined
  guessInfo: GuessInfo[]
  currentRound: number | undefined
  currentEndpoint: Endpoint | undefined
  stageStart: Date | undefined
  jigsaw: number[]
  stats: boolean
  mode: string
  multiplayerData: []
  gameId?: number
  updated: boolean
}

export interface Endpoint {
  id: string
  status: string
  error: string | null
  output: string[]
}

export interface GameStateProps {
  gameState: GameState
  setGameState: Dispatch<SetStateAction<GameState>>
  initialGameState?: GameState
}

export interface StageImageProps {
  image: string
  stage: number
  jigsaw: number[]
}

export interface GameData {
  username: string
  correct: number
  totalGuesses: number
  mode: string
  gameId?: number
}

export interface Categories {
  [category: string]: Prompt[]
}
