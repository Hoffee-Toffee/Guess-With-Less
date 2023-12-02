import { Dispatch, SetStateAction } from 'react'

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
  currentPrompt: string | undefined
  prompts: string[]
  currentStage: number | undefined
  guessInfo: GuessInfo[]
  currentRound: number | undefined
  jigsaw: number[]
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
