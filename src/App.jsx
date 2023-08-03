import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Starter from './Starter'
import Questions from './Questions'

function App() {
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState(false)
  const [quizData, setQuizData] = useState([])


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
  function selectAnswer(id) {
    // need to map over the answerChoices array
    // need to select the `isSelected` element and switch data type
    // update state

    setQuizData(prevQuizData => prevQuizData.map(questionObj => {

      return {...questionObj, answerChoices: questionObj.answerChoices.map(answerChoiceObj => {
        // need to check if id matches and change isSelected
        // but also need to check if other IDs are selected and change them to the opposite
        // check answerChoiceObj.isSelected

        // if the input id matches the answerId, then I want to change isSeleted to be true 
        // if the input id DOES NOT match the answerId, then I want isSelected to be false
        // if (answerChoiceObj.answerId === id) {
        //   return {...answerChoiceObj, isSelected: !answerChoiceObj.answerChoice}
        // } 
        // if (answerChoiceObj.answerId === !id) {
        //   return {...answerChoiceObj, isSelected: false}
        // } 

        // ORIGINAL
        return answerChoiceObj.answerId === id ? {...answerChoiceObj, isSelected: !answerChoiceObj.isSelected} : answerChoiceObj

      })}
    }))
  }

  // need a way to check for correct answer

  return (
    <main>
      { gameStatus ? 
        <Questions 
          quizData={quizData} 
          shuffleArray={shuffleArray} 
          selectAnswer={selectAnswer}
        /> : 
        <Starter 
          startGame={startGame} 
        />
      }
    </main>
  )
}

export default App
