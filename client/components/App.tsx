import { useState } from 'react'
import Game from './Game'

function App() {
  const [theme, setTheme] = useState<string>('light')
  theme === 'light'
    ? (document.body.style = 'background: #303134; color: #b6be6c')
    : (document.body.style = 'background: #BDC1C6; color: black')
  return (
    <>
      <h1>Guess with Less!</h1>
      <Game />
      <footer
        style={{
          backgroundImage: 'linear-gradient(45deg, black, transparent)',
        }}
      >
        <button
          onClick={(e) => {
            e.preventDefault
            theme === 'light' ? setTheme('dark') : setTheme('light')
          }}
        >
          💡
        </button>
      </footer>
    </>
  )
}

export default App
