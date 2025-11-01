import {useCallback, useState} from "react";
import type {UserTaskType} from "./types/UserTaskType.ts";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import './css/TitleBar.css'


export function TitleBar({userTasks, setActiveTask, updateNotification, setTasks, setFocusedTaskIndex}: {
    userTasks: UserTaskType[],
    setActiveTask: (newTask: UserTaskType) => void,
    updateNotification: (notification: string) => void,
    setTasks: (value: (((prevState: UserTaskType[]) => UserTaskType[]) | UserTaskType[])) => void,
    setFocusedTaskIndex: (value: (((prevState: number) => number) | number)) => void
}) {

    const [taskName, setTaskName] = useState<string>("")

    const addTask = useCallback((givenTaskName: string) => {
        if (givenTaskName) {
            setTaskName("")
            if (userTasks.map(task => task.taskName).includes(givenTaskName)) {
                updateNotification(`Task '${givenTaskName}' is already created.`)
                return
            }
            const activeTask = {taskName: givenTaskName, minutes: 0, seconds: 0}
            setTasks(currTasks => [...currTasks, activeTask]);
            setActiveTask(activeTask);
            setFocusedTaskIndex(userTasks.length)
        }
    }, [setActiveTask, updateNotification, userTasks, setTasks, setFocusedTaskIndex]);

    return <div id='title-bar'>
        <TextField id='task-input-field' type='text' placeholder='Enter task name here.'
               value={taskName}
               onChange={e => setTaskName(e.target.value.trim())}
               autoFocus={true}
               onKeyDown={(e) => {
                   if (e.key === "Enter") {
                       addTask(taskName)
                   }
               }}/>

        <Button id="add-task-button" onClick={() => addTask(taskName)} variant="outlined" disableRipple={true}>Add task</Button>
    </div>

}