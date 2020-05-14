import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col, DeleteButton} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';

export default class adminCreateRule extends React.Component {
	initialState = {
		rule_description:'',
		table:'',
		event:{
			event_type:'',
			conditions: {
				condition:[],
				conjunction:''
			}
		},
		action: {
			action_type:'',
			queries: [],
			method_path:''
		},
		rule_type:'',
		rule_status:''
	};
	
	
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.state.show = false;
		this.ruleChange = this.ruleChange.bind(this);
		this.submitRule = this.submitRule.bind(this);
		this.addCondition = this.addCondition.bind(this);
		this.addQuery = this.addQuery.bind(this);
	}
	componentDidMount() {
		const ruleId =+this.props.match.params.id;
		if (ruleId) {
			this.findRuleById(ruleId);
		}
	}
	
	findRuleById = (ruleId) => {
		axios.get("http://localhost:8001/rest/rules/"+ruleId)
		.then(response => {
			if (response.data != null) {
				this.setState({
					ruleId: response.data.ruleId,
					rule_description: response.data.rule_description,
					table: response.data.table,
					rule_type: response.data.rule_type,
					rule_status: response.data.rule_status,
					event_type: response.data.event.event_type,
					condition: response.data.event.conditions.condition,
					action_type: response.data.action.action_type,
					method_path: response.data.action.method_path,
					queries: response.data.action.queries
				});
			}
		});
	}
	
	submitRule(event) {
		event.preventDefault();
		const ruleId=Math.random() * 1000000;
		const rule_description = this.state.rule_description;
		const table = this.state.table;
		const conjunction = this.state.conjunction;
		const conditions = {
				condition: this.state.condition,
				conjunction: conjunction
			}
		const event_type = this.state.event_type;
		const event1 = {
			event_type: event_type,
			conditions: conditions
		};
		
		const action_type = this.state.action_type;
		
		const method_path = this.state.method_path;
		
		const action = {
			action_type: action_type,
			queries: this.state.queries,
			method_path: method_path
		};
		
		const rule_type= this.state.rule_type;
		const rule_status = this.state.rule_status;
		
		
		const rule = {
			ruleId: ruleId,
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
				this.setState({"show":true, "method":"post"});
				setTimeout(() => this.setState({"show":false}), 3000);
				setTimeout(() => this.ruleList(), 3000);
			} else {
				this.setState({"show":false});	
			}
		});
		this.setState(this.initialState);
	};
	
	updateRule = event => {
		event.preventDefault();
		const action = {
				action_type: this.state.action_type,
				queries: this.state.queries,
				method_path: this.state.method_path
		}

		const conditions = {
				condition: this.state.condition,
				conjunction: this.state.conjunction
		}
		const event1 = {
				event_type: this.state.event_type,
				conditions: conditions
		}
		const rule = {
				ruleId: this.state.ruleId,
				rule_description:this.state.rule_description,
				rule_status: this.state.rule_status,
				rule_type: this.state.rule_type,
				table: this.state.table,
				action: action,
				event: event1
		}
		axios.put("http://localhost:8001/rest/rules/"+rule.ruleId, rule)
		.then(response => {
			if (response.data !== null) {
				this.setState({"show":true, "method":"put"});
				setTimeout(() => this.setState({"show":false}), 3000);
				setTimeout(() => this.ruleList(), 3000);
			} else {
				this.setState({"show":false});	
			}
		});
		this.setState(this.initialState);
	};
	
	ruleChange(e) {
		this.setState({
			[e.target.name]:e.target.value
		});
	};

	addCondition = () => {
		if (this.attributeTextInput.value.length > 0 && this.valueTextInput.value.length > 0) {
			const cond = {
				attribute: this.attributeTextInput.value,
				operator: this.operatorSelect.value,
				value: this.valueTextInput.value
			};
			const list = this.state.condition || this.state.event.conditions.condition;
			list.push(cond);
			this.setState({condition: list});
		}
	};
	
	addQuery = () => {
		if (this.queryTextInput.value.length > 0) {
			const cond = {
				query: this.queryTextInput.value
			};
			const list = this.state.queries || this.state.action.queries;
			list.push(cond);
			this.setState({queries: list});
		}
	};
	
	deleteCondition = (index) => {
		var condList = this.state.condition;
		condList.splice(index, 1);
	    this.setState({condition: condList});
	};
	
	deleteQuery = (index) => {
		var queryList = this.state.queries;
		queryList.splice(index, 1);
	    this.setState({queries: queryList});
	};
	
	renderConditions = () => {
		const list = this.state.condition || this.state.event.conditions.condition;
		if (this.state.event.conditions.condition) {
			const conditions1 = list.map( (con, i) => (
				<span key={i}>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Attribute</Form.Label><br/>
							<Form.Label>{con.attribute}</Form.Label>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Operator</Form.Label><br/>
							<Form.Label>{con.operator}</Form.Label>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Value</Form.Label><br/>
							<Form.Label>{con.value}</Form.Label>
						</Form.Group>
						<span>
							<Form.Label>Delete</Form.Label><br/>
							<Button size="sm" variant="outline-danger" onClick ={this.deleteCondition.bind(this, i)} index={i}>
								<FontAwesomeIcon icon={faTrash}/>
							</Button>
						</span>
					</Form.Row>
				</span>
			));
			return (
				<div>
					<div>
					<Form.Row>
						<Form.Group as={Col} controlId="attribute">
							<Form.Label>Attribute</Form.Label>
							<Form.Control autoComplete="off"
							ref={(ref) => this.attributeTextInput = ref}
							type="text" name="attribute"
							onChange={this.ruleChange}
							placeholder="Enter Attribute"
							className={"bg-dark text-white"}/>
							</Form.Group>
							<Form.Group as={Col} controlId="operator">
							<Form.Label>Operator</Form.Label>
							<Form.Control autoComplete="off" as="select"
							ref={(ref) => this.operatorSelect = ref}
							type="text" name="operator"
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
							ref={(ref) => this.valueTextInput = ref}
							type="text" name="value"
							onChange={this.ruleChange}
							placeholder="Enter value"
							className={"bg-dark text-white"}/>
						</Form.Group>
						<span>
							<Form.Label>Add</Form.Label><br/>
							<Button size="sm" variant="outline-info" className="btn btn-sm btn-outline-primary"
							onClick={this.addCondition}> <FontAwesomeIcon icon={faPlusSquare}/></Button> {' '}
						</span>
					</Form.Row>
					</div>
					{conditions1}
				</div>
			);
		}
		return;
	}
	
	renderQueries = () => {
		const list = this.state.queries || this.state.action.queries;
		if (this.state.action.queries) {
			const queries1 = list.map( (con, i) => (
				<span key={i}>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Query</Form.Label><br/>
							<Form.Label>{con.query}</Form.Label>
						</Form.Group>
						<span>
							<Form.Label>Delete</Form.Label><br/>
							<Button size="sm" variant="outline-danger" onClick ={this.deleteQuery.bind(this, i)} index={i}>
								<FontAwesomeIcon icon={faTrash}/>
							</Button>
						</span>
					</Form.Row>
				</span>
			));
			return (
				<div>
					<div>
						<Form.Row>
						<Form.Group as={Col} controlId="query">
					  		<Form.Label>Query</Form.Label>
					  		<Form.Control autoComplete="off"
								ref={(ref) => this.queryTextInput = ref}
								type="text" name="query"
								onChange={this.ruleChange}
								placeholder="Enter value"
								className={"bg-dark text-white"}/>
					    </Form.Group>
						<span>
							<Form.Label>Add</Form.Label><br/>
							<Button size="sm" variant="outline-info" className="btn btn-sm btn-outline-primary"
							onClick={this.addQuery}> <FontAwesomeIcon icon={faPlusSquare}/></Button> {' '}
						</span>
						</Form.Row>
					</div>
					{queries1}
				</div>
			);
		}
		return;
	}
	
	resetRule = () => {
		this.setState(() => this.initialState);
	};
	ruleList = () => {
		return this.props.history.push("/adminRuleList");
	};
	render() {
		const rule_description = this.state.rule_description;
		const table = this.state.table;
		const event_type = this.state.event_type;
		const conjunction = this.state.conjunction;
		const action_type = this.state.action_type;
		const method_path = this.state.method_path;
		const rule_type = this.state.rule_type;
		const rule_status = this.state.rule_status;
		
		return(
		<div>
		<div style={{"display":this.state.show ? "block" : "none"}}>
			<MyToast show={this.state.show} message={this.state.method === "put" ? "Rule updated successfully": "Rule saved successfully"} type={"success"}/>
		</div>
		<Card className={"border border-dark bg-dark text-white"}>
			<Card.Header><FontAwesomeIcon icon={this.state.ruleId ? faEdit : faPlusSquare}/> {this.state.ruleId ? "Update Rule" : "Add new Rule"}</Card.Header>
			<Form id="createRuleFormId" onReset={this.resetRule} onSubmit={this.state.ruleId ? this.updateRule : this.submitRule}>
			<Card.Body>
				<Form.Row>
			  	   <Form.Group as={Col} controlId="rule_description">
				  		<Form.Label>Rule Description</Form.Label>
					    <Form.Control autoComplete="off"
					    	type="text" name="rule_description"
					    	value={rule_description}
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
				    	onChange={this.ruleChange}
				    	placeholder="Enter Event Type" 
				    	className={"bg-dark text-white"}>
				    	<option>Choose</option>
				    	<option>select</option>
				    	<option>insert</option>
				    	<option>update</option>
				    </Form.Control>
					</Form.Group>
					<Form.Group as={Col} controlId="conjunction">
					<Form.Label>Condition Conjunction</Form.Label>
				    <Form.Control autoComplete="off" as="select"
				    	type="text" name="conjunction"
				    	value={conjunction}
				    	onChange={this.ruleChange}
				    	className={"bg-dark text-white"}>
					    <option>Choose</option>
					    <option>none</option>
					    <option>or</option>
					    <option>and</option>
					</Form.Control>
					</Form.Group>
				</Form.Row>

			    {this.renderConditions()}

				<Form.Row>
				<Form.Group as={Col} controlId="action_type">
			  		<Form.Label>Action Type</Form.Label>
				    <Form.Control autoComplete="off" as="select"
				    	type="text" name="action_type"
				    	value={action_type}
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
			    	onChange={this.ruleChange}
			    	className={"bg-dark text-white"}>
			    	<option>Choose</option>
				    <option>immediate</option>
				    <option>defered</option>
			    </Form.Control>
			    </Form.Group>
				</Form.Row>
				
				{this.renderQueries()}
				
				<Form.Row>
				<Form.Group as={Col} controlId="method_path">
			  		<Form.Label>Method Path</Form.Label>
				    <Form.Control autoComplete="off"
				    	type="text" name="method_path"
				    	value={method_path}
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
				    	onChange={this.ruleChange}
				    	placeholder="Enter rule_status" 
				    	className={"bg-dark text-white"}/>
				</Form.Group>
				</Form.Row>
			</Card.Body>
			<Card.Footer style={{"textAlign":"right"}}>
			 <Button size="sm" variant="success" type="submit">
			    <FontAwesomeIcon icon={faSave}/> {this.state.ruleId ? "Update" : "Save"}
			  </Button>
			    {' '}
			    <Button size="sm" variant="info" type="reset">
			    <FontAwesomeIcon icon={faUndo}/> Reset
			  </Button>
			    {' '}
			    <Button size="sm" variant="info" type="button" onClick={this.ruleList.bind()}>
			    <FontAwesomeIcon icon={faList}/> Rule List
			  </Button>
			</Card.Footer>
			</Form>
		</Card>
		</div>
		);
	}
}