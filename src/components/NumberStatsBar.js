import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default function NumberStatsBar(props) {
	return (
		<Row>
			<Col>
				<Card>
					<Card.Body>
						<p>Confirmed</p>
						<h3>{props.confirmed}</h3>
					</Card.Body>
				</Card>
			</Col>

			<Col>
				<Card>
					<Card.Body>
						<p>Active</p>
						<h3>{props.active}</h3>
					</Card.Body>
				</Card>
			</Col>

			<Col>
				<Card>
					<Card.Body>
						<p>Deaths</p>
						<h3>{props.deaths}</h3>
					</Card.Body>
				</Card>
			</Col>

			<Col>
				<Card>
					<Card.Body>
						<p>Recovered</p>
						<h3>{props.recovered}</h3>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};
