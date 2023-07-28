import { useState } from 'react'
import { nanoid, random } from 'nanoid'

function Questions(props) {
  const { quizData, shuffleArray, selectAnswer } = props
  const styles = {
    backgroundColor: 'none'
  }
  const selectedChoice = {
    backgroundColor: 'pink'
  }
  const arr = [0, 1, 2, 3]  
  const quizElements = quizData.map(questionObj => 
    {  
      const randomizedArr = shuffleArray([...arr])
      const questionId = questionObj.questionId
      const questionText = questionObj.question
      const answerId1 = questionObj.answerChoices[randomizedArr[0]].answerId
      const answerChoice1 = questionObj.answerChoices[randomizedArr[0]].answerChoice
      const answerId2 = questionObj.answerChoices[randomizedArr[1]].answerId
      const answerChoice2 = questionObj.answerChoices[randomizedArr[1]].answerChoice
      const answerId3 = questionObj.answerChoices[randomizedArr[2]].answerId
      const answerChoice3 = questionObj.answerChoices[randomizedArr[2]].answerChoice
      const answerId4 = questionObj.answerChoices[randomizedArr[3]].answerId
      const answerChoice4 = questionObj.answerChoices[randomizedArr[3]].answerChoice

      return (
        <div 
          key={questionId} 
          id={questionId} 
          className="question-container">

          <h4 className='question'>{questionText}</h4>

          <div className='answer-container'>
            <p 
              className='answer' 
              style={answerChoice1.isSelected ? selectedChoice: styles}
              id={answerId1}
              onClick={() => selectAnswer(answerId1)}
            >
              {answerChoice1}
            </p>

            <p 
              className='answer' 
              style={styles}
              id={answerId2}
            >
              {answerChoice2}
            </p>

            <p 
              className='answer' 
              style={styles}
              id={answerId3}
            >
              {answerChoice3}
            </p>

            <p 
              className='answer' 
              style={styles}
              id={answerId4}
            >
              {answerChoice4}
            </p>
          </div>
        </div>
  )})

  return (
    <div>{quizElements}</div>
  )
}

export default Questions
