import './css/App.css'
import {TitleBar} from "./TitleBar.tsx";
import {useState} from "react";
import {TaskList} from "./TaskList.tsx";
import {type UserTaskType} from "./types/UserTaskType.ts";
import Notification from "./Notification.tsx";

function App() {
    const [tasks, setTasks] = useState<UserTaskType[]>([])
    const [activeTask, setActiveTask] = useState<UserTaskType | null>(null)
    const [notificationText, setNotificationText] = useState<string>('')

    const updateNotification = (notification: string) => {
        setNotificationText(notification)
        setTimeout(() => {
            setNotificationText('')
        }, 2500)
    }
    return (
        <>
            <Notification notificationText={notificationText} />
            <TitleBar userTasks={tasks} setTasks={setTasks} setActiveTask={setActiveTask} updateNotification={updateNotification}/>
            <TaskList userTasks={tasks} activeTask={activeTask} setActiveTask={setActiveTask}/>
        </>
    )
}

export default App
