import { useState } from 'react'
import LanguageScreen from './LanguageScreen'
import Home from './Home'
import Quiz from './Quiz'
import Result from './Result'
import Tracker from './Tracker'
import { ui } from './text'

function App() {
  const [language, setLanguage] = useState(null)
  const [view, setView] = useState('home')
  const [answers, setAnswers] = useState(null)

  if (!language) return <LanguageScreen onPick={setLanguage} />

  const t = ui[language]

  function go(v) {
    setView(v)
    window.scrollTo(0, 0)
  }

  function finishQuiz(a) {
    setAnswers(a)
    go('result')
  }

  return (
    <>
      <header className="nav">
        <button className="brand" onClick={() => go('home')}>meno.app</button>
        <nav>
          <button onClick={() => go('home')}>{t.navHome}</button>
          <button onClick={() => go('track')}>{t.navTrack}</button>
          <button className="lang" onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}>
            {language === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </nav>
      </header>

      {view === 'home' && <Home language={language} onStart={() => go('quiz')} />}
      {view === 'quiz' && <Quiz language={language} onFinish={finishQuiz} />}
      {view === 'result' && (
        <Result language={language} answers={answers} onTrack={() => go('track')} onRetake={() => go('quiz')} />
      )}
      {view === 'track' && <Tracker language={language} />}

      <footer className="footer">{t.disclaimer}</footer>
    </>
  )
}

export default App