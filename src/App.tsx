import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { useState } from "react";
import { v1 } from "uuid";

export type FilterValueType = "all" | "active" | "completed";
export type todolistsType = {
  id: string;
  title: string;
  filter: FilterValueType;
};
function App() {

  const removeTask = (id: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((task) => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  };

  const addTask = (title: string, todolistId: string) => {
    let task = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  };

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  };

  const changeFilter = (value: FilterValueType, idTodolist: string) => {
    let todolist = todolists.find((t) => t.id === idTodolist);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  };
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<todolistsType>>([
    { id: todolistId1, title: "What to learn", filter: "active" },
    { id: todolistId2, title: "What to buy", filter: "completed" },
  ]);

  const removeTodoList = (todolistId: string) => {
    let filteredTodolist = todolists.filter((t) => t.id !== todolistId)
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId]
    setTasks({...tasksObj})

  };

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Games", isDone: true },
      { id: v1(), title: "Clothes", isDone: false },
    ],
  });

  return (
    <div className="App">
      {todolists.map((t) => {
        let tasksForTodoList = tasksObj[t.id];
        if (t.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }
        if (t.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }
        return (
          <TodoList
            key={t.id}
            id={t.id}
            title={t.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={t.filter}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
