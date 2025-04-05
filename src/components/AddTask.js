import { useState } from "react";

function AddTask({ onAddTask }) {
    const [taskName, setTaskName] = useState("");
    const [category, setCategory] = useState("Praca");
    const [taskType, setTaskType] = useState("jednorazowe"); // "dziennie" lub "jednorazowe"

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskName.trim() === "") return;

        const newTask = {
            id: Date.now(),
            name: taskName,
            category: category,
            type: taskType,
        };

        onAddTask(newTask);

        setTaskName("");
        setCategory("Praca");
        setTaskType("jednorazowe");
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <label>
                Nazwa zadania:
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                />
            </label>

            <label>
                Wybór kategorii:
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Praca">Praca</option>
                    <option value="Nauka">Nauka</option>
                    <option value="Zakupy">Zakupy</option>
                    <option value="Inne">Inne</option>
                </select>
            </label>

            <label>
                Typ zadania:
            </label>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        value="jednorazowe"
                        checked={taskType === "jednorazowe"}
                        onChange={(e) => setTaskType(e.target.value)}
                    />
                    Jednorazowe
                </label>
                <label>
                    <input
                        type="radio"
                        value="dziennie"
                        checked={taskType === "dziennie"}
                        onChange={(e) => setTaskType(e.target.value)}
                    />
                    Codzienne
                </label>
            </div>

            <button type="submit">Dodaj zadanie</button>
        </form>
    );
}

export default AddTask;
