import type {UserTaskType} from "./types/UserTaskType.ts";
import UserTask from "./UserTask.tsx";
import './css/TaskList.css'

export function TaskList({userTasks, activeTask, setActiveTask}: {
    userTasks: UserTaskType[],
    activeTask?: UserTaskType | null,
    setActiveTask: (taskDetail: UserTaskType | null) => void,
}) {
    return <ul>
        {userTasks.map((task) => (
            <li key={task.taskName} className={task === activeTask ? 'active-task': ''}>
                <UserTask taskDetail={task} setActiveTask={setActiveTask} isActive={task === activeTask}></UserTask>
            </li>)
        )}
    </ul>
}