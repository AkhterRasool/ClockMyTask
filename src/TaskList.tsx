import type {UserTaskType} from "./types/UserTaskType.ts";
import UserTask from "./UserTask.tsx";
import './css/TaskList.css'

export function TaskList({userTasks, activeTask, setActiveTask, focusedTaskIndex}: {
    userTasks: UserTaskType[],
    activeTask?: UserTaskType | null,
    setActiveTask: (taskDetail: UserTaskType | null) => void,
    focusedTaskIndex: number
}) {
    return <ul>
        {userTasks.map((task, index) => (
            <li key={task.taskName} className={
                (task === activeTask ? 'active-task': '') + (index === focusedTaskIndex ? ' focused-task' : '')
            }>
                <UserTask taskDetail={task} setActiveTask={setActiveTask} isActive={task === activeTask}></UserTask>
            </li>)
        )}
    </ul>
}