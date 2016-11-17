// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { get } from 'lodash';

// styling
import './index.css';

// action creators
import {
  logIn,
  signUp,
  addPassword,
  logoutRequest
} from '../../redux/actionCreators/user';


@connect((store) => ({
  user: store.user,
  currentRoute: store.routing.locationBeforeTransitions.pathname
}))
export default class NavAuth extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      createdDate: PropTypes.string,
      hasPassword: PropTypes.bool,
      google: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
      }),
      facebook: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
      })
    }),
    dispatch: PropTypes.func.isRequired
  }

  viewProfile = () => this.props.dispatch(push('/profile'))

  viewBlog = () => this.props.dispatch(push('/'))

  logIn = () => {
    const email = get(this.refs, 'email.value');
    const password = get(this.refs, 'password.value');
    this.props.dispatch(logIn(email, password));
  }

  signUp = () => {
    const email = get(this.refs, 'email.value');
    const password = get(this.refs, 'password.value');
    this.props.dispatch(signUp(email, password));
  }

  addPassword = () => {
    const password = get(this.refs, 'password.value');
    this.props.dispatch(addPassword(this.props.user._id, password));
  }

  logout = () => {
    if(this.props.currentRoute !== '/') {
      this.props.dispatch(push('/'))
    }
    this.props.dispatch(logoutRequest());
  }

  loginOnEnterKey = e => e.keyCode === 13 && this.logIn();

  render() {
    const user = this.props.user;
    const loggedIn = !!get(user, 'email'); // if user has email property, they're logged in
    const authErrorMessage = get(user, 'authErrorMessage');
    const viewingProfile = this.props.currentRoute === '/profile';

    return (
      <ul className="navbar-auth nav navbar-nav navbar-right">
        {
          loggedIn
          &&
          <li className="nav-button">
            <a
              className="profile-view-toggle"
              href="#"
              onClick={!viewingProfile ? this.viewProfile : this.viewBlog}
            >
              {`VIEW ${!viewingProfile ? 'PROFILE' : 'BLOG'}`}
            </a>
          </li>
        }
        <li
          className={`nav user-photo ${get(user, 'google.photo') && 'show'}`}
          style={get(user, 'google.photo') && {backgroundImage: `url(${user.google.photo})`}}
        />
        <li
          className={`nav user-photo ${get(user, 'facebook.photo') && 'show'}`}
          style={get(user, 'facebook.photo') && {backgroundImage: `url(${user.facebook.photo})`}}
        />
        <li
          className="nav-button"
          onKeyDown={this.loginOnEnterKey}
        >
          {
            (!loggedIn || !user.hasPassword || !user.google || !user.facebook) // check user ""
            &&
            <span>
              LOG IN &#10161;
              {
                !get(user, 'google')
                &&
                <a href="/auth/google">
                  <i className="fa fa-google o-auth-btn"/>
                </a>
              }
              {
                !get(user, 'facebook')
                &&
                <a href="/auth/facebook">
                  <i className="fa fa-facebook o-auth-btn"/>
                </a>
              }
              {
                !loggedIn
                &&
                <input
                  className="nav-input"
                  ref="email"
                  placeholder="email"
                  type="text"
                />
              }
              {
                !get(user, 'hasPassword')
                &&
                <input
                  className="nav-input"
                  ref="password"
                  placeholder="password"
                  type="password"
                />
              }
              {
                loggedIn && !get(user, 'hasPassword')
                &&
                <button
                  className="local-auth-button"
                  onClick={this.addPassword}
                >
                  Add Password
                </button>
              }
              {
                !loggedIn
                &&
                <button
                  className="local-auth-button"
                  onClick={this.logIn}
                >
                  Log In
                </button>
              }
              {
                !loggedIn
                &&
                <button
                  className="local-auth-button"
                  onClick={this.signUp}
                >
                  Sign Up
                </button>
              }
            </span>
          }
          {
            loggedIn
            &&
            <a
              className="nav-button log-out-button"
              href="#"
              onClick={this.logout}
            >
              LOG OUT
            </a>
          }
        </li>
        {
          authErrorMessage
          &&
          <div className="auth-error">
            {authErrorMessage}
          </div>
        }
      </ul>
    );
  }
}
