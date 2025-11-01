import {useEffect, useRef, useState} from "react";

export function Timer({
                          givenMinutes, updateMinutes,
                          givenSeconds, updateSeconds,
                          ongoing
                      }:
                      {
                          givenMinutes: number, updateMinutes: (m: number) => void,
                          givenSeconds: number, updateSeconds: (m: number) => void,
                          ongoing: boolean
                      }) {

    const [seconds, setSeconds] = useState<number>(givenSeconds)
    const [minutes, setMinutes] = useState<number>(givenMinutes)
    const currentIntervalRef = useRef<number>(0)

    useEffect(() => {
        if (ongoing) {
            const interval = setInterval(() => {
                setSeconds(currSecond => currSecond + 1)
            }, 1000)

            currentIntervalRef.current = interval
            return () => clearInterval(interval)
        } else {
            clearInterval(currentIntervalRef.current)
            currentIntervalRef.current = 0
        }
    }, [ongoing]);


    useEffect(() => {
        updateSeconds(seconds)
        if (seconds >= 60) {
            setMinutes(currMinute => currMinute + 1)
            updateMinutes(minutes + 1)
            setSeconds(0)
        }
    }, [seconds, minutes, updateMinutes, updateSeconds]);

    return <>
        <span>{String(minutes).padStart(2, '0')}:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
    </>

}