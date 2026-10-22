import { ui, symptoms, tips } from './text'

function getSuggestion(a) {
  const n = a.symptoms.length
  if (a.symptoms.includes('palpitations')) return 'doctor'
  if (a.age === 'u35' && (a.periods !== 'regular' || n > 0)) return 'doctor'
  if (n >= 4 || (a.duration === 'gt12' && n > 0)) return 'doctor'
  if (n > 0 || a.periods !== 'regular') return 'self'
  return 'early'
}

function Result({ language, answers, onTrack, onRetake }) {
  const t = ui[language]
  const picked = symptoms.filter(s => answers.symptoms.includes(s.key))
  const kind = getSuggestion(answers)
  const title = { doctor: t.sugDoctorTitle, self: t.sugSelfTitle, early: t.sugEarlyTitle }[kind]
  const text = { doctor: t.sugDoctorText, self: t.sugSelfText, early: t.sugEarlyText }[kind]

  return (
    <div className="result">
      <h1>{t.resultTitle}</h1>

      {answers.awareness !== 'knows' && <p className="explainer">{t.explainer}</p>}

      <h3>{t.yourSymptoms}</h3>
      <div className="pills">
        {picked.length === 0
          ? <span>{t.noSymptoms}</span>
          : picked.map(s => <span key={s.key}>{s[language]}</span>)}
      </div>

      <div className="suggestion">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <img src="/images/talk.jpg" alt="Two women having a friendly conversation" />

      <h3>{t.tipsTitle}</h3>
      <ul>
        {tips.map((tip, i) => <li key={i}>{tip[language]}</li>)}
      </ul>

      <p className="urgent">{t.urgentNote}</p>

      <div className="actions">
        <button className="primary" onClick={onTrack}>{t.startTracking}</button>
        <button className="secondary" onClick={onRetake}>{t.retake}</button>
      </div>
    </div>
  )
}

export default Result