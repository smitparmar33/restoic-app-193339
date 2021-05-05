import React from 'react';
import './index.css';

const SideBarItem = ({ label, onClick, icon, iconActive, isActive = false, classNameWrapper = 'sideBarItemWrapper' }) => (
    <div
        className={`${classNameWrapper}`}
        onClick={onClick}
    >
        <div className="sideBarIconAndLabel">
            <img className="sideBarIcon" src={isActive ? iconActive : icon} alt="icon" />
            <div className="sideBarLabel" style={isActive ? {} : { color: 'black'}}>{label}</div>
        </div>
        <div className="sideBarActiveDash" style={isActive ? { backgroundColor: '#E83A1F'}: {}} />
    </div>
);

export default SideBarItem;
