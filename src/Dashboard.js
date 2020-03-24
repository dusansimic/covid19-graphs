import React, {useEffect, useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Container, Row, Col, Spinner, Navbar, Nav} from 'react-bootstrap';
import dayjs from 'dayjs';
import ky from 'ky';
import Papa from 'papaparse';
import {isEmpty, zip} from 'lodash';
import {
	parseData,
	removeStatProp,
	getStats,
	parseDiffData
} from './common';
import countryList from './countryHardcodedList';
import CountryList from './components/CountryList';
import NumberStatsBar from './components/NumberStatsBar';
import {
	Line as LineChart,
	Bar as BarChart
} from 'react-chartjs-2';

function useQuery(location) {
	return new URLSearchParams(location.search);
}

export default function Dashboard() {
	const [confirmedData, setConfirmedData] = useState();
	const [deathsData, setDeathsData] = useState();
	const [recoveredData, setRecoveredData] = useState();
	const [newConfirmedData, setNewConfirmedData] = useState();
	const [newDeathsData, setNewDeathsData] = useState();
	const [dates, setDates] = useState();
	const [country, setCountry] = useState();
	const [chartScaleType, setChartScaleType] = useState('linear');
	const location = useLocation();
	const query = useQuery(location);

	const chartOptions = {
		scales: {
			yAxes: [
				{
					type: chartScaleType
				}
			]
		},
		tooltips: {
			mode: 'index',
			intersect: false
		},
		hover	: {
			mode: 'index',
			intersect: true
		}
	};

	async function getNewData() {
		if (country === undefined) {
			return;
		}

		const newData = await ky.get(`https://thevirustracker.com/free-api?countryTimeline=${countryList().find(obj => obj.name === country).timelineCode}`).json();

		const timelineItems = removeStatProp(newData.timelineitems[0]);
		const dates = Object.entries(timelineItems).map(arr => dayjs(arr[0]));
		setDates(dates);
		const zipped = zip(...(Object.entries(timelineItems).map(arr => Object.entries(arr[1]).map(arr => arr[1]))));
		setNewConfirmedData(zipped[0]);
		setNewDeathsData(zipped[1]);
		setConfirmedData(zipped[2]);
		setDeathsData(zipped[4]);
		setRecoveredData(zipped[3]);
	}

	function changeCountry() {
		setCountry(query.get('country') ?? 'China');
	}

	useEffect(() => {
		changeCountry();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		changeCountry();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	useEffect(() => {
		getNewData();
		document.title = `COVID-19 Graphs - ${country}`;
	}, [country]);

	return (isEmpty(confirmedData) || isEmpty(deathsData) || isEmpty(recoveredData) || !dates || !country) ? <Spinner animation='border' variant='primary' style={{display: 'block', position: 'fixed', zIndex: '1031', top: '50%', left: '50%', marginTop: '-35px', marginLeft: '-35px'}}/> : (
		<Container fluid>
			<Row>
				<Col lg={2}>
					<CountryList countries={countryList().map(country => country.name)}/>
				</Col>
				<Col lg={10} style={{maxHeight: '100vh', overflowY: 'scroll', WebkitOverflowScrolling: 'touch'}}>
					<Navbar className="justify-content-between">
						<Navbar.Brand><h2>{country}</h2></Navbar.Brand>

						<Nav className="mr-sm-2">
							<Nav.Item>
								<LinkContainer to='/about'>
									<Nav.Link>About</Nav.Link>
								</LinkContainer>
							</Nav.Item>
						</Nav>
					</Navbar>
					<NumberStatsBar
						confirmed={getStats(confirmedData)}
						newConfirmed={getStats(newConfirmedData)}
						active={getStats(confirmedData) - getStats(deathsData) - getStats(recoveredData)}
						deaths={getStats(deathsData)}
						newDeaths={getStats(newDeathsData)}
						recovered={getStats(recoveredData)}
					/>
					<Nav variant='tabs' style={{marginTop: '10px'}} activeKey={chartScaleType} onSelect={setChartScaleType}>
						<Nav.Item>
							<Nav.Link eventKey='linear'>Linear</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey='logarithmic'>Logarithmic</Nav.Link>
						</Nav.Item>
					</Nav>
					<LineChart data={parseData(confirmedData, deathsData, recoveredData, dates)} options={chartOptions}/>
					<Row>
						<Col>
							<BarChart data={parseDiffData(newConfirmedData, dates)}/>
						</Col>
						<Col>
							<BarChart data={parseDiffData(newDeathsData, dates)}/>
						</Col>
					</Row>
					<center><p style={{margin: '30px 0'}}>MIT © <a href="http://dusansimic.me">Dušan Simić</a></p></center>
					<center><p><Link to='/about'>About</Link></p></center>
				</Col>
			</Row>
		</Container>
	);
};
