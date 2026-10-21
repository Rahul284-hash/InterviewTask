import { useState } from 'react'
import './App.css'

function App() {
  const [clickOrder, setClickOrder] = useState({})

  const selectCell = (cell) => {
    setClickOrder((currentOrder) => {
      console.log(currentOrder,"currentOrder")
      if (currentOrder[cell]) {
        return currentOrder
      }

      return { ...currentOrder, [cell]: Object.keys(currentOrder).length + 1 }
    })
  }

  const clearSelection = () => setClickOrder({})

  return (
    <main className="app-shell">
      <section className="selection-card" aria-labelledby="page-title">
        <header className="card-header">
          <span className="eyebrow">INTERACTIVE GRID</span>
          <h1 id="page-title">Pick your squares</h1>
          <p>Choose any square to mark it. Your selection order will appear inside.</p>
        </header>

        <div className="grid" role="group" aria-label="Nine selectable squares">
          {Array.from({ length: 9 }, (_, index) => {
            const cell = index + 1
            const order = clickOrder[cell]

            return (
              <button
                key={cell}
                type="button"
                className={`grid-cell${order ? ' is-selected' : ''}`}
                aria-label={
                  order
                    ? `Square ${cell}, selected at click ${order}`
                    : `Square ${cell}, not selected`
                }
                aria-pressed={Boolean(order)}
                onClick={() => selectCell(cell)}
              >
                {order ? (
                  <span className="selection-number">{order}</span>
                ) : (
                  <span className="cell-dot" aria-hidden="true" />
                )}
              </button>
            )
          })}
        </div>

        <footer className="card-footer">
          <span className="selection-count" aria-live="polite">
            <span className="status-dot" aria-hidden="true" />
            {Object.keys(clickOrder).length} of 9 selected
          </span>
          <button
            type="button"
            className="clear-button"
            onClick={clearSelection}
            disabled={Object.keys(clickOrder).length === 0}
          >
            Clear
          </button>
        </footer>
      </section>
      <p className="page-note">Click a square to add it to your sequence</p>
    </main>
  )
}

export default App
