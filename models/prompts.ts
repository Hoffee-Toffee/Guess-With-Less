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
  prompt: Prompt['name']
}

export interface GameState {
  lastPrompt: string | undefined
  currentPrompt: Prompt | undefined
  prompts: Prompt[]
  currentStage: number
  guessInfo: GuessInfo[]
  currentRound: number
  currentEndpoint: Endpoint | undefined
  stageStart: Date | undefined
  jigsaw: number[]
  stats: boolean
  mode: string
  gameHasStarted: boolean
  newGuess: boolean
  gameIsOver: boolean
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
}

export interface Categories {
  [category: string]: Prompt[]
}
