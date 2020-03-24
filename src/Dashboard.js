import React, {useEffect, useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Container, Row, Col, Spinner, Navbar, Nav} from 'react-bootstrap';
import dayjs from 'dayjs';
import ky from 'ky';
import Papa from 'papaparse';
import {isEmpty} from 'lodash';
import {
	getDataFromDate,
	getCountries,
	parseData
} from './common';
import CountryList from './components/CountryList';
import NumberStatsBar from './components/NumberStatsBar';
import Chart from './components/Chart';

function useQuery(location) {
	return new URLSearchParams(location.search);
}

export default function Dashboard() {
	const [confirmedData, setConfirmedData] = useState();
	const [deathsData, setDeathsData] = useState();
	const [recoveredData, setRecoveredData] = useState();
	const [date, setDate] = useState();
	const [country, setCountry] = useState();
	const location = useLocation();
	const query = useQuery(location);

	async function getData() {
		const confirmedData = await ky.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv').text();
		setConfirmedData(Papa.parse(confirmedData).data);

		const deathsData = await ky.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv').text();
		setDeathsData(Papa.parse(deathsData).data);

		const recoveredData = await ky.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv').text();
		setRecoveredData(Papa.parse(recoveredData).data);
		console.log(dayjs(new Date()).subtract(1, 'day').format('M/D/YY'));

		setDate(dayjs(new Date()).subtract(1, 'day').format('M/D/YY'));
	}

	function changeCountry() {
		setCountry(query.get('country') ?? 'China');
	}

	useEffect(() => {
		getData();
		changeCountry();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		changeCountry();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	useEffect(() => {
		document.title = `COVID-19 Graphs - ${country}`;
	}, [country]);

	return (isEmpty(confirmedData) || isEmpty(deathsData) || isEmpty(recoveredData) || !date || !country) ? <Spinner animation='border' variant='primary' style={{display: 'block', position: 'fixed', zIndex: '1031', top: '50%', left: '50%', marginTop: '-35px', marginLeft: '-35px'}}/> : (
		<Container fluid>
			<Row>
				<Col lg={2}>
					<CountryList countries={getCountries(confirmedData)}/>
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
						confirmed={getDataFromDate(confirmedData, date, country)}
						active={getDataFromDate(confirmedData, date, country) - getDataFromDate(deathsData, date, country) - getDataFromDate(recoveredData, date, country)}
						deaths={getDataFromDate(deathsData, date, country)}
						recovered={getDataFromDate(recoveredData, date, country)}
					/>
					<Chart data={parseData(confirmedData, deathsData, recoveredData, country)} />
					<center><p style={{margin: '30px 0'}}>MIT © <a href="http://dusansimic.me">Dušan Simić</a></p></center>
					<center><p><Link to='/about'>About</Link></p></center>
				</Col>
			</Row>
		</Container>
	);
};
