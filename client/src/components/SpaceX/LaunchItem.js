import React from 'react'
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import classNames from 'classnames';

export default ({ launch: {flight_number, mission_name, launch_date_local, launch_success} }) => {
  return (
    <div className="card card-body mb-3">
      <Row>
        <Col md={9}>
          <h4>Mission: <span className={classNames({
            'text-success': launch_success,
            'text-danger': !launch_success,
          })}>{mission_name}</span></h4>
          <p>Date:  <Moment format="DD-MM-YYYY HH:mm">{launch_date_local}</Moment></p>
        </Col>
        <Col md={3}>
          <Link to={`/spacex/launch/${flight_number}`} className="btn btn-secondary"> Launch Details</Link>
        </Col>
      </Row>
    </div>
  )
}
