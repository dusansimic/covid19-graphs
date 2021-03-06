import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function About() {
	return (
		<div style={{margin: '50px 0', fontSize: '1.2em'}}>
			<Container>
				<Row>
					<Col lg={2}/>
					<Col>
						<Navbar>
							<Nav.Item>
								<LinkContainer to='/'>
									<Nav.Link>{'< Back'}</Nav.Link>
								</LinkContainer>
							</Nav.Item>
						</Navbar>
						<h3><b>Idea</b></h3>
						<p>
							This is a small, "quick and dirty", simple, web app that I made. I wanted to see graphs with numbers of Corona virus patients in each country for the past couple of weeks. There are some sites where you can get that but not for all countries as I've seen. Since it was good for me I wanted to share it so anyone can check it out.
						</p>

						<h3><b>Data source</b></h3>
						<p>
							All of the data You see here is from <a href="https://github.com/CSSEGISandData/COVID-19">this</a> GitHub repository. It's created by Center for Systems Science and Engineering at the Johns Hopkins University. You can see all the information about the data sources on that link.<br/>
							The data is not always up to date because it's updated once at midnight (23:59h) but it's reliable and could be used for relative representation of the Corona virus situation around the world.
						</p>

						<h3><b>Open source</b></h3>
						<p>
							This web app is open source under the MIT license. You can find it on my GitHub <a href="https://github.com/dusansimic/covid19-graphs">repo</a>. I'm open to suggestions and change requests. You can create an Issue on the <a href="https://github.com/dusansimic/covid19-graphs/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc">issue page</a> or if you don't have a GitHub account, just <a href="mailto:dusan.simic1810@gmail.com">email me</a>.
						</p>

						<h3><b>Important note</b></h3>
						<p>
							As it is stated in terms of use in CSSE GitHub repository:<br/>
							<i>Reliance on the Website for medical guidance or use of the Website in commerce is strictly prohibited</i><br/>
						</p>
						<p style={{margin: '30px 0'}}><center>MIT © <a href="http://dusansimic.me">Dušan Simić</a></center></p>
					</Col>
					<Col lg={2}/>
				</Row>
			</Container>
		</div>
	);
};
