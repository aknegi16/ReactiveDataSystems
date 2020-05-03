import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo} from '@fortawesome/free-solid-svg-icons';

import MyToast from '../MyToast';

export default class bookTrain extends React.Component {
	
	initialState = {bookingId:'',trainId:'',trainName:'',userId:'',src:'',dest:'',seatsReserved:'',date:'',pnr:'' };;
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.state.show = false;
		this.bookTrainChange = this.bookTrainChange.bind(this);
		this.submitbookTrain = this.submitbookTrain.bind(this);
	}
	
	submitbookTrain(event) {
		event.preventDefault();
		
		const bookTrain = {
				bookingId: this.state.bookingId,
				trainId: this.state.trainId,
				trainName:this.state.trainName,
				userId: this.state.userId,
				src :this.state.src,
				dest :this.state.dest,
				seatsReserved: this.state.seatsReserved,
				date :this.state.date,
				userId : JSON.parse(localStorage.getItem('usr')),
				pnr : Math.floor(Math.random() * 10000000000)+1
			}
		
		axios.post("http://localhost:8001/rest/bookingDetails", bookTrain)
		.then(response => {
				if (response.data !== null) {
					this.setState({"show":true});
					setTimeout(() => this.setState({"show":false}), 3000);
				} else {
					this.setState({"show":false});	
				}
			});
			this.setState(this.initialState);
		};
	

		resetbookTrain = () => {
			this.setState(() => this.initialState);
		};
		

		bookTrainChange(event) {
			this.setState({
				[event.target.name]:event.target.value
			});
		};
		
	render() {
		return(
				<div>
				<div style={{"display":this.state.show ? "block" : "none"}}>
					<MyToast show={this.state.show} message={"User registered successfully"} type={"success"}/>
				</div>
				<Card className={"border border-dark bg-dark text-white"}>
				<Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Register</Card.Header>
				
				<Form id="FormId" onSubmit={this.submitbookTrain} onReset={this.resetbookTrain}>
				<Card.Body>
					<Form.Row>
				  	   <Form.Group as={Col} controlId="formGrid">
					  		<Form.Label>Booking Id</Form.Label>
						    <Form.Control required autoComplete="off"
						    	type="text" name="bookingId"
						    	value={this.state.bookingId}
						    	onChange={this.bookTrainChange}
						    	placeholder="Enter booking ID" 
						    	className={"bg-dark text-white"}/>
					  </Form.Group>
					</Form.Row>
					<Form.Row>
					  	<Form.Group as={Col} controlId="formGrid">
					  		<Form.Label>Train Id</Form.Label>
						    <Form.Control required autoComplete="off"
						    	type="text" name="trainId"
						    	value={this.state.trainId}
						    	onChange={this.bookTrainChange}
						    	placeholder="Enter train ID" 
						    	className={"bg-dark text-white"}/>
						</Form.Group>
						<Form.Group as={Col} controlId="formGrid">
						  		<Form.Label>Train Name</Form.Label>
							    <Form.Control required autoComplete="off"
							    	type="text" name="trainName"
							    	value={this.state.trainName}
							    	onChange={this.bookTrainChange}
							    	placeholder="Enter train name" 
							    	className={"bg-dark text-white"}/>
						</Form.Group>
					</Form.Row>
					
				    <Form.Row>
				  	   <Form.Group as={Col} controlId="formGridsrc">
					  		<Form.Label>Source</Form.Label>
						    <Form.Control required autoComplete="off"
						    	type="text" name="src"
						    	value={this.state.src}
						    	onChange={this.bookTrainChange}
						    	placeholder="Enter src" 
						    	className={"bg-dark text-white"}/>
					  </Form.Group>
					  <Form.Group as={Col} controlId="formGriddest">
					      	<Form.Label>Destination</Form.Label>
					      <Form.Control required autoComplete="off"
					      	type="text" name="dest"
					      	value={this.state.dest}
					    	onChange={this.bookTrainChange}
					      	placeholder="Enter dest"
					      	className={"bg-dark text-white"}/>
					   </Form.Group>
				  	</Form.Row>
				  	<Form.Row>
				  	   <Form.Group as={Col} controlId="formGridsrc">
					  		<Form.Label>Number of seats to reserve</Form.Label>
						    <Form.Control required autoComplete="off"
						    	type="text" name="seatsReserved"
						    	value={this.state.seatsReserved}
						    	onChange={this.bookTrainChange}
						    	placeholder="Enter number of seats to reserve" 
						    	className={"bg-dark text-white"}/>
					  </Form.Group>
					  <Form.Group as={Col} controlId="formGriddest">
					      	<Form.Label>Date & Time (dd.mm.yyyy)</Form.Label>
					      <Form.Control required autoComplete="off"
					      	type="text" name="date"
					      	value={this.state.date}
					    	onChange={this.bookTrainChange}
					      	placeholder="Enter date of booking"
					      	className={"bg-dark text-white"}/>
					   </Form.Group>
				  	</Form.Row>
				</Card.Body>
				<Card.Footer style={{"textAlign":"right"}}>
				 <Button size="sm" variant="success" type="submit">
				    <FontAwesomeIcon icon={faSave}/> Submit
				  </Button>
				    {' '}
				    <Button size="sm" variant="info" type="reset">
				    <FontAwesomeIcon icon={faUndo}/> Reset
				  </Button>
				</Card.Footer>
				</Form>
				</Card>
				
			</div>
			
			);
		}
	}