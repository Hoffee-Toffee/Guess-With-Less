import * as models from '../../models/prompts'

export function Stage(props: models.GameStateProps) {
  const { gameState} = props
  const image =
    gameState.currentPrompt?.images[(gameState.currentStage || 0) - 1]
  return (
    <div>
      <p>Current Stage: {`${gameState.currentStage}`}</p>
      <p>Current Round: {`${gameState.currentRound}`}</p>
      <img src={image} alt="mystery to guess"></img>
    </div>
  )
}