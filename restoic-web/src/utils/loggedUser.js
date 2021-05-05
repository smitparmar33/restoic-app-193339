export function userLoggedIn() {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth !== null) {
        const { loggedIn } = auth;
        return loggedIn;
    }
    return false;
}
