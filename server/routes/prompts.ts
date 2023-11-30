import { Router } from 'express'
import * as Models from '../../models/prompts.ts'
import * as db from '../db/db.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const prompts: Models.Prompt[] = await db.getAllPrompts()

    res.json(
      prompts.map((prompt) => ({
        ...prompt,
        images:
          typeof prompt.images === 'string'
            ? JSON.parse(prompt.images)
            : prompt.images,
      })),
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
