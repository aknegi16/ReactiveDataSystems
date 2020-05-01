import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faPlusSquare} from '@fortawesome/free-solid-svg-icons';

import MyToast from '../MyToast';

export default class Register extends React.Component {
	
	initialState = {id:'', age:'', mail:'', mobile_no:'', name:'', password:'', sex:''};
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onChange(event) {
		this.setState({
			[event.target.name]:event.target.value
		});
	}
	
	onSubmit(event) {
		event.preventDefault();
		
		const user = {
			id: this.state.id,
			age: this.state.age,
			mail: this.state.mail,
			mobile_no: this.state.mobile_no,
			name:this.state.name,
			password: this.state.password,
			sex: this.state.sex
		}
		
		axios.get("http://localhost:8001/rest/users/"+user.id)
		.then(response => {
			if(response.data.id===user.id)
			{
				alert("Sorry, User Id already exists");
				this.reset();
				return this.props.history.push('/register');
			}
		}).catch(error => {	
		axios.post("http://localhost:8001/rest/users", user)
		.then(response => {
				this.setState({"show":true, "method":"post"});
				setTimeout(() => this.setState({"show":false}), 3000);
				this.props.history.push('/register');
		}).catch(error => alert("please enter valid inputs"+error));
		});
		
	}
	
	reset = () => {
		this.setState(() => this.initialState);
	}
	login = () => {
		this.props.history.push('/');
	}
	
	render() {
		
		return(
		<div>
			<div style={{"display":this.state.show ? "block" : "none"}}>
				<MyToast show={this.state.show} message={"User registered successfully"} type={"success"}/>
			</div>
			<Card className={"border border-dark bg-dark text-white"}>
			<Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Register</Card.Header>
			
			<Form id="FormId" onSubmit={this.onSubmit} onReset={this.reset}>
			<Card.Body>
				<Form.Row>
			  	   <Form.Group as={Col} controlId="formGrid">
				  		<Form.Label>User Id</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="text" name="id"
					    	value={this.state.id}
					    	onChange={this.onChange}
					    	placeholder="Enter user ID" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				</Form.Row>
				<Form.Row>
				  	<Form.Group as={Col} controlId="formGrid">
				  		<Form.Label>User Name</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="text" name="name"
					    	value={this.state.name}
					    	onChange={this.onChange}
					    	placeholder="Enter user name" 
					    	className={"bg-dark text-white"}/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGrid">
					  		<Form.Label>Password</Form.Label>
						    <Form.Control required autoComplete="off"
						    	type="password" name="password"
						    	value={this.state.password}
						    	onChange={this.onChange}
						    	placeholder="Enter password" 
						    	className={"bg-dark text-white"}/>
					</Form.Group>
				</Form.Row>
				<Form.Row>
				  	<Form.Group as={Col} controlId="formGrid">
				      	<Form.Label>Mail ID</Form.Label>
						 <Form.Control required autoComplete="off"
						      	type="email" name="mail"
						      	value={this.state.mail}
						    	onChange={this.onChange}
						      	placeholder="Enter mail id"
						      	className={"bg-dark text-white"}/>
				   </Form.Group>
				    <Form.Group as={Col} controlId="formGrid">
			  			<Form.Label>Mobile Number</Form.Label>
			  			<Form.Control required autoComplete="off"
						    	type="text" name="mobile_no"
						    	value={this.state.mobile_no}
						    	onChange={this.onChange}
						    	placeholder="Enter mobile number" 
						    	className={"bg-dark text-white"}/>
			  		</Form.Group>
			    </Form.Row>
			    <Form.Row>
			    	<Form.Group as={Col} controlId="formGrid">
			      	<Form.Label>Age</Form.Label>
			      		<Form.Control required autoComplete="off"
						      	type="text" name="age"
						      	value={this.state.age}
						    	onChange={this.onChange}
						      	placeholder="Enter your age"
						      	className={"bg-dark text-white"}/>
			      	 </Form.Group>
			      	<Form.Group as={Col} controlId="formGrid">
			      		<Form.Label>Sex</Form.Label>
			      		<Form.Control required autoComplete="off"
						    	type="text" name="sex"
						    	value={this.state.sex}
						    	onChange={this.onChange}
						    	placeholder="Gender" 
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
			    <br/><br/>
			    <p> Already a user?{' '}
			    		<Button size="sm" variant="secondary" onClick={this.login}>Login</Button>
			    </p>
			</Card.Footer>
			</Form>
			</Card>
			
		</div>
		
		);
	}
}