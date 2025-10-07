import {Timer} from "./Timer.tsx";
import {useCallback, useState} from "react";
import type {UserTask as UserTaskType} from "./types/UserTask.ts";

const UserTask = ({taskDetail}: { taskDetail: UserTaskType }) => {

    const updateMinutes = useCallback((currentMinute: number) => {
        taskDetail.minutes = currentMinute
    }, [taskDetail]);

    const updateSeconds = useCallback((currentSecond: number) => {
        taskDetail.seconds = currentSecond
    }, [taskDetail]);

    const [active, setActive] = useState<boolean>(taskDetail.isActive)

    return <p>
        <span>{taskDetail.taskName}</span>&nbsp;
        <Timer ongoing={active} givenMinutes={taskDetail.minutes} updateMinutes={(val) => updateMinutes(val)}
               givenSeconds={taskDetail.seconds}
               updateSeconds={val => updateSeconds(val)}></Timer>&nbsp;
        <button onClick={() => setActive(activeVal => !activeVal)}> {active ? "Pause" : "Resume"} </button>
    </p>
}

export default UserTask;


