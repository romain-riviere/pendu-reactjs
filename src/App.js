import React, { Component } from 'react'

import './App.css'

const MAX_TRIES = 5

const WORDS = [
  'PIZZA',
  'OISEAU',
  'DEVELOPPEUR',
  'PAPIER',
  'BOUTEILLE',
  'SAUCISSON',
  'CIGARETTE',
  'LUNETTE',
  'TELEPHONE'
]

class App extends Component {
  state = {
    word: this.generateWord(),
    usedLetters: [],
    errorLetter: '',
    remainingErrors: MAX_TRIES,
    gameWon: false,
  }

  generateWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  // Arrow fx for binding
  handleKeydown = (event) => {
    const { word, usedLetters, remainingErrors, gameWon } = this.state
    if (event.keyCode >= 65 && event.keyCode <= 90 && remainingErrors >= 0 && !gameWon) {
      const newLetter = String.fromCharCode(event.keyCode)
      if (usedLetters.includes(newLetter)) {
        const newRemainingErrors = remainingErrors - 1
        this.setState({
          errorLetter: newLetter,
          remainingErrors: newRemainingErrors
        })
      } else {
        if (word.includes(newLetter)) {
          this.setState({
            usedLetters: [...usedLetters, ...newLetter]
          })
        } else {
          const newRemainingErrors = remainingErrors - 1
          this.setState({
            errorLetter: newLetter,
            remainingErrors: newRemainingErrors
          })
        }
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown, false);
  }

  //Arrow fx for binding
  computeDisplay = () => {
    const { word, usedLetters } = this.state
    const displayWord = word.replace(/\w/g,
      (letter) => (usedLetters.includes(letter) ? letter : '_')
    )

    if (!displayWord.includes('_')) this.victory();

    return displayWord;
  }

  victory() {
    const { gameWon } = this.state
    if (!gameWon) this.setState({ gameWon: true })
  }

  resetGame() {
    this.setState({
      word: this.generateWord(),
      usedLetters: [],
      errorLetter: '',
      remainingErrors: MAX_TRIES,
      gameWon: false,
    })
  }

  render() {
    const { usedLetters, errorLetter, remainingErrors, gameWon } = this.state
    return (
      <div className="pendu">
        <div className="word">{this.computeDisplay()}</div>
        {!gameWon &&
          <div className="usedLetters">
            {usedLetters.map((letter) => (
              <div className="letter" key={letter}>{letter}</div>
            ))}
          </div>
        }
        {errorLetter !== '' && !gameWon && <div className="errorLetter">Lettre déjà utilisée : <div className="letter">{errorLetter}</div></div>}
        {(remainingErrors === -1 || gameWon) && <button className="resetGameButton" onClick={() => this.resetGame()}>Rejouer une partie</button>}
        {remainingErrors >= 0 && <div className="remainingErrors">Erreurs restantes : {remainingErrors}</div>}
        {remainingErrors === -1 && <div className="gameLost">Partie perdue !</div>}
        {gameWon && <div className="gameWon">Partie gagnée !</div>}
      </div>
    )
  }
}

export default App