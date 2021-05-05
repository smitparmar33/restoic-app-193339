import React from 'react';
import './index.css';
import checkImage from '../../assets/icons/PlanItemChecked.png';

const ChoosePlanItem = ({ numberOfWeeks, title, items, recommended, onClick, isLast }) => (
	<div className="choicePlanItemWrapper">
		<div className={isLast ? "choicePlanItemNumbOfWeeksLast" : "choicePlanItemNumbOfWeeks"}>
			<div className="choicePlanItemNumbOfWeeksText">
				{numberOfWeeks}
			</div>
			{
				isLast && (
					<div className="chiocePlanItemRecommendedIcon" />
				)
			}
		</div>
		<div className={isLast ? "choicePlanItemBodyLast" : "choicePlanItemBody"}>
			<div className="choicePlanItemTitleWrapper">
				<div className="choicePlanItemTitleText">{title}</div>
			</div>
			{ items.map((item, key) => (
				<div className="choicePlanListItemWrapper" key={key}>
					<img src={checkImage} alt="checkImage" className="choicePlanListItemIcon" />
					<div className="choicePlanListItemTitle">
						{item}
					</div>
				</div>
			))}
			<div
				className={isLast ? "chiocePlanItemButtonGradient": "chiocePlanItemButton"}
				// TODO: add action to fetch and select plan!
				onClick={onClick}
			>
				GET STARTED
			</div>
		</div>
	</div>
);

export default ChoosePlanItem;