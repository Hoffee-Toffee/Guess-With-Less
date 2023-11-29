import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import * as Models from '../../models/prompts'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  answer: Models.Prompt
}

export function GuessForm({ answer }: Props) {
  const [guess, setGuess] = useState<string>('')
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const queryClient = useQueryClient()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(answer.name, guess)
    checkAnswer(answer.name, guess)
    setGuess('')
  }

  function checkAnswer(correctName: Models.Prompt['name'], guess: string) {
    if (correctName.toLowerCase() === guess.toLowerCase()) {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }
  }

  function ifCorrect() {
    isCorrect ? alert('youre correct') : null
  }

  useEffect(ifCorrect, [isCorrect])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="guess">Guess the Image!</label>
        <input
          id="guess"
          type="text"
          value={guess}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGuess(e.target.value)
          }
        />
        <button type="submit">Submit Guess</button>
      </form>
    </>
  )
}
