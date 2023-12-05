import { useEffect } from 'react'
import * as models from '../../models/prompts'

export function StageImage(props: models.StageImageProps) {
  useEffect(() => logic(props), [props.stage])

  return <canvas id="canvas" width="500" height="500" />
  function logic(props: models.StageImageProps) {
    const { image, stage, jigsaw } = props

    const canvas = document.getElementById('canvas') as HTMLCanvasElement

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const img = new Image()

    ctx.imageSmoothingEnabled = false

    // wait until image is actually available
    img.onload = jigBlurFn
    img.src = image
    let pieceIndices: number[] = [] //contains locations of all the pieces
    //If element === 1 add its index into pieceINdices array
    if (jigsaw) {
      jigsaw.forEach((element, index) => {
        if (element === 1) {
          pieceIndices.push(index)
        }
      })
    }
    function getRandomInt(max: number) {
      const chosenIndex = pieceIndices[Math.floor(Math.random() * max)]
      pieceIndices = pieceIndices.filter((element) => element !== chosenIndex)
      return chosenIndex
    }
    function jigBlurFn() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const size =
        stage >= 4 || !jigsaw ? 1 : Math.pow(3, stage * 0.25 + 3.25) / 243
      const w = canvas.width * size
      const h = canvas.height * size

      ctx.drawImage(img, 0, 0, w, h)
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height)
      if (!jigsaw) return
      const amountToReveal = Math.floor(jigsaw.length / 6)
      const amountToRevealArray = Array(amountToReveal).fill(amountToReveal)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      amountToRevealArray.forEach((_) => {
        const piecesToChange = getRandomInt(pieceIndices.length)
        jigsaw[piecesToChange] = 0
      })

      jigsaw.forEach((element, index) => {
        if (element === 1) {
          const rowLength = Math.sqrt(jigsaw.length)
          const blockSize = 500 / rowLength

          const x = (index % rowLength) * blockSize
          const y = Math.floor(index / rowLength) * blockSize
          ctx.fillRect(x, y, blockSize, blockSize)
        }
      })
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
