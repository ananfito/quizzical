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
      const answerChoice1Selected = questionObj.answerChoices[randomizedArr[0]].isSelected

      const answerId2 = questionObj.answerChoices[randomizedArr[1]].answerId
      const answerChoice2 = questionObj.answerChoices[randomizedArr[1]].answerChoice
      const answerChoice2Selected = questionObj.answerChoices[randomizedArr[1]].isSelected

      const answerId3 = questionObj.answerChoices[randomizedArr[2]].answerId
      const answerChoice3 = questionObj.answerChoices[randomizedArr[2]].answerChoice
      const answerChoice3Selected = questionObj.answerChoices[randomizedArr[2]].isSelected
      const answerId4 = questionObj.answerChoices[randomizedArr[3]].answerId

      const answerChoice4 = questionObj.answerChoices[randomizedArr[3]].answerChoice
      const answerChoice4Selected = questionObj.answerChoices[randomizedArr[3]].isSelected

      return (
        <div 
          key={questionId} 
          id={questionId} 
          className="question-container">

          <h4 className='question'>{questionText}</h4>

          <div className='answer-container'>
            <div 
              className='answer' 
              style={ answerChoice1Selected ? selectedChoice : styles}
              id={answerId1}
              onClick={() => selectAnswer(answerId1)}
            >
              {answerChoice1}
            </div>

            <div 
              className='answer'
              style={ answerChoice2Selected ? selectedChoice : styles}
              id={answerId2}
              onClick={() => selectAnswer(answerId2)}
            >
              {answerChoice2}
            </div>

            <div 
              className='answer'
              style={ answerChoice3Selected ? selectedChoice : styles}
              id={answerId3}
              onClick={() => selectAnswer(answerId3)}
            >
              {answerChoice3}
            </div>

            <div 
              className='answer'
              style={ answerChoice4Selected ? selectedChoice : styles}
              id={answerId4}
              onClick={() => selectAnswer(answerId4)}
            >
              {answerChoice4}
            </div>
          </div>
        </div>
  )})

  return (
    <div>{quizElements}</div>
  )
}

export default Questions
