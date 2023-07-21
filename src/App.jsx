import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Starter from './Starter'
import Questions from './Questions'
import Footer from './Footer'

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
          {
            question: decodeHTMLEntities(questionObj.question),
            answerChoices: [decodeHTMLEntities(questionObj.correct_answer), decodeHTMLEntities(questionObj.incorrect_answers[0]), decodeHTMLEntities(questionObj.incorrect_answers[1]), decodeHTMLEntities(questionObj.incorrect_answers[2])],
            correctAnswer: decodeHTMLEntities(questionObj.correct_answer),
            id: nanoid(),
            isSelected: false

          }
        ))
        // update state
        setQuizData(modifiedAPIData)
      })
  }, [count]) // do I need a dependency array? Or should I have a function that calls the API? Need to re-address once I'm to the "new game" button

  // need a way to handle if answer is selected

  // need a way to check for correct answer
  
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

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const randomNum = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[randomNum]] = [arr[randomNum], arr[i]];
    }
    return arr;
  }

  return (
    <main>
      { gameStatus ? 
        <Questions 
          quizData={quizData} 
          isSelected={isSelected} 
          shuffleArray={shuffleArray} 
        /> : 
        <Starter 
          startGame={startGame} 
        />
      }
    </main>
  )
}

export default App
