import React from 'react';
// style
import './index.css'

const WeeklyInsightsItem = () => (
    <div className="weeklyInsightsWrapper">
        <img
            alt="insight"
            src={`http://www.sfu.ca/~cqt/IAT352/a4/img/avatars/test-user.png`}
            className="insightImage"
        />
        <div className="weeklyInsightsText">Coming soon</div>
    </div>
);

export default WeeklyInsightsItem;