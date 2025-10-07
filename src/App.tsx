import './css/App.css'
import {TitleBar} from "./TitleBar.tsx";
import {useState} from "react";
import {TaskList} from "./TaskList.tsx";
import {type UserTaskType} from "./types/UserTaskType.ts";

function App() {
    const [tasks, setTasks] = useState<UserTaskType[]>([])
    const [activeTask, setActiveTask] = useState<UserTaskType | null>(null)

    return (
        <>
            <TitleBar userTasks={tasks} setTasks={setTasks} setActiveTask={setActiveTask}/>
            <TaskList userTasks={tasks} activeTask={activeTask} setActiveTask={setActiveTask}/>
        </>
    )
}

export default App
