import _get from 'lodash/get';

const tasksEnum = {
    "0": "Listen (In-App)",
    "1": "Homework",
    "2": "Weekly tasks",
    "3": "Print & Provide",
    "4": "Weekly Team Activity",
    "5": "Weekly Discussion Points"
};

const categoryEnum = {
    "0": "ATHLETE TASKS",
    "1": "ATHLETE TASKS",
    "2": "COACH TASKS",
    "3": "COACH TASKS",
    "4": "TEAM ACTIVITIES",
    "5": "TEAM ACTIVITIES",
}

const getTaskTitle = (id) => {
    return {
        title: _get(tasksEnum, `${id}`, ''),
        categoryTitle: _get(categoryEnum, `${id}`, ''),
    }
}

export {getTaskTitle}