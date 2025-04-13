import { Draggable } from '@hello-pangea/dnd';

function Task({ task, index, onDelete, onToggleDone }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            backgroundColor: task.color,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            gap: '0.5rem',
            ...provided.draggableProps.style
          }}
        >
          <label className="checkbox-container" style={{ flex: 1 }}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onToggleDone(task.id, task.day)}
            />
            <span className="custom-checkbox"></span>
            <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
              {task.name}
            </span>
          </label>

          <button className="delete-button" onClick={onDelete}>✖</button>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
