import {useState} from "react";
import type {UserTaskType} from "./types/UserTaskType.ts";


export function TitleBar({userTasks, setTasks, setActiveTask, updateNotification}: {
    userTasks: UserTaskType[],
    setTasks: (param: UserTaskType[]) => void,
    setActiveTask: (newTask: UserTaskType) => void,
    updateNotification: (notification: string) => void
}) {

    const [tentativeTask, setTentativeTask] = useState<string>("")

    return <div>
        <input type='text' placeholder='Enter task name here.' value={tentativeTask} onChange={e => setTentativeTask(e.target.value)}/>
        <button onClick={() => {
            if (tentativeTask) {
                setTentativeTask("")
                if (userTasks.map(task => task.taskName).includes(tentativeTask)) {
                    updateNotification(`Task '${tentativeTask}' is already created.`)
                    return
                }
                const activeTask = {taskName: tentativeTask, minutes: 0, seconds: 0}
                setTasks([...userTasks, activeTask]);
                setActiveTask(activeTask);
            }
        }}>Add Task
        </button>
    </div>

}