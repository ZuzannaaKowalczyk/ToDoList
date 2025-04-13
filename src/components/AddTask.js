import { useState } from "react";
import Select from "react-select";

const categoryOptions = [
  { value: "Praca", label: "Praca", color: "#F24405" },
  { value: "Nauka", label: "Nauka", color: "#FA7F08" },
  { value: "Zakupy", label: "Zakupy", color: "#9EF8EE" },
  { value: "Inne", label: "Inne", color: "#22BABB" }
];

const dayOptions = [
  { value: "Poniedziałek", label: "Poniedziałek" },
  { value: "Wtorek", label: "Wtorek" },
  { value: "Środa", label: "Środa" },
  { value: "Czwartek", label: "Czwartek" },
  { value: "Piątek", label: "Piątek" },
  { value: "Sobota", label: "Sobota" },
  { value: "Niedziela", label: "Niedziela" }
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: state.isFocused ? "#f0f0f0" : "#fff",
    color: "#000"
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
  })
};

function AddTask({ onAddTask }) {
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [taskType, setTaskType] = useState("jednorazowe");
  const [day, setDay] = useState(dayOptions[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === "") return;

    const newTask = {
      name: taskName,
      category: category.value,
      type: taskType,
      day: day.value
    };

    onAddTask(newTask);
    setTaskName("");
    setCategory(categoryOptions[0]);
    setTaskType("jednorazowe");
    setDay(dayOptions[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label>
        Nazwa zadania:
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
           className="input-text"
          required
        />
      </label>

      <div className="label-inline">
        <label htmlFor="category">Wybór kategorii:</label>
        <Select
          inputId="category"
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          styles={customStyles}
          getOptionLabel={(e) => (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  backgroundColor: e.color,
                  width: 12,
                  height: 12,
                  borderRadius: "50%"
                }}
              />
              {e.label}
            </div>
          )}
        />
      </div>
      <label>Typ zadania:</label>
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

      <div className="label-inline">
        <label htmlFor="day">Dzień tygodnia:</label>
        <Select
          inputId="day"
          options={dayOptions}
          value={day}
          onChange={setDay}
          styles={customStyles}
        />
      </div>

      <button type="submit">Dodaj zadanie</button>
    </form>
  );
}

export default AddTask;
