import React from 'react';
import axios from 'axios';

import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';


export default class TrainList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			trains: []
		};
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
	deleteTrain = (trainId) => {
		axios.delete("http://localhost:8001/rest/trains/"+trainId)
		.then(response => {
			if (response.data != null) {
				this.setState({"show":true});
				setTimeout(() => this.setState({"show":false}), 3000);
				this.setState({
					trains: this.state.trains.filter(train => train.id !== trainId)
				});
			} else {
				this.setState({"show":false});	
			}
		});
	}
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
				      <th>Number of Compartments</th>
				      <th>src</th>
				      <th>dest</th>
				      <th>Booked Seats</th>
				      <th>Remaining Seats</th>
				      <th>Date & Time</th>
				      <th>Actions</th>
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
						    	<td>{train.numberOfCompartment}</td>
						    	<td>{train.src}</td>
						    	<td>{train.dest}</td>
						    	<td>{train.bookedSeats}</td>
						    	<td>{train.remainingSeats}</td>
						    	<td>{train.date}</td>
						    	<td>
						    		<ButtonGroup>
						    			<Link to={"edit/"+train.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{' '}
						    			<Button size='sm' variant="outline-danger" onClick={this.deleteTrain.bind(this, train.id)}><FontAwesomeIcon icon={faTrash}/></Button>
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