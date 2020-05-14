import React from 'react';
import axios from 'axios';

import {Card, Table, ButtonGroup, Button, Form, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faSave} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';


export default class bookTicket extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			trains: [],
			seatsReserved: '',
			pnr:''
		};
		this.bookTicketChange = this.bookTicketChange.bind(this);
	}
	
	//Pass the train api url here and link the react url in trainController.java
	componentDidMount() {
		this.getAllTrains();
	}
	
	getAllTrains() {
		axios.get("http://localhost:8001/rest/trains")
		.then(response => response.data)
		.then( (data) =>{
			this.setState({trains: data});
		});
	}
	bookTrainTicket = (trainId) => {
		debugger;
		if (this.state.seatsReserved < 1) {
			alert("Seats must be greater than zero");
		} else {
			axios.get("http://localhost:8001/rest/trains/"+trainId)
			.then(response => {
				debugger;
				const bookTrain = {
						bookingId: Math.floor(Math.random() * 10000000000)+1,
						trainId: trainId,
						trainName: response.data.trainName,
						userId: JSON.parse(localStorage.getItem('usr')),
						src : response.data.src,
						dest : response.data.dest,
						seatsReserved: this.state.seatsReserved,
						date : response.data.date,
						pnr : Math.floor(Math.random() * 10000000000)+1
					}
				const train=response.data;
				
				// checking if reserved seats are less than remaining seats
				if(parseInt(train.remainingSeats)<parseInt(this.state.seatsReserved))
					return alert("choose seats less than remaining seats"+train.remainingSeats);
				
				// decrementing the reserved seats from train
				train.bookedSeats=(parseInt(train.bookedSeats)+parseInt(this.state.seatsReserved)).toString();
				
				console.log(train.bookedSeats);
				axios.post("http://localhost:8001/rest/bookingDetails", bookTrain)
				.then( response => {
					axios.put("http://localhost:8001/rest/trains/"+train.id, train)
					.then(response => {
						if (response.data != null) {
							console.log("changed train");
						}
					});
					alert("Booked seats successfully");
					setTimeout(() => this.bookingHistory(), 3000);
				});
				
			}).catch(error => {
				console.log("Couldn't fetch trains :"+error);
			});
		}
	};
	bookingHistory = () => {
		return this.props.history.push("/bookingHistory");
	};
	bookTicketChange(event) {
		event.preventDefault();
		this.setState({
			[event.target.name]:event.target.value
		});
	};
	render() {
		return(
			<div>
			<div style={{"display":this.state.show ? "block" : "none"}}>
				<MyToast show={this.state.show} message={"Train deleted successfully"} type={"danger"}/>
				}
			</div>
			<Card className={"border border-dark bg-dark text-white"}>
				<Card.Header><FontAwesomeIcon icon={faList}/> Train List</Card.Header>
				<Card.Body>
				<Table striped bordered hover variant="dark">
				  <thead>
				    <tr align="center">
				      <th>Train Name</th>
				      <th>Source</th>
				      <th>Destination</th>
				      <th>Remaining Seats</th>
				      <th>Date & Time</th>
				      <th>Number of seats to book</th>
				      <th>Book Ticket</th>
				    </tr>
				  </thead>
				  <tbody>
				  {
					  this.state.trains.length === 0 ?
					    <tr align="center">
					    	<td colSpan="7">No trains available</td>
					    </tr> :
					    	this.state.trains.map((train) =>
					    	<tr align="center" key={train.trainId}>
						    	<td>{train.trainName}</td>
						    	<td>{train.src}</td>
						    	<td>{train.dest}</td>
						    	<td>{train.remainingSeats}</td>
						    	<td>{train.date}</td>
						    	<td>
						    		<Form>
							    	<Form.Control required autoComplete="off"
								    	type="number" name="seatsReserved"
								    	onChange={this.bookTicketChange}
								    	placeholder="Enter number of seats to book" 
								    	className={"bg-dark text-white"}/>
								   </Form>
						    	</td>
						    	<td>
						    		<ButtonGroup>
						    			<Button size='sm' variant="outline-info" onClick={this.bookTrainTicket.bind(this, train.id)}>
						    			<FontAwesomeIcon icon={faSave}/></Button>
						    		</ButtonGroup>
						    	</td>
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