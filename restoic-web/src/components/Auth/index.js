import React from 'react';
import { withRouter } from 'react-router';
import './index.css';

const Auth = ({ hasRedeem = true, children }) => (
    <div className="authContainer">
        <div className="authLeftSide">
            {
                hasRedeem ? (
                    <div className="authRedeemWrapper" >
                        <div className="authRedeemIcon"/>
                        <div className="authRedeemText">Redeem Your Restoic VIP Code</div>
                    </div>
                ) : null
            }
            <div className="authQestionWrapper" onClick={() => window.location.href = 'mailto:info@restoic.com'}>
                <div className="authQuestionText">Questions?</div>
                <div className="authQuestionIcon"/>
            </div>
        </div>
        <div className="authRightSide">
            <div className="authLogo"/>
            <div className="authRedeemWrapperMobile" >
                <div className="authRedeemIconMobile"/>
                <div className="authRedeemTextMobile">Redeem Your Restoic VIP Code</div>
            </div>
            {children}
            <div className="authQestionWrapperMobile" onClick={() => window.location.href = 'mailto:info@restoic.com'}>
                <div className="authQuestionText">Questions?</div>
                <div className="authQuestionIcon"/>
            </div>
        </div>
    </div>
);

export default withRouter(Auth);
