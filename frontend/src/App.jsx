import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:8083/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    deadline: ""
  });

  const loadTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTask = async () => {
    if (!form.title.trim()) return;

    await axios.post(API, form);

    setForm({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      deadline: ""
    });

    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadTasks();
  };

  const toggleStatus = async (task) => {
    const updated = {
      ...task,
      status: task.status === "Pending" ? "Completed" : "Pending"
    };

    await axios.put(`${API}/${task.id}`, updated);
    loadTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });
const isNearDeadline = (date) => {
  if (!date) return false;

  const today = new Date();
  const deadline = new Date(date);

  const diff = (deadline - today) / (1000 * 60 * 60 * 24);

  return diff <= 1 && diff >= 0; // today or tomorrow
};
  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>

        <div className="form">
          <input
            name="title"
            placeholder="Task title"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <div className="row">
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
            />
          </div>

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="filter-box">
          <label>Filter Tasks:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="list">
          {filteredTasks.length === 0 ? (
            <p className="no-task">No tasks found</p>
          ) : (
            filteredTasks.map((task) => (
              <div className="card" key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <div className="info">
                  <span className={task.priority.toLowerCase()}>
                    {task.priority}
                  </span>
                  <span className={task.status === "Completed" ? "completed" : "pending"}>
                    {task.status}
                  </span>
                </div>

                <div className="deadline">
                  {task.deadline ? `Deadline: ${task.deadline}` : "No deadline"}
                </div>

                <div className="actions">
                  <button onClick={() => toggleStatus(task)}>
                    Toggle Status
                  </button>
                  <button className="delete" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    
  );
}

export default App;