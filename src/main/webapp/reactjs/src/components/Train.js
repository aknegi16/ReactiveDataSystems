import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo} from '@fortawesome/free-solid-svg-icons';

import MyToast from './MyToast';

export default class Train extends React.Component {
	
	initialState = {trainId:'',trainName:'',numberOfBogies:'',remainingSeats:'', onTime:''};;
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.state.show = false;
		this.trainChange = this.trainChange.bind(this);
		this.submitTrain = this.submitTrain.bind(this);
	}
	
	submitTrain(event) {
		//alert('Train Name: '+this.state.trainName+'\nNumber of Bogies: '+this.state.numberOfBogies+'\nSeats remaining: '+this.state.remainingSeats+'\nTrain on time?: '+this.state.onTime);
		event.preventDefault();
		
		const train = {
			trainId: this.state.trainId,
			trainName:this.state.trainName,
			numberOfBogies: this.state.numberOfBogies,
			remainingSeats: this.state.remainingSeats,
			onTime: this.state.onTime	
		}
		
		axios.post("http://localhost:8001/rest/trains", train).
		then(response => {
			if (response.data != null) {
				this.setState({"show":true});
				setTimeout(() => this.setState({"show":false}), 3000);
			} else {
				this.setState({"show":false});	
			}
		});
	}
	
	resetTrain = () => {
		this.setState(() => this.initialState);
	}	
	trainChange(event) {
		this.setState({
			[event.target.name]:event.target.value
		});
	}
	render() {
		const {trainId, trainName, numberOfBogies,remainingSeats, onTime} = this.state;
		
		return(
		<div>
			<div style={{"display":this.state.show ? "block" : "none"}}>
				<MyToast children={{show: this.state.show, message:"Train saved successfully"}}/>
			</div>
			<Card className={"border border-dark bg-dark text-white"}>
			<Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Add Train</Card.Header>
			
			<Form id="trainFormId" onSubmit={this.submitTrain} onReset={this.resetTrain}>
			<Card.Body>
				<Form.Row>
			  	   <Form.Group as={Col} controlId="formGridTrainId">
				  		<Form.Label>Train Name</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="text" name="trainId"
					    	value={trainId}
					    	onChange={this.trainChange}
					    	placeholder="Enter train ID" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				</Form.Row>
			  	<Form.Row>
			  	   <Form.Group as={Col} controlId="formGridTrainName">
				  		<Form.Label>Train Name</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="text" name="trainName"
					    	value={trainName}
					    	onChange={this.trainChange}
					    	placeholder="Enter train name" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				  <Form.Group as={Col} controlId="formGridNumberOfBogies">
				      	<Form.Label>Number of bogies</Form.Label>
				      <Form.Control required autoComplete="off"
				      	type="text" name="numberOfBogies"
				      	value={numberOfBogies}
				    	onChange={this.trainChange}
				      	placeholder="Enter number of bogies"
				      	className={"bg-dark text-white"}/>
				   </Form.Group>
			  	</Form.Row>
			  	<Form.Row>
			  	   <Form.Group as={Col} controlId="formGridRemainingSeats">
				  		<Form.Label>Seats remaining</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="text" name="remainingSeats"
					    	value={remainingSeats}
					    	onChange={this.trainChange}
					    	placeholder="Enter seats remaining" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				  <Form.Group as={Col} controlId="formGridOnTime">
				      	<Form.Label>On Time</Form.Label>
				      <Form.Control required autoComplete="off"
				      	type="text" name="onTime"
				      	value={onTime}
				    	onChange={this.trainChange}
				      	placeholder="Enter Yes or No"
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