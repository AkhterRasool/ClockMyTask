import {useRef} from "react";
import type {UserTask} from "./types/UserTask.ts";


export function TitleBar({userTasks, setTasks}: { userTasks: UserTask[], setTasks: (param: UserTask[]) => void }) {

    const tentativeTask = useRef<string>("")

    return <div>
        <input type='text' placeholder='Enter task name here.' onChange={e => tentativeTask.current = e.target.value}/>
        <button onClick={() => {
            if (tentativeTask) {
                setTasks([...userTasks, {taskName: tentativeTask.current, isActive: true, minutes: 0, seconds: 0}])
            }
        }}>Add Task
        </button>
    </div>

}