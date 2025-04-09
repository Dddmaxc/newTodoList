import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { ChangeEvent, useState } from "react";
import { v1 } from "uuid";

export type FilterValueType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
  ]);
  let [filter, setFilter] = useState<FilterValueType>("all");

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = (title: string) => {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
  };

  const changeFilter = (value: FilterValueType) => {
    setFilter(value);
  };

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
