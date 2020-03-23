import React, {useState, useEffect} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {InputGroup, ListGroup, FormControl} from 'react-bootstrap';

export default function CountryList(props) {
	const [ready, setReady] = useState();
	const [countries, setCountries] = useState();

	const handleInputChange = (event) => {
		const input = event.target.value;
		setCountries(props.countries.filter(country => country ? country.toLowerCase().startsWith(input.toLowerCase()) : false));
	};

	function prepareContries() {
		setCountries(props.countries);
		setReady(true);
	}

	useEffect(() => {
		prepareContries();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return !ready ? <></> : (
		<>
			<InputGroup style={{margin: '10px 0px'}}>
				<InputGroup.Prepend>
					<InputGroup.Text>
						<span role="img" aria-label="search">🔎</span>
					</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl placeholder='China' onChange={handleInputChange}></FormControl>
			</InputGroup>
			<ListGroup>
				{
					countries.map((country, index) => {
						return (<LinkContainer to={`/?country=${country}`} key={index}>
							<ListGroup.Item action href={`/?country=${country}`}>
								{country}
							</ListGroup.Item>
						</LinkContainer>);
					})
				}
			</ListGroup>
		</>
	);
};
