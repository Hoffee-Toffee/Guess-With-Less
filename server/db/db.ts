import connection from './connection.ts'
import * as Models from '../../models/prompts.ts'

export async function getAllPromps(db = connection): Promise<Models.Prompt[]> {
  return db('prompts').select()
}
