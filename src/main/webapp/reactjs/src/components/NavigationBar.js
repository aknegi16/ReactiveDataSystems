import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavigationBar extends React.Component {

	render() {
		return (
		<Navbar bg="dark" variant="dark">
			 <Nav className="mr-auto">
			 <Link to={""} className="nav-link">Hello</Link>
		      <Link to={"add"} className="nav-link">Add a train</Link>
		      <Link to={"list"} className="nav-link">Show all trains</Link>
		      <Link to={"list"} className="nav-link">Logout</Link>
		    </Nav>
		</Navbar>
		);
	}
}