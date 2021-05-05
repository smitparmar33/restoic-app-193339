import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import AppleLogin from 'react-apple-login';
// components
import Input from '../../components/Input';
// actions 
import { googleSignAction, loginRedeemAction, resetErrorAction, signUpApple } from '../../modules/auth';
// style
import './index.css'
import { rememberMeGet, rememeberMeAdd } from '../../utils/rememberMe';
import { withRouter } from 'react-router-dom';
import Auth from '../../components/Auth';
import { removeTokenFromHeader } from '../../services/api';

const mainActions = {
    loginRedeemAction: loginRedeemAction,
	resetErrorAction: resetErrorAction,
	googleSignAction: googleSignAction,
	signUpAppleAction: signUpApple
};

const ReedemLogin = (props) => {
	const [email, setEmail] = useState(rememberMeGet());
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	useEffect(() => {
		localStorage.removeItem('redeemActive')
		props.resetErrorAction()
		if (props.authenticated) {
			props.history.replace('/')
			return;
		}
		removeTokenFromHeader()
	}, []);

	return (
		<Auth>
			<div className="loginRedeemContent">
				<div className="loginRedeemCenter">
					<Input
						onChange={({ target: { value }}) => setEmail(value)}
						value={email}
						type="text"
						error={props.emailError}
						errorMessage={props.emailErrorText}
						className="loginRedeemInput"
						placeholder="Email"
					/>
					<Input
						onChange={({ target: { value }}) => setPassword(value)}
						value={password}
						type="password"
						error={props.passwordError || props.non_field_errorsError}
						errorMessage={props.passwordErrorText || props.non_field_errorsErrorText}
						className="loginRedeemInput"
						placeholder="Password"
					/>
					<div className="loginRedeemCenterRememberWrapper">
						<div className="loginRedeemCenterRememberMe">
							{/* <input
								type="checkbox"
								value={rememberMe}
								onChange={() => setRememberMe(!rememberMe)}
								className="rememberMeInput"
							/>
							<div className="loginCenterRememberMeText">Remember me</div> */}
						</div>
						<div
							className="loginRedeemCenterForgotPassword"
							onClick={() => window.open('https://restoic-app-19339.botics.co/accounts/password/reset/')}
						>
							Forgot password?
						</div>
					</div>
					{
						email !== '' ? (
							<div
								onClick={() => {
									if (rememberMe) {
										rememeberMeAdd(email)
									}
									props.loginRedeemAction(email, password)
								}}
								className="loginRedeemButton"
							>
								LOGIN
							</div>
						) : null
					}
					{
						email === '' ? (
							<>
								<AppleLogin  
									clientId="com.crowdbotics.restoicweb" 
									redirectURI="https://restoic.herokuapp.com/redeem"
									responseType={"code"} 
									responseMode={"form_post"}  
									usePopup={true}
									callback={(res) => {
										if (res?.error) {
											// props.history.replace('/redeem')
											return;
										}
										props.signUpAppleAction(res.authorization.code, res.authorization.id_token, true)
									}}
									render={renderProps => (
										<div
											onClick={() => {
												// props.history.replace('/login')
												renderProps.onClick()
											}}
											disabled={renderProps.disabled}
											className="appleRedeemButton"
										>
											<div className="appleRedeemButtonIcon" />
											<div className="appleRedeemButtonText">Sign in with Apple</div>
										</div>
									)}
								/>
								<GoogleLogin
									clientId="1084903484074-uguvndtqq7e8mp0iuvmqs1qs0u96bcap.apps.googleusercontent.com"
									buttonText="Sign in with Google"
									onSuccess={({ tokenObj: { access_token }}) => props.googleSignAction(access_token, true)}
									onFailure={(e) => {}}
									cookiePolicy={'single_host_origin'}
									render={renderProps => (
										<div
											onClick={() => {
												// props.history.replace('/login');
												renderProps.onClick()
											}}
											disabled={renderProps.disabled}
											className="googleRedeemButton"
										>
											<div className="googleRedeemButtonIcon" />
											<div className="googleRedeemButtonText">Sign in with Google</div>
										</div>
									)}
								/>
							</>
						) : null
					}
					<div className="loginRedeemTermsText">
						By using Restoic you agree to our&nbsp;
						<span
							className="loginRedeemTermsLabel"
							onClick={() => alert('go to terms page')}
						>Terms</span>
					</div>
					<div
						className="loginRedeemDontHaveAccountText"
						onClick={() => props.history.push('/redeem-signUp')}
					>
						I don’t have an account. Sign Up
					</div>
				</div>
			</div>
		</Auth>
	);
}

export default withRouter(connect(
  ({
    auth: {
		authenticated,
		error,
		loading,
		emailError,
		passwordError,
		emailErrorText,
		passwordErrorText,
		non_field_errorsErrorText,
		non_field_errorsError,
    }
  }) => ({
    authenticated,
    error,
	loading,
	emailError,
	passwordError,
	emailErrorText,
	passwordErrorText,
	non_field_errorsErrorText,
	non_field_errorsError,
  }),
  dispatch => bindActionCreators(mainActions, dispatch)
)(ReedemLogin));