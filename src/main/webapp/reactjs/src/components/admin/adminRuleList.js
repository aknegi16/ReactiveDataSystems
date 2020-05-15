import React from 'react';
import axios from 'axios';

import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faSave} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';

export default class adminRuleList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rules: []
		};
	}
	
	componentDidMount() {
		this.getAllRules();
	}
	
	getAllRules() {
		axios.get("http://localhost:8001/rest/rules")
		.then(response => response.data)
		.then( (data) => {
			this.setState({rules: data});
		});
	}
	
	deleteRule = (ruleId) => {
		axios.delete("http://localhost:8001/rest/rules/"+ruleId)
		.then(response => {
			if (response.data !== null) {
				this.setState({"show":true});
				setTimeout(() => this.setState({"show":false}), 3000);
				this.setState({
					rules: this.state.rules.filter(rule => rule.ruleId !== ruleId)
				});
			} else {
				this.setState({"show":false});	
			}
		});
	}
	
	executeRule = () =>{
		axios.get("http://localhost:8001/rest/rules/execute")
		.then(response => {
			this.setState({"show":true});
			setTimeout(() => this.setState({"show":false}), 3000);
			});
	}
	
	render() {
		return(
			<div>
			<div style={{"display":this.state.show ? "block" : "none"}}>
				<MyToast show={this.state.show} message={"Successfully done"} type={"success"}/>
			</div>
			<div>
			<Card className={"border border-dark bg-dark text-white"}>
				<Card.Header><FontAwesomeIcon icon={faList}/> Rule List</Card.Header>
				<Card.Body>
				
				<Table striped bordered hover variant="dark">
				  <thead>
				    <tr align="center">
				      <th>Rule Description</th>
				      <th>Table</th>
				      <th>Event Type</th>
				      <th>Conditions</th>
				      <th>Query or Method Path</th>
				      <th>Rule Type</th>
				      <th>Rule Status</th>
				      <th>Edit or Delete</th>
				    </tr>
				  </thead>
				  <tbody>
				  {
					  this.state.rules.length === 0 ?
					    <tr align="center">
					    	<td colSpan="9">No Rules available</td>
					    </tr> :
					    	this.state.rules.map((rule) =>
					    	<tr align="center" key={rule.ruleId}>
						    	<td>{rule.rule_description}</td>
						    	<td>{rule.table}</td>
						    	<td>{rule.event.event_type}</td>
						    	<td> {
						    		 rule.event.conditions.condition.map((c,i) =>
						    		 <span key={i}>
						             {c.attribute+" "+c.operator+" "+c.value}<hr/>
						             </span>
						    	
						    	)}</td>
						    	<td>{
						    		rule.action.action_type === 'method' ? <p>{rule.action.method_path}</p>:
						    			<p>{
								    		 rule.action.queries.map((c,i) =>
								    		 <span key={i}>
								             {"Query "+(i+1)+" : "+c.query}<hr/>
								             </span>
								    	
								    	)}</p> 
						    	}</td>
						    	<td>{rule.rule_type}</td>
						    	<td>{rule.rule_status}</td>
						    	<td>
						    		<ButtonGroup>
						    			<Link to={"editRule/"+rule.ruleId} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{' '}
						    			<Button size='sm' variant="outline-danger" onClick={this.deleteRule.bind(this, rule.ruleId)}><FontAwesomeIcon icon={faTrash}/></Button>
						    		</ButtonGroup>
						    	</td>
						    </tr> 
					    	)
				  }
				  </tbody>
				</Table>
				</Card.Body>
				<Card.Footer>
				<Button size='sm' variant="success" onClick={this.executeRule.bind(this)}><FontAwesomeIcon icon={faSave}/>Execute Rules</Button>
				</Card.Footer>
			</Card>
			</div>
			</div>
		);
	}
}