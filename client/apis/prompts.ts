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

export async function getLeaderboard() {
  const response = await request(rootUrl + '/leaderboard')
  return response.body
}
