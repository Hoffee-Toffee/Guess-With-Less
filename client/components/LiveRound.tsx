import { FormEvent, useState } from 'react'
import * as models from '../../models/prompts'
import * as api from '../apis/prompts'
import { GuessForm } from './GuessForm'
import LiveStage from './LiveStage'
import { GameEnding } from './GameEnding'

function LiveRound(props: models.GameStateProps) {
  const { gameState, setGameState, initialGameState } = props

  function pickPrompt() {
    const color = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'purple']
    const noun = ['chair', 'fork', 'potato', 'alien', 'robot', 'lion', 'crown']

    const random = (arr: string[]) =>
      arr[Math.floor(Math.random() * arr.length)]
    return `${random(color)} ${random(noun)}`
  }
  const [prompt, setPrompt] = useState<string | null>(null)

  //Triggers the first prompt to be created and checks for game over
  if (gameState.currentPrompt && gameState.updated) {
    checkGuessInfo()
  } else if (gameState.guessInfo?.length && !gameState.currentPrompt) {
    return (
      <GameEnding
        gameState={gameState}
        setGameState={setGameState}
        initialGameState={initialGameState}
      />
    )
  }
  //This function creates the first prompt.
  //Handles if a guess was true or false
  function checkGuessInfo() {
    if (gameState.guessInfo?.length) {
      const latestGuessIndex = gameState.guessInfo.length - 1
      const latestGuess = gameState.guessInfo[latestGuessIndex]
      if (
        latestGuess.stage === gameState.currentStage &&
        gameState.currentRound === latestGuess.round
      ) {
        if (latestGuess.wasCorrect) {
          handleCancel()
          return
        }
      }
    }

    const oldLen = gameState.currentEndpoint?.output.length
    api
      .checkImageRequest(gameState.currentEndpoint?.id || '')
      .then((newData) => {
        setTimeout(async () => {
          if (!['processing', 'starting'].includes(newData.status)) {
            handleSubmit()
            return
          }

          setGameState({
            ...gameState,
            currentStage: newData.output.length,
            currentEndpoint: newData,
            stageStart:
              oldLen == newData.output.length
                ? gameState.stageStart
                : new Date(),
            updated: true,
          })
        }, 2000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function nextPrompt() {
    const promptLength = gameState.prompts.length
    if (promptLength) {
      //choose random prompt. update current Prompt and remove current prompt from gameState.prompts
      const prompts = gameState.prompts
      const currentPrompt = prompts.pop()
      setGameState({
        ...gameState,
        currentPrompt,
        prompts,
        currentStage: 1,
        currentRound: (gameState.currentRound || 0) + 1,
      })
      //If there are no prompts left, sets currentPrompt to undefined
    } else {
      setGameState({
        ...gameState,
        currentPrompt: undefined,
      })
    }
  }

  async function handleCancel() {
    if (gameState.currentEndpoint)
      api.cancelImageRequest(gameState.currentEndpoint.id)
  }

  //If there aren't any stages left go to next Prompt
  function nextStage() {
    const maxStages = gameState.currentPrompt?.images?.length
    if (maxStages === gameState.currentStage) {
      nextPrompt()
    } else {
      setGameState({
        ...gameState,
        currentStage: (gameState.currentStage || 0) + 1,
      })
    }
  }

  //Updates gameState without
  async function handleSubmit(
    event: FormEvent<HTMLFormElement> | undefined = undefined,
  ) {
    event?.preventDefault()
    const currentPrompt: string = prompt && event ? prompt : pickPrompt()
    setGameState({
      ...gameState,
      currentPrompt,
      currentStage: 0,
      currentRound: 0,
      guessInfo: [],
      currentEndpoint: await api.makeImageRequest(currentPrompt),
      stageStart: new Date(),
      updated: true,
    })
  }

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPrompt(event.target.value)
  }

  return (
    <>
      {!gameState.currentEndpoint ||
      gameState.currentEndpoint.status == 'canceled' ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="prompt">Prompt:</label>
          <input id="prompt" type="text" onChange={handleChange} />
          <button>Start</button>
        </form>
      ) : (
        <>
          <LiveStage gameState={gameState} setGameState={setGameState} />
          {gameState.currentEndpoint.status != 'processing' || (
            <GuessForm gameState={gameState} setGameState={setGameState} />
          )}
          <button onClick={handleCancel}>Cancel Prompt</button>
        </>
      )}
    </>
  )
}

export default LiveRound
