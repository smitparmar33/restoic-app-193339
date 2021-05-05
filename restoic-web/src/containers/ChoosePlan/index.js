import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChoosePlanItem from '../../components/ChoosePlanItem';
import { closeSelectDateModal, selectPlanAction, selectStartDateForPlan } from '../../modules/challenges';
import './index.css';
import SelectDateModal from '../../components/Modals/SelectDateModal';
import CompareModal from '../../components/Modals/CompareModal';

const mainActions = {
	selectPlanAction: selectPlanAction,
	closeSelectDateModalAction: closeSelectDateModal,
	selectStartDateForPlanAction: selectStartDateForPlan
}

const listOfPlans = [
	{
		id: 1,
		numberOfWeeks: '4-Week Program',
		title: 'For teams seeking an introduction to Sports Psychology',
		items: [
			'Full access to a variety of in-app categories including: Sports Psychology, Meditation, Binaural Beats, Breathwork, Soundscapes, and more',
			'Four (4) weekly team activities, homework assignments, and discussion topics focused on Sports Psychology, Meditation, and Binaural Beats',
			'Individual and team progress tracking capabilities + group chat feature'
		],
		recommended: false,
	},
	{
		id: 2,
		numberOfWeeks: '8-Week Program',
		title: 'For teams seeking Sports Psychology and Meditation benefits',
		items: [
			'Full access to a variety of in-app categories including: Sports Psychology, Meditation, Binaural Beats, Breathwork, Soundscapes, and more',
			'Eight (8) weekly team activities, homework assignments, and discussion topics focused on Sports Psychology and Meditation',
			'Individual and team progress tracking capabilities + group chat feature'
		],
		recommended: false,
	},
	{
		id: 3,
		numberOfWeeks: '12-Week Program',
		title: 'For teams seeking a holistic approach to mental heath and performance',
		items: [
			'Full access to a variety of in-app categories including: Sports Psychology, Meditation, Binaural Beats, Breathwork, Soundscapes, and more',
			'Twelve (12) weekly team activities, homework assignments, and discussion topics focused on Sports Psychology, Meditation, and Binaural Beats',
			'Individual and team progress tracking capabilities + group chat feature'
		],
		recommended: true,
	}
]

const ChoosePlan = ({
	selectPlanAction,
	first_name,
	modalSelectDate,
	closeSelectDateModalAction,
	selectStartDateForPlanAction
}) => {
	const [compareModal, setCompareModal] = useState(false);
	return (
		<div className="choicePlanWrapper">
			<div className="choicePlanLogo" />
			<div className="choicePlanDivider" />
			<div className="choicePlanTitle">Hi {first_name}, to get started choose the program that's right for your team</div>
			<div className="choicePlanItemsWrapper">
			{
				listOfPlans.map((item, key) => (
					<ChoosePlanItem
						key={key}
						numberOfWeeks={item.numberOfWeeks}
						title={item.title}
						items={item.items}
						recommended={item.recommended}
						onClick={() => {
							selectPlanAction(item.id);
						}}
						isLast={listOfPlans.length - 1 === key}
					/>
				))
			}	
			</div>
			<div className="choicePlanAlertText">Still have questions?</div>
			<div
				className="choicePlanAlertButton"
				onClick={() => setCompareModal(true)}
			>
				Compare Program Features
			</div>
			<SelectDateModal
				isOpen={modalSelectDate}
				closeModal={closeSelectDateModalAction}
				submitDate={selectStartDateForPlanAction}
			/>
			<CompareModal
				isOpen={compareModal}
				closeModal={() => setCompareModal(false)}
			/>
		</div>
	);
}

export default withRouter(connect(
({
	auth: {
		user: {
			first_name
		}
	},
	challenges: {
		modalSelectDate
	}
}) => ({
	first_name,
	modalSelectDate
}),
	dispatch => bindActionCreators(mainActions, dispatch)
)(ChoosePlan));

