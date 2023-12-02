import * as models from '../../models/prompts'
import { StageImage } from './StageImage'

export function Stage(props: models.GameStateProps) {
  const { gameState } = props
  const image = `/images/${gameState.currentPrompt}.png`
  return (
    <div>
      <p>Current Stage: {`${gameState.currentStage}`}</p>
      <p>Current Round: {`${gameState.currentRound}`}</p>
      <StageImage image={image} stage={gameState.currentStage as number} jigsaw={gameState.jigsaw as number[]} />
    </div>
  )
}
