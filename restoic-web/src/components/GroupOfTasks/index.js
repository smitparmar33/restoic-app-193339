import React from 'react';
// style
import './index.css'

const GroupOfTasks = ({ title, children }) => (
    <div className="groupOfTasksWrapper">
        <div className="groupOfTasksLabel">
            {title}
        </div>
        <div className="groupOfTasksCardsWrapper">
            {
                children
            }
        </div>
    </div>
);

export default GroupOfTasks;