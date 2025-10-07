import {useState} from "react";
import type {UserTaskType} from "./types/UserTaskType.ts";


export function TitleBar({userTasks, setTasks, setActiveTask}: {
    userTasks: UserTaskType[],
    setTasks: (param: UserTaskType[]) => void,
    setActiveTask: (newTask: UserTaskType) => void,
}) {

    const [tentativeTask, setTentativeTask] = useState<string>("")

    return <div>
        <input type='text' placeholder='Enter task name here.' value={tentativeTask} onChange={e => setTentativeTask(e.target.value)}/>
        <button onClick={() => {
            if (tentativeTask) {
                const activeTask = {taskName: tentativeTask, minutes: 0, seconds: 0}
                setTasks([...userTasks, activeTask]);
                setActiveTask(activeTask);
                setTentativeTask("")
            }
        }}>Add Task
        </button>
    </div>

}