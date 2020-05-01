import React from 'react';
import {Navbar, Nav,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavigationBar extends React.Component {
		constructor(props) {
	    	super(props);
	    	this.state = {value: ''};

	    	this.logout = this.logout.bind(this);
	 	}
	
	logout=()=>{
		localStorage.clear("loggedin");
		this.props.history.push("/");
	}
	
	render() {
		return (
		<Navbar bg="dark" variant="dark" fixed="top">
			 <Nav className="container-fluid">
			  <Link to={"adminHome"} className="nav-link">Home</Link>
		      <Link to={"add"} className="nav-link">Add a train</Link>
		      <Link to={"list"} className="nav-link">Show all trains</Link>
		      <Link to={"adminCreateRule"} className="nav-link">Create rules</Link>
		      <Link to={"adminRuleList"} className="nav-link">All rules</Link>
		      <Button className="ml-auto" size="sm" variant="secondary" onClick={this.logout}>Logout</Button>
		    </Nav>
		</Navbar>
		);
	}
}