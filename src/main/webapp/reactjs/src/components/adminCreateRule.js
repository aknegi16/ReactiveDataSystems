import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faEdit} from '@fortawesome/free-solid-svg-icons';

export default class adminCreateRule extends React.Component {
	initialState = {
		rule_description:'',
		table:'',
		event:{
			event_type:'',
			conditions: {
				condition:[
					{
						attribute:'',
						operator:'',
						value:''
					}
				],
				conjunction:''
			}
		},
		action:{
			action_type:'',
			query:'',
			method_path:''
		},
		rule_type:'',
		rule_status:''
	};
	
	
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.ruleChange = this.ruleChange.bind(this);
		this.submitRule = this.submitRule.bind(this);
	}
	
	submitRule(event) {
		event.preventDefault();
		const rule_description = this.state.rule_description;
		const table = this.state.table;
		const condition = [{
			attribute: this.state.attribute,
			operator: this.state.operator,
			value: this.state.value
		}];
		const conjunction = this.state.conjunction;
		const conditions = {
				condition: condition,
				conjunction: conjunction
			}
		const event_type = this.state.event_type;
		const event1 = {
			event_type: event_type,
			conditions: conditions
		};
		
		const action_type = this.state.action_type;
		const query = this.state.query;
		const method_path = this.state.method_path;
		
		const action = {
			action_type: action_type,
			query: query,
			method_path: method_path
		};
		
		const rule_type= this.state.rule_type;
		const rule_status = this.state.rule_status;
		
		
		const rule = {
			rule_description: rule_description,
			table: table,
			event: event1,
			action: action,
			rule_type: rule_type,
			rule_status: rule_status
		};
		
		axios.post("http://localhost:8001/rest/rules", rule)
		.then(response => {
			if (response.data) {
				alert("Rule added into list");
			} else {
				alert("Response was false, so kuch gadbad hai, dekhle backend me");
			}
		});
		this.setState(this.initialState);
	};
	
	ruleChange(e) {
		this.setState({
			[e.target.name]:e.target.value
		});
	};
	
	render() {
		const rule_description = this.state.rule_description;
		const table = this.state.table;
		const event_type = this.state.event_type;
		const attribute = this.state.attribute;
		const operator = this.state.operator;
		const value = this.state.value;
		const conjunction = this.state.conjunction;
		const action_type = this.state.action_type;
		const query = this.state.query;
		const method_path = this.state.method_path;
		const rule_type = this.state.rule_type;
		const rule_status = this.state.rule_status;
		
		return(
		
		<Card className={"border border-dark bg-dark text-white"}>
			<Card.Header><FontAwesomeIcon icon={faEdit}/> Rule Creation</Card.Header>
			<Form id="createRuleFormId" onSubmit={this.submitRule}>
			<Card.Body>
				<Form.Row>
			  	   <Form.Group as={Col} controlId="rule_description">
				  		<Form.Label>Rule Description</Form.Label>
					    <Form.Control autoComplete="off"
					    	type="text" name="rule_description"
					    	value={rule_description}
					    	defaultValue=""
					    	onChange={this.ruleChange}
					    	placeholder="Enter Rule Description" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				</Form.Row>
				
				<Form.Row>
					<Form.Group as={Col} controlId="table">
				  		<Form.Label>Table</Form.Label>
					    <Form.Control autoComplete="off" required
					    	type="text" name="table"
					    	value={table}
					    	onChange={this.ruleChange}
					    	placeholder="Enter Table Name" 
					    	className={"bg-dark text-white"}/>
					</Form.Group>
					<Form.Group as={Col} controlId="event_type">
			  		<Form.Label>Event Type</Form.Label>
				    <Form.Control autoComplete="off" as="select"
				    	type="text" name="event_type"
				    	value={event_type}
				    	defaultValue=""
				    	onChange={this.ruleChange}
				    	placeholder="Enter Event Type" 
				    	className={"bg-dark text-white"}>
				    	<option>Choose</option>
				    	<option>select</option>
				    	<option>insert</option>
				    	<option>update</option>
				    </Form.Control>
					</Form.Group>
			  	</Form.Row>
				
			  	<Form.Row>
				<Form.Group as={Col} controlId="attribute">
			  		<Form.Label>Attribute</Form.Label>
				    <Form.Control autoComplete="off"
				    	type="text" name="attribute"
				    	value={attribute}
				    	defaultValue=""
				    	onChange={this.ruleChange}
				    	placeholder="Enter Attribute" 
				    	className={"bg-dark text-white"}/>
				</Form.Group>
			    <Form.Group as={Col} controlId="operator">
		  		<Form.Label>Operator</Form.Label>
			    <Form.Control autoComplete="off" as="select"
			    	type="text" name="operator"
			    	value={operator}
			    	defaultValue=""
			    	onChange={this.ruleChange}
			    	className={"bg-dark text-white"}>
				    <option>Choose</option>
				    <option>==</option>
				    <option>!=</option>
				    <option>&lt;</option>
				    <option>&lt;=</option>
				    <option>&gt;</option>
				    <option>&gt;=</option>
			    </Form.Control>
				</Form.Group>
				<Form.Group as={Col} controlId="value">
		  		<Form.Label>Value</Form.Label>
			    <Form.Control autoComplete="off"
			    	type="text" name="value"
			    	value={value}
			    	defaultValue=""
			    	onChange={this.ruleChange}
			    	placeholder="Enter value" 
			    	className={"bg-dark text-white"}/>
				</Form.Group>
			    <Form.Group as={Col} controlId="conjunction">
		  		<Form.Label>Conjunction</Form.Label>
			    <Form.Control autoComplete="off" as="select"
			    	type="text" name="conjunction"
			    	value={conjunction}
			    	defaultValue="none"
			    	onChange={this.ruleChange}
			    	className={"bg-dark text-white"}>
				    <option>Choose</option>
				    <option>or</option>
				    <option>and</option>
				</Form.Control>
				</Form.Group>
				</Form.Row>
				
				<Form.Row>
				<Form.Group as={Col} controlId="action_type">
			  		<Form.Label>Action Type</Form.Label>
				    <Form.Control autoComplete="off" as="select"
				    	type="text" name="action_type"
				    	value={action_type}
				    	defaultValue="query"
				    	onChange={this.ruleChange}
				    	className={"bg-dark text-white"}>
				    <option>Choose</option>
				    <option>query</option>
				    <option>method</option>
				    </Form.Control>
				</Form.Group>
				<Form.Group as={Col} controlId="rule_type">
		  		<Form.Label>Rule Type</Form.Label>
			    <Form.Control autoComplete="off" as="select"
			    	type="text" name="rule_type"
			    	value={rule_type}
			    	defaultValue="defered"
			    	onChange={this.ruleChange}
			    	className={"bg-dark text-white"}>
			    	<option>Choose</option>
				    <option>immediate</option>
				    <option>defered</option>
			    </Form.Control>
			    </Form.Group>
				</Form.Row>
				
				<Form.Row>
				<Form.Group as={Col} controlId="query">
			  		<Form.Label>Query</Form.Label>
				    <Form.Control autoComplete="off"
				    	type="text" name="query"
				    	value={query}
				    	defaultValue=""
				    	onChange={this.ruleChange}
				    	placeholder="Enter query in SQL, if you selected action type as so"
				    	className={"bg-dark text-white"}/>
				</Form.Group>
				</Form.Row>
				<Form.Row>
				<Form.Group as={Col} controlId="method_path">
			  		<Form.Label>Method Path</Form.Label>
				    <Form.Control autoComplete="off"
				    	type="text" name="method_path"
				    	value={method_path}
				    	defaultValue="none"
				    	onChange={this.ruleChange}
				    	placeholder="Enter method path, if you selected action type as so" 
				    	className={"bg-dark text-white"}/>
				</Form.Group>
				</Form.Row>
				
				<Form.Row>
				<Form.Group as={Col} controlId="rule_status">
			  		<Form.Label>Rule Status</Form.Label>
				    <Form.Control autoComplete="off"
				    	type="text" name="rule_status"
				    	value={rule_status}
				    	defaultValue="active"
				    	onChange={this.ruleChange}
				    	placeholder="Enter rule_status" 
				    	className={"bg-dark text-white"}/>
				</Form.Group>
				</Form.Row>
			</Card.Body>
			<Card.Footer style={{"textAlign":"right"}}>
				<Button size="sm" variant="success" type="submit">
			    <FontAwesomeIcon icon={faSave}/> Create Rule
			  </Button>
			</Card.Footer> 
			</Form>
		</Card>
		);
	}
}