import * as models from '../../models/prompts'
import { StageImage } from './StageImage'





export function StageResult(props: models.GameStateProps){
  const { gameState } = props
  const image = `/images/${gameState.lastPrompt}.png`
  const lastGuessIndex = gameState.guessInfo.length - 1
  const lastGuess = gameState.guessInfo[lastGuessIndex]

  return (
    <div id="stageBlock">
      <p>It was a {gameState.lastPrompt}</p>
      <p>You guessed {`${lastGuess.guess}`}</p>
      <p>You were {lastGuess.wasCorrect ? `Correct that's so amazing how did you do that` : 'Incorrect how did you not guess that...'}</p>
      <StageImage image={image} stage={gameState.currentStage as number}/>
    </div>
  )
}