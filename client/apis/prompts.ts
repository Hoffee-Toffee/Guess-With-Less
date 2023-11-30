import request from 'superagent'
import { Prompt } from '../../models/prompts'

const rootUrl = '/api/v1'

export function getPrompts(): Promise<Prompt[]> {
  request.get(rootUrl + '/prompts').then((res) => {
    return res.body
  })
}
