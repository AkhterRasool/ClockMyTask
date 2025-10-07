import './App.css'
import {TitleBar} from "./TitleBar.tsx";
import {useState} from "react";
import {TaskList} from "./TaskList.tsx";
import {type UserTask} from "./types/UserTask.ts";

function App() {
    const [tasks, setTasks] = useState<UserTask[]>([])
    return (
        <>
            <TitleBar userTasks={tasks} setTasks={setTasks}/>
            <TaskList userTasks={tasks}/>
        </>
    )
}

export default App
