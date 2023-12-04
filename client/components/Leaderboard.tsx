import * as api from '../apis/prompts'
import * as models from '../../models/prompts'
import { useEffect, useState } from 'react'

interface Props {
  gameMode: string
  sortBy: string
}
export default function Leaderboard(props: Props) {
  const { gameMode, sortBy } = props

  const [leaderboard, setLeaderboard] = useState<models.GameData[] | undefined>(
    [],
  )
  async function getLeaderboard() {
    const leaderboardData: models.GameData[] = await api.getLeaderboard()
    setLeaderboard(leaderboardData)
  }

  useEffect(() => {
    async function fetchStats() {
      await getLeaderboard()
    }
    fetchStats()
  }, [leaderboard])

  const gameModeBoard = leaderboard?.filter((game) => game.mode === gameMode)

  const sortedBoard = gameModeBoard?.sort(compare)

  function compare(a: { correct: number }, b: { correct: number }) {
    if (a.correct < b.correct) {
      return -1
    } else if (a.correct > b.correct) {
      return 1
    }
    return 0
  }

  return (
    <>
      {/* {leaderboard?.map((game, i) => (
        <p key={i}>
          {game.username} - {game.mode} - {game.correct} / {game.totalGuesses}
        </p>
      ))} */}

      {sortedBoard?.map((game, i) => (
        <p key={i}>
          {game.username} - {game.mode} - {game.correct} / {game.totalGuesses}
        </p>
      ))}
      <p>{gameModeBoard?.length}</p>
    </>
  )
}
