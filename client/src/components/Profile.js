import React, { Component } from 'react'
import {connect} from 'react-redux';
class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        Name: <img src={this.props.user.avatar} width={24}/> {this.props.user.name}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Profile);
