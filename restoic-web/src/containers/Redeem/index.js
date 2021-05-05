import React, { useEffect, useState } from 'react';
import ApiInstance, { removeTokenFromHeader, setTokenIntoHeader } from '../../services/api';
import Auth from '../../components/Auth';
import Input from '../../components/Input';
import './index.css';
import { withRouter } from 'react-router';

const Redeem = ({ history: { replace }}) => {
    const [redeem, setRedeem] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [redeemActive, setRedeemActive] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);


    useEffect(() => {
        const readyForReedem = JSON.parse(localStorage.getItem('redeemActive'))
        if (readyForReedem === null) {
            replace('/redeem')
        }
    }, [])

    const resetErrors = () => {
        setError(false);
        setErrorMessage('');
        setSuccessMessage(false)
    }

    const redeemAction = async () => {
        resetErrors()
        const response = await ApiInstance.post('/api/v1/code', { code: redeem })
        if (response?.data?.error) {
            setError(true);
            setErrorMessage(response?.data?.error);
            setSuccessMessage(false);
            return;
        }
        if (response?.data?.message) {
            resetErrors()
            setRedeemActive(true);
            removeTokenFromHeader();
            setSuccessMessage(response?.data?.message);
            replace('/')
        }
    }

    return (
        <Auth>
            <div className="redeemContainer">
                <Input
                    onChange={({ target: { value }}) => setRedeem(value)}
                    value={redeem}
                    className="defaultInput"
                    error={error}
                    errorMessage={errorMessage}
                    placeholder="Enter in your VIP code"
                />
                {
                    successMessage ? (
                        <div className="successMessage">{successMessage}</div>
                    ) : null
                }
                <div
                    onClick={() => {
                        redeemAction()
                    }}
                    
                    className={redeemActive ? "redeemButtonWhite" : "redeemButton" }
                >
                    REDEEM
                </div>
            </div>
        </Auth>
    )
}

export default withRouter(Redeem);
