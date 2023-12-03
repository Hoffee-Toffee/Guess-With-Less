import * as models from '../../models/prompts'

export default function LiveStage(props: models.GameStateProps) {
  const { gameState } = props
  const output = gameState.currentEndpoint?.output
  const image = output ? output[output.length - 1] : null

  return (
    <div>
      <p>Current Stage: {output?.length}</p>
      <p>Status: {gameState.currentEndpoint?.status}</p>
      <p>
        {/* {new Date().getMilliseconds() -
          (gameState.stageStart?.getMilliseconds() || 0)} */}
      </p>
      {!image || <img src={image} alt="mystery to guess" />}
    </div>
  )
}
