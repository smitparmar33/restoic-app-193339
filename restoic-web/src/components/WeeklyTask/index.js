import React from 'react';
// style
import './index.css';

const WeeklyTask = ({ title, isOrange = false, infoIconClass, actionIcon, status = 'Finished', onClick = () => {}, key }) => (
    <div
        key={key}
        className={!isOrange ? 'weeklyTaskItem' : 'weeklyTaskItemOrange'}
        onClick={onClick}
    >
        <div className="weeklyTaskItemContent">
            <div className="weeklyTaskInfoIconWrapper">
                <div className={infoIconClass} />
            </div>
            <div
                className={!isOrange ? 'weeklyTaskTitle' : 'weeklyTaskTitleOrange'}
            >
                    {title}
            </div>
            <div className="weeklyStatusWrapper">
                <div
                    className={!isOrange ? 'weeklyStatusLabel' : 'weeklyStatusLabelWhite'}
                >
                    <div
                        className={!isOrange ? 'weeklyStatusText' : 'weeklyStatusTextWhite'}
                    >
                        {status}
                    </div>
                </div>
                <img className="actionIcon" alt='actionIcon' src={actionIcon} />
            </div>
        </div>
    </div>
);

export default WeeklyTask;
