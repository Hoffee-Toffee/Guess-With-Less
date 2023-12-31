import request from 'superagent'
import * as models from '../../models/prompts'

const rootUrl = '/api/v1/prompts'

export function getAllSdPrompts(): Promise<models.Prompt[] | Error> {
  return request
    .get(rootUrl + '/sd')
    .then((res) => {
      return res.body
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}

export function getAllPrompts(): Promise<models.Prompt[] | Error> {
  return request
    .get(rootUrl + '/')
    .then((res) => {
      return res.body
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}

export async function getData() {
  return {
    Classic: await getAllPrompts(),
    Default: await getAllSdPrompts(),
  }
}

export function makeImageRequest(prompt: string) {
  return request
    .post(rootUrl + '/make')
    .send({
      prompt,
    })
    .then((res) => {
      return res.body
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}

export function checkImageRequest(id: string) {
  return request
    .post(rootUrl + '/check')
    .send({
      id,
    })
    .then((res) => {
      return res.body
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}

export function cancelImageRequest(id: string) {
  return request
    .post(rootUrl + '/cancel')
    .send({
      id,
    })
    .then((res) => {
      return res.body
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}

export async function addToLeaderboard(gameData: models.GameData) {
  const response = await request
    .post(rootUrl + '/addToLeaderboard')
    .send(gameData)
  return response.body
}

export async function getLeaderboard(gameId?: number) {
  const response = await request(
    rootUrl + (gameId ? `/leaderboard/${gameId}` : '/leaderboard'),
  )
  return response.body
}

export async function getMultiplayer(gameId?: number) {
  const response = await request(rootUrl + '/multiplayer/' + gameId)
  return response.body
}

export async function addMultiplayerGame(prompts: models.Prompt[]) {
  const response = await request
    .post(rootUrl + '/multiplayer')
    .send({ prompts: JSON.stringify(prompts) })
  return response.body
}
