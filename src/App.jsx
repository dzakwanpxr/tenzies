import { useState, useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [roll, setRoll] = useState(-1)
  const [start, setStart] = useState(false)

  useEffect(() => {
    const allHeldStatus = dice.every(dices => dices.isHeld)
    const allSameValue = dice.every(dices => dices.value === dice[0].value)
    if (allHeldStatus && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice())
    }
    return newDice
  }

  function generateDice() {
    return {
      id: nanoid(6),
      value: Math.floor((Math.random() * 6) + 1),
      isHeld: false
    }
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDice())
      setRoll(0)
      setStart(false)
    } else {
      setDice(prevDice => {
        return prevDice.map((dices) => {
          return dices.isHeld === true ? dices : generateDice()
        })
      })
      setRoll(prevRoll => prevRoll + 1)
      setStart(true)
    }
  }

  function holdDice(id) {
    setDice(prevDice => {
      return prevDice.map((dices) => {
        return dices.id === id ? {...dices, isHeld: !dices.isHeld} : dices
      })
    })
  }

  const diceElement = dice.map((dices) => {
    return <Die 
      key={dices.id} 
      value={dices.value} 
      isHeld={dices.isHeld}
      handleDice={() => holdDice(dices.id)} />
  })
  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
        {start ? 
        <div className="container">
          {diceElement}
        </div>
         : <button className="reroll-dice" onClick={rollDice}>Start</button>}
         {start ? 
        <div className="misc">
        <button className="reroll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        {tenzies && <Confetti />}
        <p className="instructions">{roll > 1 ? `Total Rolls : ${roll}` : `Total Roll : ${roll}`}</p>
       </div>
         : ``}
        
    </main>
  )
}

export default App
