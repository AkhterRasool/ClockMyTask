import type {UserTask as UserTaskType} from "./types/UserTask.ts";
import UserTask from "./UserTask.tsx";

export function TaskList({userTasks}: { userTasks: UserTaskType[] }) {
    return <ul>
        {userTasks.map((task) => (<li key={task.taskName}><UserTask taskDetail={task}></UserTask></li>))}
    </ul>
}