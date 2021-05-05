import React from 'react';
// style
import './index.css';

const DownloadItem = ({ title, link }) => (
    <div className='downloadItemWrapper'>
        <div className="downloadItemTitle">{title}</div>
        <div className="downloadItemButton">
            <a href={link} className="downloadItemButtonTitle" target="_blank">Download</a>
        </div>
    </div>
);

export default DownloadItem;