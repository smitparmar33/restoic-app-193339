import React from 'react';
// style
import './index.css'

const GroupOfDownloads = ({ title, children }) => (
    <div className="groupOfDownloadsWrapper">
        <div className="groupOfDownloadsLabel">
            {title}
        </div>
        <div className="groupOfDownloadsCardsWrapper">
            {
                children
            }
        </div>
    </div>
);

export default GroupOfDownloads;