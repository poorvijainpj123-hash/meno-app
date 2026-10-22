import { useState } from 'react'
import LanguageScreen from './LanguageScreen'
import Quiz from './Quiz'

function App() {
  const [language, setLanguage] = useState(null)

  if (!language) {
    return <LanguageScreen onPick={setLanguage} />
  }

  return <Quiz language={language} />
}
export default App