import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Starter from './Starter'
import Questions from './Questions'
import Question from './Question'

function App() {
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState('')


  // make call to API & store data in array
  useEffect (() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => {
        console.log(data.results)
        const modifiedAPIData = data.results.map(questionObj => (
          {
            question: decodeHTMLEntities(questionObj.question),
            answerChoices: [
              {
                answerChoice: decodeHTMLEntities(questionObj.correct_answer),
                answerId: nanoid(),
                isCorrect: true,
                isSelected: false
              },
              {
                answerChoice: decodeHTMLEntities(questionObj.incorrect_answers[0]),
                answerId: nanoid(),
                isCorrect: false,
                isSelected: false
              },
              {
                answerChoice: decodeHTMLEntities(questionObj.incorrect_answers[1]),
                answerId: nanoid(),
                isCorrect: false,
                isSelected: false
              },
              {
                answerChoice: decodeHTMLEntities(questionObj.incorrect_answers[2]),
                answerId: nanoid(),
                isCorrect: false,
                isSelected: false
              },
            ],
            questionId: nanoid()
          }
        ))

        console.log("modifiedAPIData:", modifiedAPIData) // REMOVE LATER

        const randomizedAPIData = modifiedAPIData.map(questionObj => {
          const randomizedAnswersArr = shuffleArray( [...questionObj.answerChoices] )
          return {...questionObj, answerChoices: randomizedAnswersArr}
        })
        console.log("randomized answers:", randomizedAPIData) // REMOVE LATER

        // update state
        setQuizData(randomizedAPIData)
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

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const randomNum = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[randomNum]] = [arr[randomNum], arr[i]];
    }
    return arr;
  }

  // need a way to handle if answer is selected

  function handleAnswerChange(answerChoice) {
    console.log('an answer has changed')
    console.log(answerChoice)
    setSelectedAnswer(answerChoice)
  }

  // need a way to check for correct answer

  return (
    <main>
      { gameStatus ? 
        <Question 
          quizData={quizData}
          selectedAnswer={selectedAnswer}
          onChange={handleAnswerChange}
        /> : 
        <Starter 
          startGame={startGame} 
        />
      }
      {/* { gameStatus ? 
        <Questions 
          quizData={quizData} 
          shuffleArray={shuffleArray} 
          selectAnswer={selectAnswer}
        /> : 
        <Starter 
          startGame={startGame} 
        />
      } */}
    </main>
  )
}

export default App
