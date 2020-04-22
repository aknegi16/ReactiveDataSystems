import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';

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
	componentDidMount() {
		const trainId = +this.props.match.params.id;
		if (trainId) {
			this.findTrainById(trainId);
		}
	};
	
	findTrainById = (trainId) => {
		axios.get("http://localhost:8001/rest/trains/"+trainId)
		.then(response => {
			if (response.data != null) {
				this.setState({
					trainId: response.data.trainId,
					trainName: response.data.trainName,
					numberOfBogies: response.data.numberOfBogies,
					remainingSeats: response.data.remainingSeats,
					onTime: response.data.onTime
				});
			}
		}).catch((error) => {
			console.error("Error - "+error);
		});
	};
	
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
		
		axios.post("http://localhost:8001/rest/trains/", train).
		then(response => {
			if (response.data != null) {
				this.setState({"show":true, "method":"post"});
				setTimeout(() => this.setState({"show":false}), 3000);
			} else {
				this.setState({"show":false});	
			}
		});
		this.setState(this.initialState);
	};
	
	updateTrain = event => {
		event.preventDefault();
		const train = {
				trainId: this.state.trainId,
				trainName:this.state.trainName,
				numberOfBogies: this.state.numberOfBogies,
				remainingSeats: this.state.remainingSeats,
				onTime: this.state.onTime	
			}
		axios.put("http://localhost:8001/rest/trains/"+train.trainId, train).
		then(response => {
			if (response.data != null) {
				this.setState({"show":true, "method":"put"});
				setTimeout(() => this.setState({"show":false}), 3000);
				setTimeout(() => this.trainList(), 3000);
			} else {
				this.setState({"show":false});	
			}
		});
		this.setState(this.initialState);
	};
	
	resetTrain = () => {
		this.setState(() => this.initialState);
	};
	
	trainChange(event) {
		this.setState({
			[event.target.name]:event.target.value
		});
	};
	
	trainList = () => {
		return this.props.history.push("/list");
	};
	render() {
		const {trainId, trainName, numberOfBogies,remainingSeats, onTime} = this.state;
		
		return(
		<div>
			<div style={{"display":this.state.show ? "block" : "none"}}>
				<MyToast show={this.state.show} message={this.state.method === "put" ? "Train updated successfully": "Train saved successfully"} type={"success"}/>
			</div>
			<Card className={"border border-dark bg-dark text-white"}>
			<Card.Header><FontAwesomeIcon icon={this.state.trainId ? faEdit : faPlusSquare}/> {this.state.trainId ? "Update Train" : "Add new Train"}</Card.Header>
			
			<Form id="trainFormId" onReset={this.resetTrain} onSubmit={this.state.trainId ? this.updateTrain : this.submitTrain}>
			<Card.Body>
				<Form.Row>
			  	   <Form.Group as={Col} controlId="formGridTrainId">
				  		<Form.Label>Train Id</Form.Label>
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
			    <FontAwesomeIcon icon={faSave}/> {this.state.trainId ? "Update" : "Save"}
			  </Button>
			    {' '}
			    <Button size="sm" variant="info" type="reset">
			    <FontAwesomeIcon icon={faUndo}/> Reset
			  </Button>
			    {' '}
			    <Button size="sm" variant="info" type="button" onClick={this.trainList.bind()}>
			    <FontAwesomeIcon icon={faList}/> Train List
			  </Button>
			</Card.Footer>
			</Form>
			</Card>
		</div>		
		
		);
	}
}