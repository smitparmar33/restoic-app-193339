import React from 'react';
import './index.css';

const NavHeader = ({
    title,
    prevWeek,
    nextWeek,
    numbOfWeek = 1,
    hasSlider = true,
    hasSubtitle,
    subtitle,
    firstName = '',
    lastName = '',
    userImage,
    maxWeeks = 4,
    startDate = null,
    subtitleLink = ''
}) => (
    <div className="navHeaderContainer">
        <div className="navHeaderWrapper">
            <div className="navHeaderTitleWrapper">
                <div className="navHeaderTitle">{title}</div>
                {
                    hasSubtitle && (
                        <a className="navHeaderSubtitle" href={subtitleLink} target="_blank">{subtitle}</a>
                    )
                }
            </div>
            <div className="navHeaderUserWrapper">
                <img
                    className="navHeaderAvatar"
                    alt="avatar"
                    src={userImage !== '' ? userImage : 'http://www.sfu.ca/~cqt/IAT352/a4/img/avatars/test-user.png'}
                />
                <div className="navHeaderUserInfo">{`${firstName} ${lastName}`}</div>
            </div>
        </div>
        {
            hasSlider && (
                <div className="navHeaderSliderWrapper">
                    <div
                        className={numbOfWeek > 1 && startDate !== null ? 'navHeaderArrowLeft' : 'navHeaderArrowLeftDisabled'}
                        onClick={() => {
                            if (numbOfWeek > 1 && startDate !== null) {
                                prevWeek()
                            }
                        }}
                    />
                    <div className="navHeaderNumbOfWeek">{`Week ${numbOfWeek}`}</div>
                    <div
                        className={numbOfWeek < maxWeeks && startDate !== null ? 'navHeaderArrowRight' : 'navHeaderArrowRightDisabled'}
                        onClick={() => {
                            if (numbOfWeek < maxWeeks && startDate !== null) {
                                nextWeek()
                            }
                        }}
                    />
                </div>
            )
        }
    </div>
);

export default NavHeader;
