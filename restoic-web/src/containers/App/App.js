import React from 'react';
import './App.css';

import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import PrivateRoute from '../../components/PrivateRoute';
import Login from '../Login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChoosePlan from '../ChoosePlan';
import { excludeSideBarForRoutes } from '../../utils/excludeSideBarForRoutes';
import SideBar from '../../components/SideBar';
import WeeklyTasks from '../WeeklyTasks';
import ComingSoon from '../../components/ComingSoon';
import NavHeader from '../../components/NavHeader';
import TeamProgress from '../TeamProgress';
import Downloads from '../Downloads';
import Redeem from '../Redeem';
import ReedemLogin from '../ReedemLogin';
import ReedemSignUp from '../ReedemSignUp';

const Router = () => (
  <Switch>
    <Route path='/login' component={Login} />
    <PrivateRoute exact path="/" component={WeeklyTasks} />
    <PrivateRoute path='/choosePlan' component={ChoosePlan} />
    <PrivateRoute path="/teamProgress" component={() => <TeamProgress />} />
    <PrivateRoute path="/teamChat" component={() => <ComingSoonWrapper title="Team Chat" />} />
    <PrivateRoute path="/teamCoaching" component={() => <ComingSoonWrapper title="Team Coaching" />} />
    <PrivateRoute path="/choosePlanInner" component={ChoosePlan} />
    <PrivateRoute path="/admin" component={() => <ComingSoonWrapper title="Admin" />} />
    <PrivateRoute path="/downloads" component={Downloads} />
    <PrivateRoute path="/contactUs" component={() => <ComingSoonWrapper title="Contact Us" />} />
    <Route path='/redeem-code' component={Redeem} />
    <Route path='/redeem' component={ReedemLogin} />
    <Route path='/redeem-signUp' component={ReedemSignUp} />
  </Switch>
);

const App = ({ authenticated, location: { pathname } }) => {
  return (
    <div className="App">
      {
        authenticated && excludeSideBarForRoutes(pathname) && (
          <SideBar />
        )
      }
        <div className={authenticated && excludeSideBarForRoutes(pathname) ? "appContent": "appContentFull"}>
          <Router />
        </div>
    </div>
  );
}

export default withRouter(connect(
  ({
    auth: {
      authenticated,
    }
  }) => ({
    authenticated,
  }),
  dispatch => bindActionCreators({}, dispatch)
)(App));

function ComingSoonWrapper({ title }) {
  const { first_name, last_name, image } = JSON.parse(localStorage.getItem('user'))
  return (
    <div className="comingSoon" >
      <NavHeader
          title={title}
          userImage={image}
          firstName={first_name}
          lastName={last_name}
          hasSlider={false}
      />
      <ComingSoon />
    </div>
  );
}