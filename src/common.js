import {zip, sum, uniq} from 'lodash';

export const getDataFromCountry = (data, country) => {
	const mapped = data.filter(row => row[1] === country).map(row => row.slice(4).map(num => parseInt(num)));
	return zip(...mapped).map(day => sum(day));
};

export const getDataFromDate = (data, date, country) => {
	let i = 3;
	while (data[0][++i] !== date);

	return getDataFromCountry(data, country)[i - 4];
}

export const getCountries = data => uniq(data.slice(1).map(row => row[1])).sort();
