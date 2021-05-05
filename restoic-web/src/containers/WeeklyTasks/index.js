import React, { useEffect, useState } from 'react';
import NavHeader from '../../components/NavHeader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { changeWeek, getCurrentSelectedChallenge, selectTask, closeTaskModal } from '../../modules/challenges';
import WeeklyTask from '../../components/WeeklyTask';
import GroupOfTasks from '../../components/GroupOfTasks';
import { getTeamStats } from '../../modules/stats';
import { getPercentageOfNumber } from '../../utils/getPercentageOfNumber';
import TaskModal from '../../components/Modals/TaskModal';
// style
import 'react-circular-progressbar/dist/styles.css';
import './index.css';
// icons
import headphonesIcon from '../../assets/icons/icon_headphones.png';
import notesIcon from '../../assets/icons/icon_notes.png';
import downloadIcon from '../../assets/icons/icon_download_task.png';
import logoIcon from '../../assets/icons/icon_task_logo.png';
import WeeklyInsightsItem from '../../components/WeeklyInsightsItem';


const tasks = [
    { 
        groupItems: [
            { label: 'Listen (In-App)', infoIconClass: 'groupItemInfoIconBlack', actionIcon: headphonesIcon, isOrange: false, id: 0 },
            { label: 'Homework', infoIconClass: 'groupItemInfoIconBlack', actionIcon: notesIcon, isOrange: false, id: 1 },
        ],
        title: 'ATHLETE TASKS'
    },
    { 
        groupItems: [
            { label: 'Weekly tasks', infoIconClass: 'groupItemInfoIconBlack', actionIcon: notesIcon, isOrange: false, id: 2 },
            { label: 'Print & Provide', infoIconClass: 'groupItemInfoIconBlack', actionIcon: downloadIcon, isOrange: false, id: 3 },
        ],
        title: 'COACH TASKS'
    },
    { 
        groupItems: [
            { label: 'Weekly Team Activity', infoIconClass: 'groupItemInfoIconWhite', actionIcon: logoIcon, isOrange: true, id: 4 },
            { label: 'Weekly Discussion Points', infoIconClass: 'groupItemInfoIconWhite', actionIcon: logoIcon, isOrange: true, id: 5 },
        ],
        title: 'TEAM ACTIVITIES'
    },
];

const mainActions = {
    getCurrentSelectedChallengeAction: getCurrentSelectedChallenge,
    changeWeekAction: changeWeek,
    getTeamStatsAction: getTeamStats,
    selectTaskAction: selectTask,
    closeTaskModalAction: closeTaskModal
}

const WeeklyTasks = ({
    user: { first_name: firstName, last_name: lastName, image },
    getCurrentSelectedChallengeAction,
    changeWeekAction,
    currentWeek,
    numberOfWeeks,
    start_date = null,
    estimatedDate = 'Jan 24, 2021',
    getTeamStatsAction,
    weeklyProgress,
    selectTaskAction,
    closeTaskModalAction,
    modalSelectTask,
    selectedTask,
    selectedTaskTitle,
    selectedTaskCategoryTitle
}) => {
    useEffect(() => {
        getTeamStatsAction()
        getCurrentSelectedChallengeAction()
    }, [])

    return (
        <div className="weeklyTasksContainer">
            <NavHeader
                title="Weekly Tasks"
                firstName={firstName}
                lastName={lastName}
                userImage={image}
                numbOfWeek={currentWeek}
                maxWeeks={numberOfWeeks}
                prevWeek={() => changeWeekAction(currentWeek - 1)}
                nextWeek={() => changeWeekAction(currentWeek + 1)}
                startDate={start_date}
            />
            <div className="weeklyTasksContent">
                <div className="weeklyTasksCardsWrapper">
                    {
                        tasks.map((groupItem, key) => (
                            <GroupOfTasks title={groupItem.title} key={key}>
                                {
                                    groupItem.groupItems.map((item, key2) => (
                                        <WeeklyTask
                                            key={key2}
                                            title={item.label}
                                            isOrange={item.isOrange}
                                            infoIconClass={item.infoIconClass}
                                            actionIcon={item.actionIcon}
                                            onClick={() => selectTaskAction(item.id)}
                                        />
                                    ))
                                }
                            </GroupOfTasks>
                        ))
                    }
                </div>
                <div className="weeklyTasksStatsWrapper">
                    <div className="weeklyTasksStatsLabel">weekly smart coach insights</div>
                    <div className="weeklyTasksStatsContent">
                        <WeeklyInsightsItem />
                        <div className="weeklyTasksStatusProgressLabel">
                            weekly team progress
                        </div>
                        <div className="weeklyTasksStatusProgressSubtitle">
                            Estimate Finish Date: {estimatedDate}
                        </div>
                        <div style={{ width: '172px', display: 'flex', alignSelf: 'center' }} >
                            <CircularProgressbarWithChildren
                                value={getPercentageOfNumber(weeklyProgress.done, weeklyProgress.total_tasks)}
                                styles={buildStyles({
                                    pathColor: "#E83A1F",
                                    trailColor: "#ffffff",
                                    backgroundColor: "#ffffff",
                                    
                                })}
                                strokeWidth={7}
                                background
                                minValue={0}
                                maxValue={100}
                            >
                                <div className="graphChildren">
                                    <div className="weeklyTasksStatusGraphPercentage">
                                        {getPercentageOfNumber(weeklyProgress.done, weeklyProgress.total_tasks)} %
                                    </div>
                                    <div className="weeklyTasksStatusGraphSubtitle">
                                        weekly team progress
                                    </div>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </div>
                </div>
            </div>
            <TaskModal
                isOpen={modalSelectTask}
                closeModal={() => closeTaskModalAction()}
                selectedTask={selectedTask}
                selectedTaskTitle={selectedTaskTitle}
                selectedTaskCategoryTitle={selectedTaskCategoryTitle}
            />
        </div>
    );
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
        modalSelectTask,
        selectedTask,
        selectedTaskTitle,
        selectedTaskCategoryTitle
    },
    stats: {
        weeklyProgress: {
            total_tasks,
            done
        }
    }
}) => ({
    user,
    currentWeek,
    numberOfWeeks,
    start_date,
    weeklyProgress: {
        total_tasks,
        done
    },
    modalSelectTask,
    selectedTask,
    selectedTaskTitle,
    selectedTaskCategoryTitle
}),
dispatch => bindActionCreators(mainActions, dispatch)
)(WeeklyTasks));