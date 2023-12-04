import * as models from '../../models/prompts'

export default function LiveStage(props: models.GameStateProps) {
  const { gameState } = props
  const output = gameState.currentEndpoint?.output
  const image = output ? output[output.length - 1] : null

  return (
    <div>
      <p style={{ backgroundColor: '#746cbec9', outline: '1px solid #746cbe' }}>
        Current Stage: {output?.length}
      </p>
      <p style={{ backgroundColor: '#746cbec9', outline: '1px solid #746cbe' }}>
        Status: {gameState.currentEndpoint?.status}
      </p>
      <p>
        {/* {new Date().getMilliseconds() -
          (gameState.stageStart?.getMilliseconds() || 0)} */}
      </p>
      {!image || <img src={image} alt="mystery to guess" />}
    </div>
  )
}
