import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';

function TaskList({ title, tasks, droppableId, onDelete, onToggleDone }) {
  return (
    <div className="task-column">
      <h3>{title}</h3>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className="task-items"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task
              key={task.id}
              task={task}
              index={index}
              onDelete={() => onDelete(task.id)}
              onToggleDone={onToggleDone}
            />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskList;
