const isCoach = (data) => {
    if (data && data.user && data.user.is_coach) {
        return true;
    }
    return false;
}

export {isCoach};