import { useState } from 'react'
import './App.css'

function App() {

  const [habitList, setHabitList] = useState([
    {id: 1, name: "Drink Water", completed: false},
    {id: 2, name: "Drink Mocha", completed: true}
  ]);

  const [newItemName, setNewItemName] = useState("");
  const [error, setError] = useState("");

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

  const handleInputChange = (e) => {
    const value = e.target.value;

    setNewItemName(value);

    const hasSpecialCharacters = /[^a-zA-Z0-9 ]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);

    if (value.length > 0 && hasSpecialCharacters) {
      setError("No special characters!");
    } else if (value.length > 0 && !hasUppercase) {
      setError("at least one uppercase letter!");
    } else if (value.length <= 3) {
      setError("Be more descriptive!");
    } else {
      setError("");
    }
  }
  

  const toggleHabit = id => {
    setHabitList(prevHabitList =>
      prevHabitList.map(habit =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit      
      )
    )
  }

  const deleteHabit = (idToDelete) => {
    
    // find specific object in habitList array
    const habitToDelete = habitList.find(h => h.id === idToDelete);

    // check completion status of selected habit
    if (habitToDelete && habitToDelete.completed === false) {
      // popup window to confirm the deletion
      const confirmDelete = window.confirm("Habit is not completed yet, Delete?");
      // cancel the deletion if cancel button is clicked
      if (!confirmDelete) return;
    }
    
    // delete the selected habit
    const updatedList = habitList.filter(habit => habit.id !== idToDelete);

    // update new habit list to HabitList array
    setHabitList(updatedList);
  }

  return (
    <>
      <main>
        <h1>Habit Tracker</h1>
        <form onSubmit={addHabit}>
          <input 
            type="text" 
            value={newItemName} 
            onChange={handleInputChange} 
            placeholder="enter new habit"/>

          <button 
            type="submit"
            disabled={error !== "" || newItemName.trim() === ""}
            >Submit</button>
          {error && (
            <p style={{color:'red', fontSize: '12px'}}>
              ⚠️ {error}
            </p>
          )}
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
                &nbsp; {habit.name} &nbsp;
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHabit(habit.id);
                }} >
                Delete  
              </button> 
              
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

export default App
