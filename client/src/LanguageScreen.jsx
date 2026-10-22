function LanguageScreen({ onPick }) {
  return (
    <div className="language-screen">
      <h1>meno.app</h1>
      <p>Choose your language / अपनी भाषा चुनें</p>
      <div className="language-buttons">
        <button onClick={() => onPick('en')}>English</button>
        <button onClick={() => onPick('hi')}>हिन्दी</button>
      </div>
    </div>
  )
}

export default LanguageScreen