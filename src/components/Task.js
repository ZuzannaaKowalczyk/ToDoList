function Task({ task }) {
    return (
        <li>
            {task.name} - {task.category} ({task.type === "dziennie" ? "Codzienne" : "Jednorazowe"})
        </li>
    );
}

export default Task;