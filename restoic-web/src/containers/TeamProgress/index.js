import React, { useEffect } from 'react';
import NavHeader from '../../components/NavHeader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { getPercentageOfNumber } from '../../utils/getPercentageOfNumber';
// actions
import { changeWeek, getCurrentSelectedChallenge } from '../../modules/challenges';
// style
import './index.css';
import { getMemberStats, getTeamStats } from '../../modules/stats';
// icons
import iconFilterMember from '../../assets/icons/icon_filterMember.png';
import MemberStats from '../../components/MemberStats';

const mainActions = {
    getCurrentSelectedChallengeAction: getCurrentSelectedChallenge,
    getTeamStatsAction: getTeamStats,
    changeWeekAction: changeWeek,
    getMemberStatsAction: getMemberStats
}

const TeamProgress = ({
    user: { first_name: firstName, last_name: lastName, image },
    changeWeekAction,
    currentWeek,
    numberOfWeeks,
    start_date = null,
    getTeamStatsAction,
    getCurrentSelectedChallengeAction,
    estimatedWeekly = 'Estimated Completion Date: Jan 24, 2021',
    estimatedOverall = 'Estimated Completion Date: March 1, 2021',
    weeklyProgress,
    totalProgress,
    getMemberStatsAction,
    memberStats
}) => {

    useEffect(() => {
        getTeamStatsAction();
        getCurrentSelectedChallengeAction();
        getMemberStatsAction();
    }, [])

    return (
        <div className="teamProgressContainer">
            <NavHeader
                title="Team Progress"
                firstName={firstName}
                lastName={lastName}
                userImage={image}
                numbOfWeek={currentWeek}
                maxWeeks={numberOfWeeks}
                prevWeek={() => {
                    getMemberStatsAction(currentWeek - 1)
                    changeWeekAction(currentWeek - 1)
                }}
                nextWeek={() => {
                    getMemberStatsAction(currentWeek + 1)
                    changeWeekAction(currentWeek + 1)
                }}
                startDate={start_date}
            />
            <div className="teamProgressWrapper">
                <div className="teamProgressContent">
                    <div className="teamProgressProgressWrapper">
                        <div className="teamProgressWeeklyProgress">
                            <div className="teamProgressGraphTitle">Weekly progress</div>
                            <div className="teamProgressGraphSubtitle">{estimatedWeekly}</div>
                            <div className="teamProgressGraphWrapper">
                                <CircularProgressbarWithChildren
                                    value={getPercentageOfNumber(weeklyProgress.done, weeklyProgress.total_tasks)}
                                    styles={buildStyles({
                                        pathColor: "#E83A1F",
                                        trailColor: "#ffffff",
                                        backgroundColor: "#F8F9FB",
                                    })}
                                    strokeWidth={7}
                                    background
                                    minValue={0}
                                    maxValue={100}
                                >
                                    <div>
                                        <div className="teamProgressGraphPercentage">
                                            {getPercentageOfNumber(weeklyProgress.done, weeklyProgress.total_tasks)} %
                                        </div>
                                        <div className="teamProgressGraphPercentageSubtitle">
                                            weekly team progress
                                        </div>
                                    </div>
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                        <div className="teamProgressOverallProgress">
                            <div className="teamProgressGraphTitle">OVERALL progress</div>
                            <div className="teamProgressGraphSubtitle">{estimatedOverall}</div>
                            <div className="teamProgressGraphWrapper">
                                <CircularProgressbarWithChildren
                                    value={getPercentageOfNumber(totalProgress.done, totalProgress.total_tasks)}
                                    styles={buildStyles({
                                        pathColor: "#E83A1F",
                                        trailColor: "#ffffff",
                                        backgroundColor: "#F8F9FB",
                                    })}
                                    strokeWidth={7}
                                    background
                                    minValue={0}
                                    maxValue={100}
                                >
                                    <div>
                                        <div className="teamProgressGraphPercentage">
                                            {getPercentageOfNumber(totalProgress.done, totalProgress.total_tasks)} %
                                        </div>
                                        <div className="teamProgressGraphPercentageSubtitle">
                                            oweral team progress
                                        </div>
                                    </div>
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                    </div>
                    <div className="teamProgressMemberWrapper">
                        <div className="teamProgressMemberFilterHeader">
                            <div className="teamProgressMemberFilterTitle">ATHLETE PROGRESS</div>
                            <div className="teamProgressFilterWrapper" onClick={() => alert('sort')}>
                                <div className="teamProgressFilterLabel">
                                    Most active
                                </div>
                                <img alt="filter" src={iconFilterMember} className="teamProgressFilterIcon" />
                            </div>
                            <div className="teamProgressDummyDiv"/>
                        </div>
                        <div className="teamProgressMemberStatsWrapper">
                            {
                                memberStats.map((item, key) => (
                                    <MemberStats
                                        key={key}
                                        firstName={item.user.user.first_name}
                                        lastName={item.user.user.last_name}
                                        image={item.user.user.image}
                                        weeklyProgress={item.weekly}
                                        overallProgress={item.overall}
                                        isLastItem={memberStats.length - 1 === key}
                                    />
                                ))
                            }
                        </div>         
                    </div>
                </div>
            </div>
        </div>
    )
}


export default withRouter(connect(
({
    auth: {
        user,
    },
    challenges: {
        currentWeek,
        numberOfWeeks,
        challegeData: {
            start_date
        },
    },
    stats: {
        weeklyProgress,
        totalProgress,
        memberStats
    }
}) => ({
    user,
    currentWeek,
    numberOfWeeks,
    start_date,
    weeklyProgress,
    totalProgress,
    memberStats
}),
dispatch => bindActionCreators(mainActions, dispatch)
)(TeamProgress));
