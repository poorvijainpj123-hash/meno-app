import { useState } from 'react'
import { questions, ui } from './text'

function Quiz({ language, onFinish }) {
  const t = ui[language]
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const q = questions[step]
  const progress = (step / questions.length) * 100

  function next(updated) {
    if (step + 1 >= questions.length) onFinish({ symptoms: [], ...updated })
    else setStep(step + 1)
  }

  function pickSingle(key) {
    const updated = { ...answers, [q.id]: key }
    setAnswers(updated)
    next(updated)
  }

  function toggle(key) {
    const current = answers[q.id] || []
    const list = current.includes(key) ? current.filter(k => k !== key) : [...current, key]
    setAnswers({ ...answers, [q.id]: list })
  }

  return (
    <div className="quiz">
      <div className="progress"><div style={{ width: `${progress}%` }} /></div>

      {step > 0 && <button className="back" onClick={() => setStep(step - 1)}>{t.back}</button>}

      <div className="bubble">{q.q[language]}</div>

      <div className="chips">
        {q.options.map(o => {
          const selected = q.type === 'multi'
            ? (answers[q.id] || []).includes(o.key)
            : answers[q.id] === o.key
          return (
            <button
              key={o.key}
              className={selected ? 'selected' : ''}
              onClick={() => (q.type === 'multi' ? toggle(o.key) : pickSingle(o.key))}
            >
              {o[language]}
            </button>
          )
        })}
      </div>

      {q.type === 'multi' && (
        <button
          className="primary next"
          onClick={() => next({ ...answers, [q.id]: answers[q.id] || [] })}
        >
          {t.next}
        </button>
      )}
    </div>
  )
}

export default Quiz