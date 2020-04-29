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
			  <Link to={"userHome"} className="nav-link">Home</Link>
			  <Link to={"bookingHistory"} className="nav-link">Ticket history</Link>
		      <Link to={"bookTrain"} className="nav-link">Book a train</Link>
		      
		      
		      <Button className="ml-auto" size="sm" variant="secondary" onClick={this.logout}>Logout</Button>
		    </Nav>
		</Navbar>
		);
	}
}