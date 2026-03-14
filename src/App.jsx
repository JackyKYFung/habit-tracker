import { useState } from 'react'
import './App.css'

function App() {


  return (
    <>
      <main>
        <h1>Habit Tracker</h1>
        <div>
          <input type="text" placeholder="enter new habit"/>
          <button>Submit</button>
        </div>

        <div>
          <ul>
            habit name
            progress bar
          </ul>
        </div>
      </main>
    </>
  )
}

export default App
