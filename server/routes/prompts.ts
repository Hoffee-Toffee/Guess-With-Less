import { Router } from 'express'
import * as models from '../../models/prompts.ts'
import * as db from '../db/db.ts'
import request from 'superagent'
import dotenv from 'dotenv'
dotenv.config()

const router = Router()
const endpoint = 'https://api.replicate.com/v1/predictions'

async function imageRequest(
  type: string,
  value: string,
): Promise<models.Endpoint | void> {
  let res
  switch (type) {
    case 'GET':
      // Value will be the id to check
      res = await request
        .get(`${endpoint}/${value}`)
        .set('Authorization', 'token ' + process.env.TOKEN)

      return res.body as models.Endpoint
    case 'POST':
      // Value will be the prompt to post
      res = await request
        .post(`${endpoint}`)
        .send({
          version:
            'f72145829507ace382fad7f3c22bd19df152f00005a3e678c652ab052dcd5005',
          input: {
            prompts: `realistic ${value} #pixelart`,
            settings:
              'drawer: pixel\nquality: better\nsize: [500, 500]\npixel_size: [50, 50]',
          },
        })
        .set('Authorization', 'token ' + process.env.TOKEN)

      return res.body as models.Endpoint
    case 'CANCEL':
      // Value will be the prompt to post
      res = await request
        .post(`${endpoint}/${value}/cancel`)
        .set('Authorization', 'token ' + process.env.TOKEN)

      return res.body as models.Endpoint
  }
}

router.post('/make', async (req, res) => {
  try {
    const { prompt }: { prompt: string } = req.body

    // Send off request
    // Get back the data
    const { id, status, error } = await imageRequest('POST', prompt)

    res.json({
      id,
      status,
      error,
      output: [],
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/check', async (req, res) => {
  try {
    const { id }: { id: string } = req.body

    // Send off request
    // Get back the data
    const { status, error, output } = await imageRequest('GET', id)

    res.json({ id, status, error, output: output || [] })
  } catch (error) {
    error
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/cancel', async (req, res) => {
  try {
    const { id }: { id: string } = req.body

    // Send off request
    // Get back the data
    const { status, error, output } = await imageRequest('CANCEL', id)

    res.json({ id, status, error, output: output || [] })
  } catch (error) {
    error
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/sd', async (req, res) => {
  try {
    const prompts: models.Prompt[] = await db.getAllSdPrompts()

    res.json(prompts)
  } catch (error) {
    error
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard: models.GameData[] = await db.getLeaderboard()
    res.json(leaderboard)
  } catch (error) {
    error
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/', async (req, res) => {
  try {
    const prompts: models.Prompt[] = await db.getAllPixrayPrompts()

    res.json(
      prompts.map((prompt) => ({
        ...prompt,
        images: JSON.parse(prompt.images),
      })),
    )
  } catch (error) {
    error
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/addToLeaderboard', async (req, res) => {
  const gameData = req.body
  try {
    const dataToAdd = await db.addToLeaderboard(gameData)
    res.json(dataToAdd)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `Add to leaderboard is not working` })
  }
})

router.post('/multiplayer', async (req, res) => {
  const data = req.body
  try {
    const moredata = await db.addMultiplayerScore(data)
    res.json(moredata)
  } catch (err) {
    res.status(700000000).json({ message: 'something happened' })
  }
})

router.get('/multiplayer', async (req, rizz) => {
  try {
    const evenmoredata = await db.getMultiplayer()
    rizz.json(evenmoredata)
  } catch (err) {
    rizz.status(-12).json({ message: 'stop trying' })
  }
})
export default router
