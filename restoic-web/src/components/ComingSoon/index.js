import React from 'react';
// style
import './index.css';
// icons
import linkendIcon from '../../assets/icons/icon_linkedin.png';
import facebookIcon from '../../assets/icons/icon_facebook.png';
import twitterIcon from '../../assets/icons/icon_twitter.png';
import instagramIcon from '../../assets/icons/icon_instagram.png';

const links = [
    { icon: linkendIcon, url: 'https://www.linkedin.com'},
    { icon: instagramIcon, url: 'https://www.instagram.com'},
    { icon: facebookIcon, url: 'https://www.facebook.com'},
    { icon: twitterIcon, url: 'https://www.twetter.com'}
]

const ComingSoon = () => (
    <div className="comingSoonWrapper">
        <div className="comingSoonTitle">
            Coming soon
        </div>
        <div className="comingSoonSubtitle">
            We’re working hard to bring this feature to you as soon as possible!
        </div>
        <div className="comingSoonThanks">
            Thanks for your patience
        </div>
        <div className="comingSoonButton" onClick={() => alert('suggest new features')}>
            <div className="comingSoonButtonText">suggest new features</div>
        </div>
        <div className="comingSoonFollowUsLabel">
            Follow us
        </div>
        <div>
            {
                links.map((item) => (
                    <img className="socialIcons" alt={item.url} src={item.icon} onClick={() => alert(item.url)} />
                ))
            }
        </div>
    </div>
);

export default ComingSoon;
