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
			 <Nav.Link><Link to={""}>Add User</Link></Nav.Link>
		      <Nav.Link><Link to={"add"}>See all users</Link></Nav.Link>
		      <Nav.Link><Link to={"list"}>Show Train List</Link></Nav.Link>
		    </Nav>
		</Navbar>
		);
	}
}