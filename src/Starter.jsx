import { useState } from 'react'


function Starter(props) {
  const { startGame } = props


  return (
    <div>
      <h2>Quizzical</h2>
      <p></p>
      <button onClick={startGame}>Start quiz!</button>
    </div>
  )
}

export default Starter
