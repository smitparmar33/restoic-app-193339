import React from 'react';
import { getPercentageOfNumber } from '../../utils/getPercentageOfNumber';
// style
import './index.css';

const MemberStats = ({
    firstName = 'John',
    lastName = 'Doe',
    image,
    weeklyProgress,
    overallProgress,
    isLastItem = false
}) => (
    <div className={!isLastItem ? "memberStatsWrapper" : "memberStatsWrapperWithoutBorder"}>
        <div className="memberStatsProgressBarWrapper">
            <img src={image} alt="userImage" className="memberStatsUserImage" />
            <div className="memberStatsProgressBar">
                <div className="memberStatsUserInfo">{firstName} {lastName}</div>
                <div className="memberStatsGraph" style={{ marginBottom: '8px'}}>
                    <div className="memberStatsOrangeGraph" style={{ width: `${getPercentageOfNumber(weeklyProgress.done, weeklyProgress.total_tasks)}%`}} />
                </div>
                <div className="memberStatsGraph">
                    <div className="memberStatsOrangeGraph" style={{ width: `${getPercentageOfNumber(overallProgress.done, overallProgress.total_tasks)}%`}} />
                </div>
            </div>
        </div>
        <div className="memberStatsProgressAllWrapper">
            <div
                className="memberStatsLabel"
            >
                weekly progress - <span className="memberStatsPercentage">{getPercentageOfNumber(weeklyProgress.done, weeklyProgress.total_tasks)} %</span>
            </div>
            <div
                className="memberStatsLabel"
            >
                Owerall progress - <span className="memberStatsPercentage">{getPercentageOfNumber(overallProgress.done, overallProgress.total_tasks)} %</span>
            </div>
        </div>
    </div>
);

export default MemberStats;
