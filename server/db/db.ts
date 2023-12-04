import connection from './connection.ts'
import * as Models from '../../models/prompts.ts'

export async function getAllPixrayPrompts(
  db = connection,
): Promise<Models.Prompt[]> {
  return db('pixray-prompts').select()
}

export async function getAllSdPrompts(
  db = connection,
): Promise<Models.Prompt[]> {
  return db('sd-prompts').select()
}

export async function getLeaderboard(): Promise<Models.GameData[]> {
  return connection('leaderboard').select()
}

export async function addToLeaderboard(
  gameData: Models.GameData,
): Promise<Models.GameData> {
  return connection('leaderboard').insert(gameData).returning('*')
}

export async function getMultiplayer(): Promise<Models.GameData[]> {
  return connection('multiplayer').select()
}

export async function addMultiplayerScore(data) {
  return connection('multiplayer').insert(data).returning('*')
}
