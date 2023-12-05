import * as models from '../../models/prompts'

export default function ClassicStage(props: models.GameStateProps) {
  const { gameState } = props
  return (
    <div>
      <p>Current Stage: {`${gameState.currentStage}`}</p>
      <p>Current Round: {`${gameState.currentRound}`}</p>
      <img
        src={gameState.currentPrompt?.images[gameState.currentStage]}
        alt="mystery to guess"
      ></img>
    </div>
  )
}
