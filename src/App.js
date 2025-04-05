import './App.css';
import { useState } from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="App">
      <h1>Lista rzeczy do zrobienia</h1>
      <div className="main-layout">
        <div className="form-wrapper">
          <div className="task-form">
            <AddTask onAddTask={handleAddTask} />
          </div>
        </div>
        <div className="task-list">
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default App;
