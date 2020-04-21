import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

import {Link} from 'react-router-dom';

export default class NavigationBar extends React.Component {

	render() {
		return (
		<Navbar bg="dark" variant="dark">
			<Link to={""} className="navbar-brand">
		 	</Link>	
			 <Nav className="mr-auto">
			 <Nav.Link><Link to={""}>Hello</Link></Nav.Link>
		      <Nav.Link><Link to={"add"}>Add a train</Link></Nav.Link>
		      <Nav.Link><Link to={"list"}>Show all trains</Link></Nav.Link>
		    </Nav>
		</Navbar>
		);
	}
}