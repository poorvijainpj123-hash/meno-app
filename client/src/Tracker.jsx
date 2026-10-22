import { useState } from 'react'
import { ui, symptoms } from './text'

const KEY = 'meno-log'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}

function store(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)) } catch { /* ignore */ }
}

function today() {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

function Tracker({ language }) {
  const t = ui[language]
  const [entries, setEntries] = useState(load)
  const [date, setDate] = useState(today())
  const [picked, setPicked] = useState([])
  const [severity, setSeverity] = useState(3)
  const [note, setNote] = useState('')
  const [justSaved, setJustSaved] = useState(false)

  function toggle(key) {
    setPicked(picked.includes(key) ? picked.filter(k => k !== key) : [...picked, key])
  }

  function saveEntry() {
    const entry = { date, symptoms: picked, severity, note }
    const updated = [entry, ...entries.filter(e => e.date !== date)]
      .sort((a, b) => b.date.localeCompare(a.date))
    setEntries(updated)
    store(updated)
    setPicked([])
    setNote('')
    setSeverity(3)
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 2000)
  }

  function remove(d) {
    const updated = entries.filter(e => e.date !== d)
    setEntries(updated)
    store(updated)
  }

  const label = key => symptoms.find(s => s.key === key)?.[language]

  return (
    <div className="tracker">
      <h1>{t.trackTitle}</h1>

      <div className="field">
        <span>{t.date}</span>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>

      <div className="field">
        <span>{t.symptomsToday}</span>
        <div className="chips wrap">
          {symptoms.map(s => (
            <button
              key={s.key}
              className={picked.includes(s.key) ? 'selected' : ''}
              onClick={() => toggle(s.key)}
            >
              {s[language]}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <span>{t.howBad}</span>
        <div className="severity">
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} className={severity === n ? 'selected' : ''} onClick={() => setSeverity(n)}>
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <span>{t.note}</span>
        <textarea rows="3" value={note} onChange={e => setNote(e.target.value)} />
      </div>

      <button className="primary" onClick={saveEntry}>{justSaved ? t.saved : t.save}</button>
      <p className="small">{t.storedNote}</p>

      <h2>{t.history}</h2>
      {entries.length === 0 && <p>{t.empty}</p>}
      {entries.map(e => (
        <div className="entry" key={e.date}>
          <div>
            <strong>{e.date}</strong> · {t.severity} {e.severity}/5
            <br />
            <small>{e.symptoms.map(label).join(', ')}</small>
            {e.note && <p>{e.note}</p>}
          </div>
          <button onClick={() => remove(e.date)}>{t.delete}</button>
        </div>
      ))}
    </div>
  )
}

export default Tracker