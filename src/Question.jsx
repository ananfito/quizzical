import React from 'react'

export default function Question({ quizData, selectedAnswer, onChange }) {
  return (
    <div>
      {quizData.map(questionObj => (
        <div className='question-container'>
          <h4 className='question'>{questionObj.question}</h4>
          <form className='answer-container'>
          {questionObj.answerChoices.map(answerObj => (
            <label
              key={answerObj.answerChoice.id}
              className={ selectedAnswer === answerObj.answerChoice ? 'answer selected' : 'answer'}
              
            >
              <input
                type="radio"
                id={answerObj.answerId}
                value={answerObj.answerChoice}
                checked={selectedAnswer === answerObj.answerChoice}
                onChange={(e) => {
                  onChange(e.target.value)
                  console.log(e.target)
                }}
              />
              {answerObj.answerChoice}
            </label>
          ))}
                </form>
        </div>

      ))}
    </div>
  )
}