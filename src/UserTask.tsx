import {Timer} from "./Timer.tsx";
import {useCallback} from "react";
import type {UserTaskType} from "./types/UserTaskType.ts";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const UserTask = ({taskDetail, setActiveTask, isActive}: {
    taskDetail: UserTaskType,
    setActiveTask: (taskDetail: UserTaskType | null) => void,
    isActive: boolean,
}) => {

    const updateMinutes = useCallback((currentMinute: number) => {
        taskDetail.minutes = currentMinute
    }, [taskDetail]);

    const updateSeconds = useCallback((currentSecond: number) => {
        taskDetail.seconds = currentSecond
    }, [taskDetail]);


    return <p>
        <span>{taskDetail.taskName}</span>&nbsp;
        <Timer ongoing={isActive} givenMinutes={taskDetail.minutes} updateMinutes={(val) => updateMinutes(val)}
               givenSeconds={taskDetail.seconds}
               updateSeconds={val => updateSeconds(val)}></Timer>&nbsp;
        <button onClick={() => {
            if (isActive) {
                setActiveTask(null)
            } else {
                setActiveTask(taskDetail)
            }
        }}>
            {isActive && <PauseCircleFilledRoundedIcon/>}
            {isActive || <PlayArrowRoundedIcon/>}
        </button>

        <button>
            <DeleteForeverIcon/>
        </button>
    </p>
}

export default UserTask;


