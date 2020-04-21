import React from 'react';

import {Jumbotron, Button} from 'react-bootstrap';


export default class Welcome extends React.Component {
	render () {
		return (
		<Jumbotron className="bg-dark text-white">
		  <h1>Hello, user!</h1>
		  <p>
		    This is a simple hero unit, a simple jumbotron-style component for calling
		    extra attention to featured content or information.
		  </p>
		  <p>
		    <Button variant="primary">Learn more</Button>
		  </p>
		</Jumbotron>
		);
	};
 }