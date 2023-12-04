import * as models from '../../models/prompts'

export default function ClassicStage(props: models.GameStateProps) {
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