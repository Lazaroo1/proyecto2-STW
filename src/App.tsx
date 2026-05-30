import './styles.css'

export function App () {
  return (
    <main className="app-shell">
      <section className="calculator-panel" aria-labelledby="app-title">
        <p className="eyebrow">STW</p>
        <h1 id="app-title">Calculadora STW</h1>
        <p className="intro">
          Proyecto base en React, TypeScript, Vite y Bun.
        </p>
      </section>
    </main>
  )
}
