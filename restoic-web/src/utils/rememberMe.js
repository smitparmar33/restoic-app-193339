const rememeberMeAdd = (email) => {
    localStorage.setItem('rememeberMe', JSON.stringify(email))
}

const rememberMeGet = () => {
    let rememeberMe = JSON.parse(localStorage.getItem('rememeberMe'));
    if (rememeberMe === null) {
        return '';
    }
    return rememeberMe;
}

export {rememeberMeAdd, rememberMeGet};