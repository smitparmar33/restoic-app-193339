import React from 'react';
import './index.css';
import SideBarItem from '../../components/SideBarItem';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//actions
import { logoutAction } from '../../modules/auth';
// sidebar icons
import weeklyTasksIcon from '../../assets/icons/icon_weekly.png';
import weeklyTasksIconActive from '../../assets/icons/icon_weekly_active.png'
import teamProgressIcon from '../../assets/icons/icon_team_progress.png';
import teamProgressIconActive from '../../assets/icons/icon_team_progress_active.png';
import teamChat from '../../assets/icons/icon_chat.png';
import teamCoaching from '../../assets/icons/icon_team_coaching.png';
import choosePlanIcon from '../../assets/icons/icon_choose_plan.png';
import adminIcon from '../../assets/icons/icon_admin.png';
import downloadsIcon from '../../assets/icons/icon_download.png';
import downloadsIconActive from '../../assets/icons/icon_download_active.png';
import contactUsIcon from '../../assets/icons/icon_contact_us.png';
import logoutIcon from '../../assets/icons/icon_logout.png';

const mainActions = {
    logoutAction: logoutAction,
};

const sideBarItems = [
    { label: 'Weekly Tasks', path: '/', icon: weeklyTasksIcon, iconActive: weeklyTasksIconActive },
    { label: 'Team Progress', path: '/teamProgress', icon: teamProgressIcon, iconActive: teamProgressIconActive },
    { label: 'Team Chat', path: '/teamChat', icon: teamChat, iconActive: teamChat },
    { label: 'Team coaching', path: '/teamCoaching', icon: teamCoaching, iconActive: teamCoaching },
    { label: 'Choose your program', path: '/choosePlanInner', icon: choosePlanIcon, iconActive: choosePlanIcon },
    { label: 'Admin', path: '/admin', icon: adminIcon, iconActive: adminIcon },
    { label: 'Downloads', path: '/downloads', icon: downloadsIcon, iconActive: downloadsIconActive },
    { label: 'Contact us', path: '/contactUs', icon: contactUsIcon, iconActive: contactUsIcon },
]

const SideBar = ({ history: { push }, location: { pathname }, logoutAction }) => (
    <div className="sideBarWrapper">
        <div className="sideBarLogo" onClick={() => push('/')} />
        {
            sideBarItems.map((sideBarItem, key) => (
                <SideBarItem
                    key={key}
                    label={sideBarItem.label}
                    icon={sideBarItem.icon}
                    iconActive={sideBarItem.iconActive}
                    onClick={() => push(sideBarItem.path)}
                    isActive={pathname === sideBarItem.path}
                />
            ))
        }
        <div className="sideBarLogout">
            <SideBarItem
                classNameWrapper="logoutInnerItem"
                label={"Logout"}
                icon={logoutIcon}
                onClick={() => logoutAction()}
                isActive={false}
            />
        </div>
    </div>
);

export default withRouter(connect(
({}) => ({}),
dispatch => bindActionCreators(mainActions, dispatch)
)(SideBar));
