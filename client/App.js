// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// action creators
import { initializationRequests } from './redux/actionCreators/initialize';

// other components
import Navbar from './Navbar';

// this will bring this CSS file into build
import './App.css';


@connect()
export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  state = {
    posts: []
  }

  componentWillMount() {
    this.props.dispatch(initializationRequests());
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
