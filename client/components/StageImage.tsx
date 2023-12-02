import { useEffect } from 'react'
import * as models from '../../models/prompts'

export function StageImage(props: models.StageImageProps) {
  useEffect(() => logic(props))

  return <canvas id="canvas" width="500" height="500" />
  function logic(props: models.StageImageProps) {
    const { image, stage, jigsaw } = props

    const canvas = document.getElementById('canvas') as HTMLCanvasElement

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const img = new Image()

    ctx.imageSmoothingEnabled = false

    // wait until image is actually available
    img.onload = jigsawFn
    img.src = image
    const pieceIndices = [] //contains locations of all the pieces
    //If element === 1 add its index into pieceINdices array
    jigsaw.forEach((element, index) => {
      if(element === 1 ){
        pieceIndices.push(index)
      }
    })
    console.log(pieceIndices)

    function getRandomInt(max: number){
      return pieceIndices[Math.floor(Math.random() * max)]
    }
    console.log(jigsaw)
    function jigsawFn() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
      const amountOfPiecesBlocking = pieceIndices.length
      
      const piecesToChange1 = getRandomInt(amountOfPiecesBlocking)
        console.log(piecesToChange1)
        jigsaw[piecesToChange1] = 0
      
  console.log(jigsaw)
      jigsaw.forEach((element, index) => {
        if(element === 1){
        const x = index % 3 * 167
        const y = Math.floor(index / 3)* 167
        ctx.fillRect(x,y,167,167)

    }})     
  }


    // function pixelate() {
    //   ctx.clearRect(0, 0, canvas.width, canvas.height)
    //   const size = stage == 6 ? 1 : Math.pow(3, stage * 0.75 + 0.25) / 243
    //   const w = canvas.width * size
    //   const h = canvas.height * size

    //   console.log(size)

    //   ctx.drawImage(img, 0, 0, w, h)
    //   ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height)
    //   // ctx.fillRect(0, 0, 167, 167)
    //   if (jigsaw[0] === 0){
    //     ctx.fillRect(167, 167, 167, 167)
    //   }
    // }

    // poly-fill for requestAnmationFrame with fallback for older
    // browsers which do not support rAF.
    window.requestAnimationFrame = (function () {
      return (
        window.requestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60)
        }
      ) })()
   
  }
}
