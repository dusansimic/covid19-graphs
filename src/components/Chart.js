import React from 'react';
import {Line} from 'react-chartjs-2';

export default function Chart(props) {
	const options = {
		tooltips: {
			mode: 'index',
			intersect: false
		},
		hover	: {
			mode: 'index',
			intersect: true
		}
	};

	return (
			<Line data={props.data} options={options}/>
	);
};
