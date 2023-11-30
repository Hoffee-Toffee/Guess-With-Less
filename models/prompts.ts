export interface Prompt {
  id: number
  name: string
  category: string
  images: string
}

export interface PromptData {
  name: string
  category: string
}

export interface GuessInfo {
  stage: number
  guess: string
  wasCorrect: boolean
}

export interface GameState {
  currentPrompt: Prompt | undefined
  prompts: Prompt[] | undefined
  currentStage: number | undefined
  guessInfo: GuessInfo[] | undefined
}
