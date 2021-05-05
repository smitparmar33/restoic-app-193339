const excludeSideBarForRoutes = (route) => {
    const routesWithoutSideBar = [
        '/choosePlan',
        '/survey'
    ];
    if (routesWithoutSideBar.includes(route)) return false;
    return true;
}

export {excludeSideBarForRoutes};
