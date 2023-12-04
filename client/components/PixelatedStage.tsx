import { useEffect } from 'react'
import * as models from '../../models/prompts'

export default function PixelatedStage(props: models.GameStateProps) {
  const { gameState } = props
  const { currentStage: stage } = gameState
  const image = `/images/${gameState.currentPrompt.name}.png`
  console.log(image)

  useEffect(() => logic())

  function logic() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const img = new Image()

    ctx.imageSmoothingEnabled = false

    // wait until image is actually available
    img.onload = pixelate
    img.src = image

    function pixelate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const size = stage == 6 ? 1 : Math.pow(3, stage * 0.75 + 0.25) / 243
      const w = canvas.width * size
      const h = canvas.height * size

      console.log(size)

      ctx.drawImage(img, 0, 0, w, h)
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height)
    }

    // poly-fill for requestAnmationFrame with fallback for older
    // browsers which do not support rAF.
    window.requestAnimationFrame = (function () {
      return (
        window.requestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60)
        }
      )
    })()
  }

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
      <canvas id="canvas" width="500" height="500" />{' '}
      <div id="bar">
        <span id="round" style={roundStyle} />
        <span id="stage" style={stageStyle} />
      </div>
    </div>
  )
}
