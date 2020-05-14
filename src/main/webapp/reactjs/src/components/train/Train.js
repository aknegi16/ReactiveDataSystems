import React from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';

import MyToast from '../MyToast';

export default class Train extends React.Component {
	
	initialState = {trainId:'',trainName:'',numberOfCompartments:'',bookedSeats:'',remainingSeats:'', date:'' ,src:'',dest:''};;
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
					date :new Date(response.data.date),
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
		if (this.state.src == this.state.dest) {
			alert("Source and destination cant be same");
		} else {
			const train = {
				trainId: this.state.trainId,
				trainName:this.state.trainName,
				numberOfCompartment: this.state.numberOfCompartment,
				bookedSeats:this.state.bookedSeats,
				src :this.state.src,
				date :this.state.date,
				dest :this.state.dest
			}
			
			axios.post("http://localhost:8001/rest/trains/", train)
			.then(response => {
				if (response.data != null) {
					this.setState({"show":true, "method":"post"});
					setTimeout(() => this.setState({"show":false}), 3000);
				} else {
					this.setState({"show":false});	
				}
			});
			this.setState(this.initialState);
		}
	};
	
	updateTrain = event => {
		event.preventDefault();
		if (this.state.src == this.state.dest) {
			alert("Source and destination cant be same");
		} else if (this.state.numberOfCompartment < 1) {
			alert("Atleast keep 1 bogie");
		} else {
			const d = this.state.date;
			const monthNames = ["January", "February", "March", "April", "May", "June",
				  "July", "August", "September", "October", "November", "December"
				];
			const train = {
					trainId: this.state.trainId,
					trainName:this.state.trainName,
					numberOfCompartment: this.state.numberOfCompartment,
					bookedSeats: 0,
					src :this.state.src,
					dest :this.state.dest,
					date : d.getFullYear()+"-"+monthNames[d.getMonth()]+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()
				}
			axios.put("http://localhost:8001/rest/trains/"+train.trainId, train)
			.then(response => {
				if (response.data != null) {
					this.setState({"show":true, "method":"put"});
					setTimeout(() => this.setState({"show":false}), 3000);
					setTimeout(() => this.trainList(), 3000);
				} else {
					this.setState({"show":false});	
				}
			});
			this.setState(this.initialState);
		}
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
	onDateChange = date => this.setState({ date })
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
					    	value={trainId} autofocus
					    	onChange={this.trainChange}
					    	placeholder="Enter train ID" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
			      <Form.Group as={Col} controlId="formGridTrainName">
			  		  <Form.Label>Train Name</Form.Label>
				      <Form.Control required autoComplete="off"
				    	  type="text" name="trainName"
				    	  value={trainName}
					      onChange={this.trainChange}
					      placeholder="Enter train name" 
					      className={"bg-dark text-white"}/>
			    </Form.Group>
				</Form.Row>
				<Form.Row>
			  	   <Form.Group as={Col} controlId="formGridsrc">
				  		<Form.Label>Source</Form.Label>
				  		<Form.Control autoComplete="off" as="select"
							type="text" name="src" required
							onChange={this.trainChange}
				  			value={src}
							className={"bg-dark text-white"}>
							    <option>Choose</option>
							    <option>Bengaluru</option>
							    <option>Hyderabad</option>
							    <option>Mumbai</option>
							    <option>Raipur</option>
							    <option>Delhi</option>
							    <option>Chennai</option>
							    <option>Pune</option>
							</Form.Control>
				  </Form.Group>
				  <Form.Group as={Col} controlId="formGriddest">
				      	<Form.Label>Destination</Form.Label>
				      	<Form.Control autoComplete="off" as="select"
							type="text" name="dest" required
							value={dest}
							onChange={this.trainChange}
							className={"bg-dark text-white"}>
							    <option>Choose</option>
							    <option>Bengaluru</option>
							    <option>Hyderabad</option>
							    <option>Mumbai</option>
							    <option>Raipur</option>
							    <option>Delhi</option>
							    <option>Chennai</option>
							    <option>Pune</option>
							</Form.Control>
				   </Form.Group>
			  	</Form.Row>
			  	<Form.Row>
		
				  <Form.Group as={Col} controlId="formGridNumberOfCompartment">
				      	<Form.Label>Number of Compartment</Form.Label>
				      <Form.Control required autoComplete="off"
				      	type="number" name="numberOfCompartment"
				      	value={numberOfCompartment}
				    	onChange={this.trainChange}
				      	placeholder="Enter number of Compartments"
				      	className={"bg-dark text-white"}/>
				   </Form.Group>
				  <Form.Group as={Col} controlId="formGriddate">
				      	<Form.Label>Date & Time</Form.Label><br/>
				      	<DateTimePicker name="date" minDate={new Date()}
				      		onChange={this.onDateChange}
				            value={this.state.date}
				      		className={"bg-white"}
				      		format={"dd-MM-yyyy hh:mm a"}
				        />
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