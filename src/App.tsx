import './css/App.css'
import {TitleBar} from "./TitleBar.tsx";
import {useCallback, useEffect, useState} from "react";
import {TaskList} from "./TaskList.tsx";
import {type UserTaskType} from "./types/UserTaskType.ts";
import Notification from "./Notification.tsx";
import {ARROW_DOWN, ARROW_UP, SPACE} from "./constants.ts";

function App() {
    const [tasks, setTasks] = useState<UserTaskType[]>([])
    const [activeTask, setActiveTask] = useState<UserTaskType | null>(null)
    const [notificationText, setNotificationText] = useState<string>('')
    const [focusedTaskIndex, setFocusedTaskIndex] = useState<number>(-1)

    const updateNotification = useCallback((notification: string) => {
        setNotificationText(notification)
        setTimeout(() => {
            setNotificationText('')
        }, 2500)
    }, [setNotificationText])

    useEffect(() => {
        const navigateTaskList = (e: KeyboardEvent) => {
            if (tasks.length > 0) {
                if (e.key === ARROW_UP) {
                    setFocusedTaskIndex(fIdx => Math.max(fIdx - 1, 0))
                } else if (e.key === ARROW_DOWN) {
                    setFocusedTaskIndex(fIdx => Math.min(fIdx + 1, tasks.length - 1))
                } else if (e.key === SPACE) {
                    setActiveTask(activeTask => {
                        if (tasks[focusedTaskIndex] === activeTask) {
                            return null
                        }
                        return tasks[focusedTaskIndex]
                    })
                }
            }
        }
        document.addEventListener("keydown", navigateTaskList);
        return () => {
            document.removeEventListener("keydown", navigateTaskList);
        }
    }, [tasks, focusedTaskIndex]);

    return (
        <div id='app-contents'>
            <Notification notificationText={notificationText}/>
            <TitleBar userTasks={tasks} setTasks={setTasks} setActiveTask={setActiveTask}
                      updateNotification={updateNotification} setFocusedTaskIndex={setFocusedTaskIndex}/>
            <TaskList userTasks={tasks} activeTask={activeTask} setActiveTask={setActiveTask} focusedTaskIndex={focusedTaskIndex}/>
        </div>
    )
}

export default App
