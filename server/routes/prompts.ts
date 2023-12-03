import { Router } from 'express'
import * as Models from '../../models/prompts.ts'
import * as db from '../db/db.ts'

const router = Router()

router.get('/sd', async (req, res) => {
  try {
    const prompts: Models.Prompt[] = await db.getAllSdPrompts()

    res.json(prompts)
  } catch (error) {
    error
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
