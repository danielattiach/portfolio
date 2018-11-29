import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ClimbingBoxLoader } from 'react-spinners';
import classNames from 'classnames';
import Moment from 'react-moment';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number,
      mission_name,
      launch_date_local,
      launch_success,
      launch_year,
      rocket {
        rocket_name,
        rocket_type,
        rocket_id
      }
    }
  }
`;

export default class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <div className="container text-left">
          <Query query={LAUNCH_QUERY} variables={{flight_number}}>
            {
              ({loading, error, data}) => {
                if (loading) return <div className="loader"><ClimbingBoxLoader className="mx-auto" color={'#4cb0de'} size={25} margin={25} /></div>;
                if (error) console.log(error);
                const {flight_number,
                        mission_name,
                        launch_date_local,
                        launch_success,
                        rocket: {rocket_type, rocket_id, rocket_name}} = data.launch;
                return (
                  <div>
                    <h1 className="display-4 my-3">
                    <span className="text-dark">Mission: </span>{mission_name}
                    </h1>
                    <h4 className="mb-3">Launch Details:</h4>
                    <ul className="list-group">
                    <li className="list-group-item">Flight Number: {flight_number}</li>
                    <li className="list-group-item">Launch Date: <Moment format="DD/MM/YYYY HH:mm">{launch_date_local}</Moment></li>
                    <li className="list-group-item">Launch Success: <span className={classNames({
                      'text-success': launch_success,
                      'text-danger': !launch_success
                    })}>{launch_success ? 'Yes' : 'No'}</span></li>
                    </ul>
                    <h4 className="my-3">Rocket Details:</h4>
                    <ul className="list-group">
                      <li className="list-group-item">Rocket ID: {rocket_id}</li>
                      <li className="list-group-item">Rocket Name: {rocket_name}</li>
                      <li className="list-group-item">Rocket Type: {rocket_type}</li>
                    </ul>
                  </div>
                );

              }
            }
          </Query>
          <Link to="/spacex" className="btn btn-secondary mt-2">Back</Link>
      </div>
    )
  }
}
