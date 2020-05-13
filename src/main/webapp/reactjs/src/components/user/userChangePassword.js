import React from 'react';
import {Button, Card, Form, Col} from 'react-bootstrap';

import axios from 'axios';
export default class userChangePassword extends React.Component {
	initialState = {
			oldPassword: '',
			newPassword: '',
			newPasswordRepeat: ''
	};
	
	constructor (props) {
		super(props);
		this.state = this.initialState;
		this.itemChange = this.itemChange.bind(this);
		this.changePassword = this.changePassword.bind(this);
	}
	
	changePassword = (event) => {
		event.preventDefault();
		if (this.state.newPassword != this.state.newPasswordRepeat) {
			alert("Entered new passwords are not equal to each other");
		} else {
			let userId = localStorage.getItem('usr');
			axios.get("http://localhost:8001/rest/users/"+userId)
			.then(response => {
				if (this.state.oldPassword != response.data.password) {
					alert("Enter correct current password");
				} else {
					let user = response.data;
					user.password = this.state.newPassword;
					axios.put("http://localhost:8001/rest/users/"+userId, user)
					.then(response => {
						alert("Update success");
						this.props.history.push("/userHome");
					}).catch(error => {
						alert("update failure");
					});
				}
			});
		}
	}
	itemChange(e) {
		this.setState({
			[e.target.name]:e.target.value
		});
	};
	render() {
		const oldPassword = this.state.oldPassword;
		const newPassword = this.state.newPassword;
		const newPasswordRepeat = this.state.newPasswordRepeat;
		return (
				<div>
				<center>
			<Card style={{ width: '18rem' }} className={"border border-dark bg-dark text-white"}>
			<Card.Header></Card.Header>
			<Form id="changePasswordForm" onSubmit={this.changePassword}>
			<Card.Body>
				<Form.Row>
			  	   <Form.Group as={Col} controlId="oldPassword">
				  		<Form.Label>Old Password</Form.Label>
					    <Form.Control autoComplete="off" required
					    	type="password" name="oldPassword"
					    	value={oldPassword}
					    	onChange={this.itemChange}
					    	placeholder="Enter Old Password" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				</Form.Row>
				<Form.Row>
			  	   <Form.Group as={Col} controlId="newPassword">
				  		<Form.Label>New Password</Form.Label>
					    <Form.Control autoComplete="off" required
					    	type="password" name="newPassword"
					    	value={newPassword}
					    	onChange={this.itemChange}
					    	placeholder="Enter new Password" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				</Form.Row>
				<Form.Row>
			  	   <Form.Group as={Col} controlId="newPasswordRepeat">
				  		<Form.Label>New Password again</Form.Label>
					    <Form.Control autoComplete="off" required
					    	type="password" name="newPasswordRepeat"
					    	value={newPasswordRepeat}
					    	onChange={this.itemChange}
					    	placeholder="Enter Old Password" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				</Form.Row>
			</Card.Body>
			<Card.Footer>
				<Button type="submit">Change Password</Button>
			</Card.Footer>
			</Form>
			</Card>
			</center>
			</div>
		);
	}
}