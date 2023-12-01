import { useEffect } from 'react'
import * as models from '../../models/prompts'

export function StageImage(props: models.StageImageProps) {
  useEffect(() => logic(props))

  return <canvas id="canvas" width="500" height="500" />
  function logic(props: models.StageImageProps) {
    const { image, stage } = props

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
}
