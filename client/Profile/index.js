// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// styling
import './index.css';

// utils
import { get } from 'lodash';
import prettyDate from '../utils/prettyDate';


@connect(store => ({
  user: store.user
}))
export default class PostForm extends Component {
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
    })
  }

  genField = (key, transformFunc) => {
    const val = get(this.props.user, key);
    return !val ? null : (
      <li className="profile-field">
        <b>{`${key}: `}</b>
        {`${transformFunc && transformFunc(val) || val}`}
      </li>
    );
  }

  genImage = key => {
    const val = get(this.props.user, key);
    return !val ? null : (
      <img
        className="profile-image"
        src={val}
        alt={key}
      />
    );
  }

  render() {
    return (
      <ul className="profile">
        {this.genField('email')}
        {this.genField('createdDate', prettyDate)}
        {this.genField('hasPassword')}
        {this.genImage('google.photo')}
        {this.genField('google.link')}
        {this.genImage('facebook.photo')}
        {this.genField('facebook.link')}
      </ul>
    );
  }
}
