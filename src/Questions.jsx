import { useState } from 'react'
import { nanoid } from 'nanoid'

function Questions(props) {
  // deconstruct props 
  const { quizData, isSelected, decodeHTMLEntities } = props
  const styles = {
    backgroundColor: isSelected ? 'pink' : '',
    cursor: 'pointer'
  }

  // need to randomize answer choices
  // correct answer: quizData[i].correctAnswer
  // array of answers:  quizData[i].answerChoices

  // need a way to handle if answer is selected

  
  
  const quizElements = quizData.map(questionObj => 
  (
      <div key={questionObj.id} className="question-container">
        <h4 className='question'>{decodeHTMLEntities(questionObj.question)}</h4>
        <div className='answer-container'>
          <p className='answer' id={questionObj.id} style={styles}>{decodeHTMLEntities(questionObj.answerChoices[0])}</p>
          <p className='answer' id={questionObj.id} style={styles}>{decodeHTMLEntities(questionObj.answerChoices[1])}</p>
          <p className='answer' id={questionObj.id} style={styles}>{decodeHTMLEntities(questionObj.answerChoices[2])}</p>
          <p className='answer' id={questionObj.id} style={styles}>{decodeHTMLEntities(questionObj.answerChoices[3])}</p>
        </div>
      </div>
  ))

  return (
    <div>{quizElements}</div>
  )
}

export default Questions
