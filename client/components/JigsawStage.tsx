import * as models from '../../models/prompts'
import { StageImage } from './StageImage'

export default function JigsawStage(props: models.GameStateProps) {
  const { gameState } = props
  const image = `/images/${gameState.currentPrompt?.name}.png`

  const roundStyle = {
    width:
      500 -
      (500 / (gameState.prompts?.length + (gameState.currentRound || 0) - 1)) *
        ((gameState.currentRound - 1 || 0)) +
      'px',
  }

  const stageStyle = {
    width: 500 - (500 / 5) * (gameState.currentStage || 0) + 'px',
  }

  return (
    <div id="stageBlock">
      {' '}
      {gameState.gameId && <p>Lobby Code: {gameState.gameId}</p>}
      <p>
       ROUND_{gameState.currentRound}{' : '}  STAGE_{gameState.currentStage}
      </p>
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
