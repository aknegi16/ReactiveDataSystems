import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';

import MyToast from './MyToast';

export default class Train extends React.Component {
	
	initialState = {trainId:'',trainName:'',numberOfCompartments:'',bookedSeats:'',remainingSeats:'', date:'',src:'',dest:''};;
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
					numberOfCompartment: response.data.numberOfCompartment,
					bookedSeats :response.data.bookedSeats,
					remainingSeats:response.data.remainingSeats,
					src :response.data.src,
					date :response.data.date,
					dest :response.data.dest,
			
					
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
			numberOfCompartment: this.state.numberOfCompartment,
			bookedSeats:this.state.bookedSeats,
			remainingSeats:this.state.remainingSeats,
			src :this.state.src,
			date :this.state.date,
			dest :this.state.dest
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
				numberOfCompartment: this.state.numberOfCompartment,
				bookedSeats:this.state.bookedSeats,
				remainingSeats:this.state.remainingSeats,
				src :this.state.src,
				date :this.state.date,
				dest :this.state.dest
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
		const {trainId,trainName,numberOfCompartment,bookedSeats,remainingSeats,src,date,dest} = this.state;
		
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
				  <Form.Group as={Col} controlId="formGridNumberOfCompartment">
				      	<Form.Label>Number of Compartment</Form.Label>
				      <Form.Control required autoComplete="off"
				      	type="text" name="numberOfCompartment"
				      	value={numberOfCompartment}
				    	onChange={this.trainChange}
				      	placeholder="Enter number of Compartments"
				      	className={"bg-dark text-white"}/>
				   </Form.Group>
			  	</Form.Row>
				<Form.Row>
			  	   <Form.Group as={Col} controlId="formGridsrc">
				  		<Form.Label>Src</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="text" name="src"
					    	value={src}
					    	onChange={this.trainChange}
					    	placeholder="Enter src" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				  <Form.Group as={Col} controlId="formGriddest">
				      	<Form.Label>Dest</Form.Label>
				      <Form.Control required autoComplete="off"
				      	type="text" name="dest"
				      	value={dest}
				    	onChange={this.trainChange}
				      	placeholder="Enter dest"
				      	className={"bg-dark text-white"}/>
				   </Form.Group>
			  	</Form.Row>
			  	
			  	
			  	<Form.Row>
			  	   <Form.Group as={Col} controlId="formGridbookedSeats">
				  		<Form.Label>Booked Seats</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="text" name="bookedSeats"
					    	value={bookedSeats}
					    	onChange={this.trainChange}
					    	placeholder="Enter Booked Seats" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				  <Form.Group as={Col} controlId="formGridremainingSeats">
				      	<Form.Label>Remaining Seats</Form.Label>
				      <Form.Control required autoComplete="off"
				      	type="text" name="remainingSeats"
				      	value={remainingSeats}
				    	onChange={this.trainChange}
				      	placeholder="Enter Remaining Seats"
				      	className={"bg-dark text-white"}/>
				   </Form.Group>
			  	</Form.Row>
			  	<Form.Row>
			  	   
				  <Form.Group as={Col} controlId="formGriddate">
				      	<Form.Label>Date & Time (dd:mm::yyyy hh:mm:ss)</Form.Label>
				      <Form.Control required autoComplete="off"
				      	type="text" name="date"
				      	value={date}
				    	onChange={this.trainChange}
				      	placeholder="Enter date and time"
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