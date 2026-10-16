import { useState } from 'react'
import LanguageScreen from './LanguageScreen'

function App() {
  const [language, setLanguage] = useState(null)

  if (!language) {
    return <LanguageScreen onPick={setLanguage} />
  }

  return (
    <div>
      <h1>meno.app</h1>
      <p>Language chosen: {language}</p>
    </div>
  )
}

export default App