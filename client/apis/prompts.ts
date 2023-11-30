import request from 'superagent'
import * as models from '../../models/prompts'

const rootUrl = '/api/v1'

export function getPrompts(): Promise<models.Prompt[]> {
  request.get(rootUrl + '/prompts').then((res) => {
    return res.body
  })
}
