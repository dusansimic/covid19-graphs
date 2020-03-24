import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './NumberStatsBar.css';

export default function NumberStatsBar(props) {
	return (
		<Row>
			<Col>
				<Card style={{backgroundColor: "#ffc10777"}} className='statsCard'>
					<Card.Body>
						<p>Confirmed</p>
						<h3>{props.confirmed}</h3>
					</Card.Body>
				</Card>
			</Col>

			<Col>
				<Card style={{backgroundColor: "#ffc10711"}} className='statsCard'>
					<Card.Body>
						<p>New confirmed</p>
						<h3>{props.newConfirmed}</h3>
					</Card.Body>
				</Card>
			</Col>

			<Col>
				<Card style={{backgroundColor: "#007bff77"}} className='statsCard'>
					<Card.Body>
						<p>Active</p>
						<h3>{props.active}</h3>
					</Card.Body>
				</Card>
			</Col>

			<Col>
				<Card style={{backgroundColor: "#dc354577"}} className='statsCard'>
					<Card.Body>
						<p>Deaths</p>
						<h3>{props.deaths}</h3>
					</Card.Body>
				</Card>
			</Col>

			<Col>
				<Card style={{backgroundColor: "#dc354511"}} className='statsCard'>
					<Card.Body>
						<p>New deaths</p>
						<h3>{props.newDeaths}</h3>
					</Card.Body>
				</Card>
			</Col>

			<Col>
				<Card style={{backgroundColor: "#28a74577"}} className='statsCard'>
					<Card.Body>
						<p>Recovered</p>
						<h3>{props.recovered}</h3>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};
