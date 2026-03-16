import { useState } from 'react'
import './App.css'

function App() {

  const [habitList, setHabitList] = useState([
    {id: 1, name: "Drink Water", completed: false},
    {id: 2, name: "Drink Mocha", completed: true}
  ]);


  const toggleHabit = id => {
    setHabitList(prevHabitList =>
      prevHabitList.map(habit =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit      
      )
    )
  }

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

            {habitList.map((habit) => (
              <li
                key={habit.id}
                style={{
                  textDecoration: habit.completed ? "line-through" : "none",
                  color: habit.completed ? "#999" : "#000"
                }}
              >
              <span>
                {habit.completed ? "✅" : "⭕"}
              </span>  
                {habit.name}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

export default App
