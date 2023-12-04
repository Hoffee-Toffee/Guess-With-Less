import * as api from '../apis/prompts'
import * as models from '../../models/prompts'
import { useState } from 'react'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<models.GameData[] | undefined>(
    undefined,
  )
  async function getLeaderboard() {
    const leaderboardData: models.GameData[] = await api.getLeaderboard()
    setLeaderboard(leaderboardData)
  }

  return <>{leaderboard?.map((game, i) => <p key={i}>hi</p>)}</>
}
