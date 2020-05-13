import React from 'react';
import {Navbar, Nav,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavigationBar extends React.Component {
	  constructor(props) {
		    super(props);
		    this.state = {value: ''};
		    
		    this.changePassword = this.changePassword.bind(this);
		    this.logout = this.logout.bind(this);
		  }
	  
	  changePassword = () => {
		  this.props.history.push('/userChangePassword');
	  }
	logout=()=>{
		localStorage.clear("loggedin");
		localStorage.clear("usr");
		this.props.history.push("/");
	}
	
	render() {
		return (
		<Navbar bg="dark" variant="dark" fixed="top">
			 <Nav className="container-fluid">
			  <Link to={"userHome"} className="nav-link">Home</Link>
			  <Link to={"bookingHistory"} className="nav-link">Ticket history</Link>
		      <Link to={"bookTrain"} className="nav-link">Book a train</Link>
		      <Link to={"userChangePassword"} className="nav-link">Change Password</Link>
		      <Button className="ml-auto" size="sm" variant="secondary" onClick={this.logout}>Logout</Button>
		    </Nav>
		</Navbar>
		);
	}
}