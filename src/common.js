import {zip, sum, uniq, zipWith} from 'lodash';

export const getStats = data => data[data.length - 1];

export const getDataFromCountry = (data, country) => {
	const mapped = data.filter(row => row[1] === country).map(row => row.slice(4).map(num => parseInt(num)));
	return zip(...mapped).map(day => sum(day));
};

export const getCountries = data => uniq(data.slice(1).map(row => row[1])).sort();

export function parseData(confirmedData, deathsData, recoveredData, dates) {
	const result = {datasets: [
		{
			label: 'Confirmed',
			data: [],
			backgroundColor: '#fcba03',
			borderColor: '#fcba0355',
			fill: false
		},
		{
			label: 'Active',
			data: [],
			backgroundColor: '#3a33ff',
			borderColor: '#3a33ff55',
			fill: false
		},
		{
			label: 'Deaths',
			data: [],
			backgroundColor: '#ff0000',
			borderColor: '#ff000055',
			fill: false
		},
		{
			label: 'Recovered',
			data: [],
			backgroundColor: '#1cb800',
			borderColor: '#1cb80055',
			fill: false
		}
	], labels: []};

	result.labels = dates.map(date => date.format('DD. MM.'));
	result.datasets[0].data = confirmedData;
	result.datasets[1].data = zipWith(confirmedData, deathsData, recoveredData, (confirmed, deaths, recovered) => confirmed - deaths - recovered);
	result.datasets[2].data = deathsData;
	result.datasets[3].data = recoveredData;

	return result;
}

export function parseDiffData(data, dates) {
	const result = {datasets: [
		{
			label: 'Confirmed',
			data: [],
			backgroundColor: '#fcba03',
			borderColor: '#fcba0355',
			fill: false
		}
	], labels: []}

	result.labels = dates.map(date => date.format('DD. MM.'));
	result.datasets[0].data = data;

	return result;
}
