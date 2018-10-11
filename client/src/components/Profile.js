import React, { Component } from 'react'
import {connect} from 'react-redux';
import '../css/profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col-sm text-center">
            <img className="profile-avatar" src={this.props.user.avatar}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm text-center">
            <h2 className="profile-title">{this.props.user.name}</h2>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Profile);
