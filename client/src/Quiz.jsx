import { useState } from 'react'
import { questions } from './text'

function Quiz({ language }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])

  const done = step >= questions.length
  const progress = (step / questions.length) * 100

  function pick(index) {
    setAnswers([...answers.slice(0, step), index])
    setStep(step + 1)
  }

  return (
    <div className="quiz">
      <div className="progress"><div style={{ width: `${progress}%` }} /></div>

      {step > 0 && (
        <button className="back" onClick={() => setStep(step - 1)}>
          {language === 'hi' ? '← वापस' : '← Back'}
        </button>
      )}

      {done ? (
        <p>Quiz finished. Answers: {answers.join(', ')}</p>
      ) : (
        <>
          <div className="bubble">{questions[step][language].q}</div>
          <div className="chips">
            {questions[step][language].options.map((opt, i) => (
              <button key={i} onClick={() => pick(i)}>{opt}</button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Quiz