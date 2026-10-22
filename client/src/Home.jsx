import { ui } from './text'

function Home({ language, onStart }) {
  const t = ui[language]
  const steps = [
    [t.step1Title, t.step1Text],
    [t.step2Title, t.step2Text],
    [t.step3Title, t.step3Text],
  ]

  return (
    <main>
      <section className="hero">
        <div>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <button className="primary" onClick={onStart}>{t.startQuiz}</button>
        </div>
        <img src="/images/hero.jpg" alt="A woman stretching on a yoga mat at home" />
      </section>

      <section className="how">
        <h2>{t.howTitle}</h2>
        <div className="steps">
          {steps.map(([title, text], i) => (
            <div className="step" key={i}>
              <span>{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="together">
        <img src="/images/together.jpg" alt="Women talking together at a café" />
        <div>
          <h2>{t.togetherTitle}</h2>
          <p>{t.togetherText}</p>
        </div>
      </section>
    </main>
  )
}

export default Home