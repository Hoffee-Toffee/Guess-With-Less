import * as models from '../../models/prompts'
import { StageImage } from './StageImage'

export default function JigsawStage(props: models.GameStateProps) {
  const { gameState } = props
  const image = `/images/${gameState.currentPrompt}.png`

  console.log(image)

  const roundStyle = {
    width:
      500 -
      (500 / (gameState.prompts.length + gameState.currentRound - 1)) *
        (gameState.currentRound - 1) +
      'px',
  }

  const stageStyle = {
    width: 500 - (500 / 5) * (gameState.currentStage - 1) + 'px',
  }

  return (
    <div id="stageBlock">
      <p>Stage: {`${gameState.currentStage}`}</p>
      <p>Round: {`${gameState.currentRound}`}</p>
      <StageImage
        image={image}
        stage={gameState.currentStage as number}
        jigsaw={gameState.jigsaw as number[]}
      />
      <div id="bar">
        <span id="round" style={roundStyle} />
        <span id="stage" style={stageStyle} />
      </div>
    </div>
  )
}
