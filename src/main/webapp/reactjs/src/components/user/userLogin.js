import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo} from '@fortawesome/free-solid-svg-icons';

import MyToast from '../MyToast';

export default class userLogin extends React.Component {
	
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
		
		const user = {
			id: this.state.id,
			password:this.state.password,
		}
		
		axios.get("http://localhost:8001/rest/users/"+user.id)
		.then(response => {
			if(response.data.id===user.id && response.data.password===user.password)
			{
				localStorage.setItem('loggedin',true);
				localStorage.setItem('usr',user.id);
				this.props.history.push('/userHome');
			} 
			else{
				alert("please fill valid details");
				this.reset();
				this.props.history.push('/');
		}
		}).catch(error => {alert("please fill valid details");
				this.reset();});
	}
	
	adminLogin =() =>{
		this.props.history.push('/adminLogin');
	}
	
	register =() =>{
		this.props.history.push('/register');
	}
	
	reset = () => {
		this.setState(() => this.initialState);
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
			<div style={{"display":this.state.show ? "block" : "none"}}>
				<MyToast children={{show: this.state.show, message:"User saved successfully"}}/>
			</div>
			<Card className={"border border-dark bg-dark text-white"}>
			<Card.Header>User Login</Card.Header>
			
			<Form id="FormId" onSubmit={this.onSubmit} onReset={this.reset}>
			<Card.Body>
			  	<Form.Row>
				  	<Form.Group as={Col} controlId="formGrid">
				  		<Form.Label>User Id</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="text" name="id"
					    	value={id}
					    	onChange={this.onChange}
					    	placeholder="Enter user id" 
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
			<Button size="sm" variant="secondary" onClick={this.adminLogin}>Admin Login</Button>{' '}
			 <Button size="sm" variant="success" type="submit">
			    <FontAwesomeIcon icon={faSave}/> Submit
			  </Button>
			    {' '}
			    <Button size="sm" variant="info" type="reset">
			    <FontAwesomeIcon icon={faUndo}/> Reset
			  </Button>
			    
			    <br/><br/>
			    <p> Not a user? {' '}
			    		<Button size="sm" variant="secondary" onClick={this.register}>Register</Button>
			    </p>
			</Card.Footer>
			</Form>
			</Card>
			
		</div>
		);
	}
}