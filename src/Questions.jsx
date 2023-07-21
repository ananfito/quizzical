import { useState } from 'react'
import { nanoid, random } from 'nanoid'

function Questions(props) {
  const { quizData, isSelected, shuffleArray } = props
  const styles = {
    backgroundColor: isSelected ? 'pink' : '',
    cursor: 'pointer'
  }
  const arr = [0, 1, 2, 3]  
  const quizElements = quizData.map(questionObj => 
    {  
      const randomizedArr = shuffleArray([...arr])
      return (
        <div key={questionObj.id} className="question-container">
          <h4 className='question'>{questionObj.question}</h4>
          <div className='answer-container'>
            <p className='answer' style={styles}>{questionObj.answerChoices[randomizedArr[0]]}</p>
            <p className='answer' style={styles}>{questionObj.answerChoices[randomizedArr[1]]}</p>
            <p className='answer' style={styles}>{questionObj.answerChoices[randomizedArr[2]]}</p>
            <p className='answer' style={styles}>{questionObj.answerChoices[randomizedArr[3]]}</p>
          </div>
        </div>
  )})

  return (
    <div>{quizElements}</div>
  )
}

export default Questions
