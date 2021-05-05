import React, { useEffect } from 'react';
import NavHeader from '../../components/NavHeader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// style
import './index.css';
import GroupOfDownloads from '../../components/GroupOfDownloads';
import { getCurrentSelectedChallenge, getDownloadsItem } from '../../modules/challenges';
import DownloadItem from '../../components/DownloadsItem';

const mainActions = {
    getCurrentSelectedChallengeAction: getCurrentSelectedChallenge,
    getDownloadsItemAction: getDownloadsItem
}

const items = [
    { title: 'Guided Meditation', },
    { title: 'The moment before the competition' },
    { title: 'Perfomance managment' },
    { title: 'Guided Meditation', },
    { title: 'The moment before the competition' },
    { title: 'Perfomance managment' },
];

const Downloads = ({
    user: { first_name: firstName, last_name: lastName, image },
    numberOfWeeks = 0,
    getCurrentSelectedChallengeAction,
    getDownloadsItemAction,
    downloadFiles,
    allTogether
}) => {

    useEffect(() => {
        getCurrentSelectedChallengeAction();
    }, [])

    useEffect(() => {
        getDownloadsItemAction(numberOfWeeks)
    }, [numberOfWeeks])

    return (
        <div className="downloadsContainer">
            <NavHeader
                title="Downloads"
                firstName={firstName}
                lastName={lastName}
                userImage={image}
                hasSlider={false}
                hasSubtitle
                subtitle="Download Coach's Guide (All-In-One)"
                subtitleLink={allTogether.file}
            />
            <div className="downloadsContent">
                {
                    downloadFiles.map(({ title, items }, key) => (
                        items && !!items.length && (
                            <GroupOfDownloads key={key} title={title}>
                                {
                                    items.map((item, key2) => (
                                        <DownloadItem key={key2} title={title} link={item.file} />
                                    ))
                                }
                            </GroupOfDownloads>
                        )
                    ))
                }
            </div>
        </div>
    );
}

export default withRouter(connect(
({
    auth: {
        user,
    },
    challenges: {
        numberOfWeeks,
        downloadFiles,
        allTogether
    },
}) => ({
    user,
    numberOfWeeks,
    downloadFiles,
    allTogether
}),
dispatch => bindActionCreators(mainActions, dispatch)
)(Downloads));
