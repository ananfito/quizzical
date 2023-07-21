import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Starter from './Starter'
import Questions from './Questions'

function App() {
  const [count, setCount] = useState(1)
  const [gameStatus, setGameStatus] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [isSelected, setIsSelected] = useState(false)


  // make call to API & store data in array
  useEffect (() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => {
        console.log(data.results)
        const modifiedAPIData = data.results.map(questionObj => (
          // return new object with selected data from API response
          // and add unique id with `nanoid()`
          {
            question: questionObj.question,
            answerChoices: [questionObj.correct_answer, questionObj.incorrect_answers[0], questionObj.incorrect_answers[1], questionObj.incorrect_answers[2]],
            correctAnswer: questionObj.correct_answer,
            id: nanoid(),
            isSelected: false

          }
        ))
        // update state
        setQuizData(modifiedAPIData)
      })
  }, [count]) // do I need a dependency array? Or should I have a function that calls the API? Need to re-address once I'm to the "new game" button
  
  function startGame() {
    console.log(quizData) // REMOVE LATER
    setGameStatus(!gameStatus)
    // setCount(prevCount => prevCount ++)
  }

  function decodeHTMLEntities(string) {
    const parser = new DOMParser()
    const decodedString = parser.parseFromString(`<!doctype html><body>${string}`, 'text/html').body.textContent
    return decodedString
  }

  return (
    <main>
      { gameStatus ? 
        <Questions 
          quizData={quizData} 
          isSelected={isSelected} 
          decodeHTMLEntities={decodeHTMLEntities} 
        /> : 
        <Starter 
          startGame={startGame} 
        />
      }
    </main>
  )
}

export default App
