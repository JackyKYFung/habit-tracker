import { useState } from 'react'
import './App.css'

function App() {

  const [habitList, setHabitList] = useState([
    {id: 1, name: "Drink Water", completed: false},
    {id: 2, name: "Drink Mocha", completed: true}
  ]);

  const [newItemName, setNewItemName] = useState("");

  const addHabit = (e) => {
    e.preventDefault(); // <-- prevent form from automatically reloading
    
    if (newItemName.trim() === "") return;

    const newHabit = {
      id: Date.now(),
      name: newItemName,
      completed: false
    };

    setHabitList([...habitList, newHabit]);
    setNewItemName("");
    console.log(habitList);
  }

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
        <form onSubmit={addHabit}>
          <input 
            type="text" 
            value={newItemName} 
            onChange={(e) => setNewItemName(e.target.value)} 
            placeholder="enter new habit"/>

          <button type="submit">Submit</button>
        </form>

        <div>
          <ul>

            {habitList.map((habit) => (
              <li
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                style={{
                  textDecoration: habit.completed ? "line-through" : "none",
                  color: habit.completed ? "#999" : "#000",
                  cursor: "pointer"
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
