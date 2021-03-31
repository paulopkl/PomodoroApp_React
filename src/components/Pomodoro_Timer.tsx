import React from 'react';
import { UseInterval } from '../hooks/Use_Interval';
import { secondsToTime } from '../utils/Seconds_To_Time';
import Button from './Button';
import Timer from './Timer';
// import useSound from 'use-sound';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface PomodoroProps {
    pomodoroTime: number;
    shortRestTime: number;
    LongRestTime: number;
    cycles: number;
}

const PomodotoTimer = (props: PomodoroProps): JSX.Element => {
    const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
    const [timeCounting, setTimeCounting] = React.useState(false);
    const [working, setWorking] = React.useState(false);
    const [resting, setResting] = React.useState(false);
    const [cyclesQtdManager, setCyclesQtdManager] = React.useState(
        new Array(props.cycles - 1).fill(true),
    );

    const [completedCycles, setCompletedCycles] = React.useState(0);
    const [fullWorkingTime, setFullWorkingTime] = React.useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = React.useState(0);

    UseInterval(
        () => {
            setMainTime(mainTime - 1);
            if (working) setFullWorkingTime(fullWorkingTime + 1);
        },
        timeCounting ? 1000 : null,
    );

    const configureWork = React.useCallback(() => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.pomodoroTime);

        audioStartWorking.play();
    }, [
        setTimeCounting,
        setWorking,
        setResting,
        setMainTime,
        props.pomodoroTime,
    ]);

    const configureRest = React.useCallback(
        (long: boolean) => {
            setTimeCounting(true);
            setWorking(false);
            setResting(true);

            if (long) setMainTime(props.LongRestTime);
            else setMainTime(props.shortRestTime);

            audioStopWorking.play();
        },
        [
            setTimeCounting,
            setWorking,
            setResting,
            setMainTime,
            props.LongRestTime,
            props.shortRestTime,
        ],
    );

    React.useEffect(() => {
        if (working) document.body.classList.add('working');
        if (resting) document.body.classList.remove('working');

        if (mainTime > 0) return;

        if (working && cyclesQtdManager.length > 0) {
            configureRest(true);
            cyclesQtdManager.pop();
        } else if (working && cyclesQtdManager.length <= 0) {
            configureRest(true);
            setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
            setCompletedCycles(completedCycles + 1);
        }

        if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
        if (resting) configureWork();
    }, [
        working,
        resting,
        mainTime,
        cyclesQtdManager,
        completedCycles,
        configureRest,
        configureWork,
        setCyclesQtdManager,
        numberOfPomodoros,
        props.cycles,
    ]);

    return (
        <div className="pomodoro">
            <h2>You&apos;re: {working ? 'Working' : 'Resting'}!</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button text="Work" onClick={() => configureWork()}></Button>
                <Button
                    className={!working && !resting ? 'hidden' : ''}
                    text="Rest"
                    onClick={() => configureRest(false)}
                ></Button>
                <Button
                    text={timeCounting ? 'Pause' : 'Play'}
                    onClick={() => setTimeCounting(!timeCounting)}
                ></Button>
            </div>

            <div className="details">
                <p>Completed Cycles: {completedCycles}</p>
                <p>Worked Hours: {secondsToTime(fullWorkingTime)}</p>
                <p>Completed Pomodors: {numberOfPomodoros}</p>
            </div>
        </div>
    );
};

export default PomodotoTimer;
