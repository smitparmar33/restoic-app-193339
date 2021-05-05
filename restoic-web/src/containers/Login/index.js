import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import AppleLogin from 'react-apple-login';
// components
import Input from '../../components/Input';
import LoginHeader from '../../components/LoginHeader';
// actions 
import { googleSignAction, loginAction, resetErrorAction, signUpApple } from '../../modules/auth';
// style
import './index.css'
import { rememberMeGet, rememeberMeAdd } from '../../utils/rememberMe';
import { withRouter } from 'react-router-dom';

const mainActions = {
  	loginAction: loginAction,
	resetErrorAction: resetErrorAction,
	googleSignAction: googleSignAction,
	signUpAppleAction: signUpApple
};

const Login = (props) => {
	const [email, setEmail] = useState(rememberMeGet());
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	useEffect(() => {
		if (props.authenticated) {
			props.history.replace('/')
		}
		resetErrorAction()
	}, []);

	return (
		<div className="loginContainer">
			<LoginHeader />
			<div className="loginContent">
				<div className="loginCenter">
					<div className="loginCenterWelcomeText">Welcome to Restoic Smart Coach. Please log in below.</div>
					<Input
						onChange={({ target: { value }}) => setEmail(value)}
						value={email}
						type="text"
						error={props.emailError}
						errorMessage={props.emailErrorText}
						className="loginInput"
						placeholder="Email"
					/>
					<Input
						onChange={({ target: { value }}) => setPassword(value)}
						value={password}
						type="password"
						error={props.passwordError || props.non_field_errorsError}
						errorMessage={props.passwordErrorText || props.non_field_errorsErrorText}
						className="loginInput"
						placeholder="Enter password"
					/>
					<div className="loginCenterRememberWrapper">
						<div className="loginCenterRememberMe">
							<input
								type="checkbox"
								value={rememberMe}
								onChange={() => setRememberMe(!rememberMe)}
								className="rememberMeInput"
							/>
							<div className="loginCenterRememberMeText">Remember me</div>
						</div>
						<div
							className="loginCenterForgotPassword"
							onClick={() => window.open('https://restoic-app-19339.botics.co/accounts/password/reset/')}
						>
							Forgot password?
						</div>
					</div>
					<div
						onClick={() => {
							if (rememberMe) {
								rememeberMeAdd(email)
							}
							props.loginAction(email, password)
						}}
						className="loginButton"
					>
						LOGIN
					</div>
					<AppleLogin  
						clientId="com.crowdbotics.restoicweb" 
						redirectURI="https://restoic.herokuapp.com/login"
						responseType={"code"} 
						responseMode={"form_post"}  
						usePopup={true}
						callback={(res) => {
							if (res?.error) {
								return;
							}
							console.log("res apple", res)
							props.signUpAppleAction(res.authorization.code, res.authorization.id_token)
						}}
						render={renderProps => (
							<div
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								className="appleButton"
							>
								<div className="appleButtonIcon" />
								<div className="appleButtonText">Login with Apple</div>
							</div>
						)}
					/>
					<GoogleLogin
						clientId="1084903484074-uguvndtqq7e8mp0iuvmqs1qs0u96bcap.apps.googleusercontent.com"
						buttonText="Login with Google"
						onSuccess={({ tokenObj: { access_token }}) => props.googleSignAction(access_token)}
						onFailure={(e) => {}}
						cookiePolicy={'single_host_origin'}
						render={renderProps => (
							<div
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								className="googleButton"
							>
								<div className="googleButtonIcon" />
								<div className="googleButtonText">Login with Google</div>
							</div>
						)}
					/>
					<div className="loginTermsText">
						By using Restoic you agree to our&nbsp;
						<span
							className="loginTermsLabel"
							onClick={() => alert('go to terms page')}
						>Terms</span>
					</div>
				</div>
			</div>
		</div>
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
)(Login));