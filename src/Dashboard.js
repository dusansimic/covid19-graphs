import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Container, Row, Col, Spinner, Navbar, Nav} from 'react-bootstrap';
import dayjs from 'dayjs';
import ky from 'ky';
import Papa from 'papaparse';
import {isEmpty} from 'lodash';
import {
	getDataFromDate,
	getCountries
} from './common';
import CountryList from './components/CountryList';
import NumberStatsBar from './components/NumberStatsBar';
import Chart from './components/Chart';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function Dashboard() {
	const [confirmedData, setConfirmedData] = useState();
	const [deathsData, setDeathsData] = useState();
	const [recoveredData, setRecoveredData] = useState();
	const [date, setDate] = useState();
	const [country, setCountry] = useState();
	const query = useQuery();

	async function getData() {
		const confirmedData = await ky.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv').text();
		setConfirmedData(Papa.parse(confirmedData).data);

		const deathsData = await ky.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv').text();
		setDeathsData(Papa.parse(deathsData).data);

		const recoveredData = await ky.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv').text();
		setRecoveredData(Papa.parse(recoveredData).data);

		await setDate(dayjs(new Date()).subtract(1, 'day').format('M/D/YY'));
		await setCountry(query.get('country') ?? 'China');
	}

	function parseData(confirmedData, deathsData, recoveredData, country) {
		const result = {datasets: [
			{label: 'Confirmed', data: [], backgroundColor: '#fcba03', borderColor: '#fcba0355', fill: false},
			{label: 'Active', data: [], backgroundColor: '#3a33ff', borderColor: '#3a33ff55', fill: false},
			{label: 'Deaths', data: [], backgroundColor: '#ff0000', borderColor: '#ff000055', fill: false},
			{label: 'Recovered', data: [], backgroundColor: '#1cb800', borderColor: '#1cb80055', fill: false}
		], labels: []};
		let date = dayjs(new Date()).subtract(1, 'day');

		while (date.format('YYYY/MM/DD') !== '2020/01/31') {
			result.labels.unshift(date.format('DD. MM.'));
			const confirmedDataFromDate = getDataFromDate(confirmedData, date.format('M/D/YY'), country);
			const deathsDataFromDate = getDataFromDate(deathsData, date.format('M/D/YY'), country);
			const recoveredDataFromDate = getDataFromDate(recoveredData, date.format('M/D/YY'), country);
			result.datasets[0].data.unshift(confirmedDataFromDate);
			result.datasets[1].data.unshift(confirmedDataFromDate - deathsDataFromDate - recoveredDataFromDate);
			result.datasets[2].data.unshift(deathsDataFromDate);
			result.datasets[3].data.unshift(recoveredDataFromDate);
			date = date.subtract(1, 'day');
		}

		return result;
	}

	useEffect(() => {
		getData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (isEmpty(confirmedData) || isEmpty(deathsData) || isEmpty(recoveredData) || !date || !country) ? <Spinner animation='border' variant='primary' style={{display: 'block', position: 'fixed', zIndex: '1031', top: '50%', left: '50%', marginTop: '-35px', marginLeft: '-35px'}}/> : (
		<Container fluid>
			<Row>
				<Col lg={2}>
					<CountryList countries={getCountries(confirmedData)}/>
				</Col>
				<Col lg={10}>
					<Navbar className="justify-content-between">
						<Navbar.Brand><h2>{country}</h2></Navbar.Brand>

						<Nav className="mr-sm-2">
							<Nav.Item>
								<Nav.Link href="/about">About</Nav.Link>
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
					<p style={{margin: '30px 0'}}><center>MIT © <a href="http://dusansimic.me">Dušan Simić</a></center></p>
					<p><center><a href="/about">About</a></center></p>
				</Col>
			</Row>
		</Container>
	);
};
