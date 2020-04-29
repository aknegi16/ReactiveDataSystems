import React from 'react';
import axios from 'axios';

import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

export default class bookingHistory extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			bookingDetails: []
		};
	}
	
	//Pass the bookingDetails api url here and link the react url in bookingDetailsController.java
	componentDidMount() {
		this.getAllBookingDetails();
	}
	
	
	getAllBookingDetails() {
		axios.get("http://localhost:8001/rest/bookingDetails")
		.then(response => response.data)
		.then( (data) =>{
			this.setState({bookingDetails: data});
		});
	}
	
	/*	
	getAllBookingDetails(){
		axios.get("http://localhost:8001/rest/bookingDetails")
		.then(response => {
			this.setState({
				bookingDetails: this.state.bookingDetails.filter(bookingDetails => bookingDetails.userid == userId)
			});
		});
	}
	*/
	
	deleteTrain = (bookingId) => {
		axios.delete("http://localhost:8001/rest/bookingDetails/"+bookingId)
		.then(response => {
			if (response.data != null) {
				this.setState({"show":true});
				setTimeout(() => this.setState({"show":false}), 3000);
				this.setState({
					bookingDetails: this.state.bookingDetails.filter(bookingDetails => bookingDetails.bookingId != bookingId)
				});
			} else {
				this.setState({"show":false});	
			}
		});
	}
	render() {
		return(
				<div>
			<Card className={"border border-dark bg-dark text-white"}>
				<Card.Header><FontAwesomeIcon icon={faList}/> Booking History</Card.Header>
				<Card.Body>
				
				<Table striped bordered hover variant="dark">
				  <thead>
				    <tr align="center">
				      <th>Train Id</th>
				      <th>Train Name</th>
				      <th>Source</th>
				      <th>Destination</th>
				      <th>Seats Booked</th>
				      <th>PNR</th>
				      <th>Date</th>
				      <th>Status</th>
				    </tr>
				  </thead>
				  <tbody>
				  {
					  this.state.bookingDetails.length === 0 ?
					    <tr align="center">
					    	<td colSpan="7">No bookingDetails available</td>
					    </tr> :
					    	this.state.bookingDetails.map((bookingDetails) =>
					    	<tr align="center" key={bookingDetails.bookingId}>
						    	<td>{bookingDetails.trainId}</td>
						    	<td>{bookingDetails.trainName}</td>
						    	<td>{bookingDetails.src}</td>
						    	<td>{bookingDetails.dest}</td>
						    	<td>{bookingDetails.seatsReserved}</td>
						    	<td>{bookingDetails.pnr}</td>
						    	<td>{bookingDetails.date}</td>
						    	<td>{bookingDetails.status}</td>
						    </tr> 
					    	)
				  }
				  </tbody>
				</Table>
				</Card.Body>
			</Card>
			</div>
		);
	}
}