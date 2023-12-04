import { useState } from 'react'
import Game from './Game'

function App() {
  const [theme, setTheme] = useState<string>('light')
  theme === 'light'
    ? (document.body.style =
        'background-image: url(https://cdn.dribbble.com/users/119530/screenshots/3433250/comp4.gif)')
    : (document.body.style =
        'background-image: url(https://i.gifer.com/J4o.gif)')
  return (
    <>
      <h1
        style={
          theme === 'dark'
            ? {
                backgroundImage:
                  'url(https://cdn.dribbble.com/users/119530/screenshots/3433250/comp4.gif)',
              }
            : {
                backgroundImage: 'url(https://i.gifer.com/J4o.gif)',
                color: 'white',
              }
        }
      >
        Guess with Less!
      </h1>
      <Game />
      <footer
        style={
          theme === 'dark'
            ? {
                backgroundImage:
                  'url(https://cdn.dribbble.com/users/119530/screenshots/3433250/comp4.gif)',
                position: 'static',
              }
            : {
                backgroundImage: 'url(https://i.gifer.com/J4o.gif)',
                position: 'static',
              }
        }
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
