import React from 'react';
import axios from 'axios';

import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';


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
					trains: this.state.trains.filter(train => train.trainId != trainId)
				});
			} else {
				this.setState({"show":false});	
			}
		});
	};
	render() {
		return(
			<div>
			<div style={{"display":this.state.show ? "block" : "none"}}>
				<MyToast children={
						{show: this.state.show,
						message:"Train deleted successfully",
						type:"danger"}
						}/>
				}
			</div>
			<Card className={"border border-dark bg-dark text-white"}>
				<Card.Header><FontAwesomeIcon icon={faList}/> Train List</Card.Header>
				<Card.Body>
				<p>Lets assume 1 bogie has 10 seats. If on query any train has less than 3 seats, one more bogie is added</p>
				<p>Goal: To implement above feature</p>
				<Table striped bordered hover variant="dark">
				  <thead>
				    <tr align="center">
				      <th>Train Name</th>
				      <th>Number Bogies</th>
				      <th>Remaining Seats</th>
				      <th>On Time(Yes/No)</th>
				      <th>Actions</th>
				    </tr>
				  </thead>
				  <tbody>
				  {
					  this.state.trains.length === 0 ?
					    <tr align="center">
					    	<td colSpan="5">No trains available</td>
					    </tr> :
					    	this.state.trains.map((train) =>
					    	<tr align="center" key={train.trainId}>
						    	<td>{train.trainName}</td>
						    	<td>{train.numberOfBogies}</td>
						    	<td>{train.remainingSeats}</td>
						    	<td>{train.onTime}</td>
						    	<td>
						    		<ButtonGroup>
						    			<Button size='sm' variant="outline-primary"><FontAwesomeIcon icon={faEdit}/></Button>
						    			{' '}
						    			<Button size='sm' variant="outline-danger" onClick={this.deleteTrain.bind(this, train.trainId)}><FontAwesomeIcon icon={faTrash}/></Button>
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