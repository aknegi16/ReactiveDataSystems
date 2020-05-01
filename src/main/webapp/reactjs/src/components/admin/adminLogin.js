import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo} from '@fortawesome/free-solid-svg-icons';


export default class adminLogin extends React.Component {
	
	initialState = {id:'',password:''};
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.state.show = false;
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onSubmit(event) {
		event.preventDefault();
		
		const admin = {
			id: this.state.id,
			password:this.state.password,
		}
		
		axios.get("http://localhost:8001/rest/admins/"+admin.id)
		.then(response => {
			if(response.data.id===admin.id && response.data.password===admin.password)
			{
				localStorage.setItem('loggedin',true);
				this.props.history.push('/adminHome');
			} 
			else{
				alert("please fill valid details");
				this.reset();
				this.props.history.push('/');
		}
		}).catch(error => {alert("please fill valid details");
				this.reset();});
	}
	
	reset = () => {
		this.setState(() => this.initialState);
	}

	back = () => {
		this.props.history.push('/');
	}
	
	onChange(event) {
		this.setState({
			[event.target.name]:event.target.value
		});
	}
	render() {
		const {id, password} = this.state;
		
		return(
		<div>
			<Card className={"border border-dark bg-dark text-white"}>
			<Card.Header>Admin Login </Card.Header>
			
			<Form id="FormId" onSubmit={this.onSubmit} onReset={this.reset}>
			<Card.Body>
			  	<Form.Row>
				  	<Form.Group as={Col} controlId="formGrid">
				  		<Form.Label>Admin Id</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="text" name="id"
					    	value={id}
					    	onChange={this.onChange}
					    	placeholder="Enter admin id" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				  <Form.Group as={Col} controlId="formGrid">
				      	<Form.Label>Password</Form.Label>
				      <Form.Control required autoComplete="off"
				      	type="password" name="password"
				      	value={password}
				    	onChange={this.onChange}
				      	placeholder="Enter password"
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
			    {' '}
			    <Button size="sm" variant="secondary" onClick={this.back}>Back
			    </Button>
			    
			</Card.Footer>
			</Form>
			</Card>
			
		</div>
		);
	}
}