import React from 'react';

import {Jumbotron} from 'react-bootstrap';


export default class userHome extends React.Component {
	render () {
		return (
		<Jumbotron className="bg-dark text-white">
		  <h1>Hello, user!</h1>
		  <p>
		    Welcome to the dashboard.<br/>Click on 'Ticket History' to see all your previous booking and its status.<br/>Click on 'Book a train' to
		    book your train ticket now.
		  </p>
		</Jumbotron>
		);
	};
 }