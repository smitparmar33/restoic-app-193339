const firstTimeLogin = (email) => {
    let loginArray = JSON.parse(localStorage.getItem('firstTimeLogin'));
    if (loginArray && loginArray.includes(email)) {
        return false;
    }
    loginArray = loginArray ? loginArray : [];
    loginArray.push(email)
    localStorage.setItem('firstTimeLogin', JSON.stringify(loginArray))
    return true;
}

export {firstTimeLogin};