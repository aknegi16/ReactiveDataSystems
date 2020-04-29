import React from 'react';

import {Jumbotron} from 'react-bootstrap';


export default class adminHome extends React.Component {
	render () {
		return (
		<Jumbotron className="bg-dark text-white">
		  <h1>Hello, Admin!</h1>
		  <p>
		  Welcome to the dashboard.<br/>Click on 'Add train' to add a train for specific source and destination.<br/>Click on 'See all trains' to
		    see all the trains running.<br/>Click on 'Create new rules' to add more rules for reactive data system.
		  </p>
		</Jumbotron>
		);
	};
 }