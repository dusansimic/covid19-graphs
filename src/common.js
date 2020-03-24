import {zip, sum, uniq} from 'lodash';
import dayjs from 'dayjs';

export const getDataFromCountry = (data, country) => {
	const mapped = data.filter(row => row[1] === country).map(row => row.slice(4).map(num => parseInt(num)));
	return zip(...mapped).map(day => sum(day));
};

export const getDataFromDate = (data, date, country) => {
	const i = data[0].findIndex(val => val === date);
	const correctI = i === -1 ? data[0].length - 1 : i;

	return getDataFromCountry(data, country)[correctI - 4];
}

export const getCountries = data => uniq(data.slice(1).map(row => row[1])).sort();

export function parseData(confirmedData, deathsData, recoveredData, country) {
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
