import * as models from '../../models/prompts'
import { StageImage } from './StageImage'

export function StageResult(props: models.GameStateProps) {
  const { gameState } = props
  
  return (
    <div id="stageBlock">
      <p>It was a {gameState.guessInfo.at(-1)?.prompt}</p>
      <p>You guessed {`${gameState.guessInfo.at(-1)?.guess}`}</p>
      <p>
        You were{' '}
        {gameState.guessInfo.at(-1)?.wasCorrect ? `Correct!` : 'Incorrect :('}
      </p>
      <StageImage
        image={`/images/${gameState.guessInfo.at(-1)?.prompt}.png`}
        stage={gameState.currentStage as number}
      />
    </div>
  )
}

// const image = gameState.lastPrompt.images
  //   ? gameState.lastPrompt.images[gameState.lastPrompt.images.length - 1]
  //   : `/images/${gameState.lastPrompt.name}.png`
  // const lastGuessIndex = gameState.guessInfo.length - 1
  // const lastGuess = gameState.guessInfo[lastGuessIndex]
