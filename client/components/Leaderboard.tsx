import * as api from '../apis/prompts'
import * as models from '../../models/prompts'
import { useEffect, useState } from 'react'

interface Props {
  gameMode: string
  gameId?: number
}
export default function Leaderboard(props: Props) {
  const { gameMode, gameId } = props

  const [leaderboard, setLeaderboard] = useState<models.GameData[] | undefined>(
    [],
  )
  async function getLeaderboard(gameId?: number) {
    const leaderboardData: models.GameData[] = await api.getLeaderboard(gameId)
    setLeaderboard(leaderboardData)
  }

  useEffect(() => {
    async function fetchshowSummary() {
      await getLeaderboard(gameId)
    }
    fetchshowSummary()
  }, [gameId, leaderboard])

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
    <div
      style={{
        backgroundColor: 'rgb(116 108 190 / 41%)',
        outline: '1px solid #746cbe',
        padding: '1em',
      }}
    >
      {/* {leaderboard?.map((game, i) => (
        <p key={i}>
          {game.username} - {game.mode} - {game.correct} / {game.totalGuesses}
        </p>
      ))} */}
      <h2>Leaderboard for {gameMode}</h2>
      <p
        style={{
          backgroundColor: 'rgb(87 184 123)',
          color: 'rgb(116 108 190 / 41%)',
          outline: '1px solid #746cbe',
          padding: '2px',
        }}
      >
        Name - Gamemode - Correct / Total Guesses
      </p>
      {sortedBoard?.map((game, i) => (
        <p
          key={i}
          style={{
            color: 'rgb(87 184 123)',
            backgroundColor: 'rgb(116 108 190 / 41%)',
            outline: '1px solid #746cbe',
            padding: '2px',
          }}
        >
          {game.username} - {game.mode} - {game.correct} / {game.totalGuesses}
        </p>
      ))}
    </div>
  )
}
