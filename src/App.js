import './App.css';
import { useState } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { DragDropContext } from '@hello-pangea/dnd';

const CATEGORY_COLORS = {
  Praca: '#F24405',
  Nauka: '#FA7F08',
  Zakupy: '#9EF8EE',
  Inne: '#22BABB'
};

function App() {
  const initialDays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

  const [tasksByDay, setTasksByDay] = useState(
    Object.fromEntries(initialDays.map(day => [day, []]))
  );

  const handleAddTask = (newTask) => {
  
   
    const taskWithId = {
      id: Date.now().toString(),
      name: newTask.name,
      category: newTask.category,
      type: newTask.type,
      color: CATEGORY_COLORS[newTask.category] || '#ffffff',
      done: false,
    };

    if (newTask.type === "dziennie") {
      const updated = {};
      for (const day of Object.keys(tasksByDay)) {
        updated[day] = [...tasksByDay[day], { ...taskWithId, day }];
      }
      setTasksByDay(updated);
    } 
    else {
      if (!newTask.day || !tasksByDay[newTask.day]) {
        console.error("Nieprawidłowy dzień:", newTask.day);
        return;
      }

       if (newTask.type === "dziennie") {
      const updated = {};
      for (const day of Object.keys(tasksByDay)) {
        updated[day] = [...tasksByDay[day], { ...taskWithId, day }];
      }
      setTasksByDay(updated);
    }
  
      setTasksByDay(prev => ({
        ...prev,
        [newTask.day]: [...prev[newTask.day], { ...taskWithId, day: newTask.day }]
      }));
    }
  };
  
  const onDragEnd = (result) => {
    const { source, destination } = result;
  
    // Jeśli brak celu lub przenosimy w to samo miejsce
    if (!destination || (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )) return;
  
    setTasksByDay(prev => {
      const sourceTasks = [...prev[source.droppableId]];
      const destinationTasks = [...prev[destination.droppableId]];
  
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, movedTask);
  
      return {
        ...prev,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks
      };
    });
  };
  const handleDelete = (taskId, day) => {
    setTasksByDay(prev => ({
      ...prev,
      [day]: prev[day].filter(task => task.id !== taskId)
    }));
  };

  const toggleDone = (taskId, day) => {
    setTasksByDay(prev => ({
      ...prev,
      [day]: prev[day].map(task =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    }));
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

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="task-list week-view">
            {Object.entries(tasksByDay).map(([day, tasks]) => (
             <TaskList
             key={day}
             title={day}
             tasks={tasks}
             droppableId={day}
             onDelete={(taskId) => handleDelete(taskId, day)}
             onToggleDone={toggleDone} 
           />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
