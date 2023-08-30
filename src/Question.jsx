export default function Question({ quizData, onChange, checkAnswers }) {
  
  return (
    <div>
      {quizData.map(questionObj => (
        <div className='question-container' key={questionObj.questionId}>
          <h4 className='question'>{questionObj.question}</h4>
          <form className='answer-container'>
          {questionObj.answerChoices.map(answerObj => (
            
              <div className="answer" key={answerObj.answerId}>
                <input
                  type="radio"
                  name='answer-choice'
                  id={answerObj.answerId}
                  value={answerObj.answerChoice}
                  onChange={(e) => {onChange(e.target)}}
                />
                <label
                htmlFor={answerObj.answerId}                
                >{answerObj.answerChoice}</label>
              </div>
          ))}
          </form>
        </div>
      ))}
      <button onClick={checkAnswers}>Check answers</button>
    </div>
  )
}
