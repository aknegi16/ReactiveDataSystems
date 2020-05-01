import React from 'react';

import {Container, Row ,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Redirect} from 'react-router';

import NavigationBar from './adminNavigationBar';
import Train from '../train/Train';
import TrainList from '../train/TrainList';

import adminWelcome from './adminWelcome';
import adminCreateRule from './adminCreateRule';
import adminRuleList from './adminRuleList';

class adminHome extends React.Component {
		render()
		{
		  const marginTop = {
					marginTop: "40px"
			};
		  
		  if(localStorage.getItem('loggedin')==='false')
		  {
			  alert("you have to log in");
			  return <Redirect to="/"/> ;
		  } 
		  return (
		    <Router>
		    	<NavigationBar history={this.props.history}/>
		    	<Container>
		    		<Row>
		    			<Col lg={12} style={marginTop}>
		    				<Switch>
		    					<Route path="/adminHome" exact component={adminWelcome}/>
		    					<Route path="/add" exact component={Train}/>
		    					<Route path="/list" exact component={TrainList}/>
		    					<Route path="/edit/:id" exact component={Train}/>
		    					<Route path="/adminCreateRule" exact component={adminCreateRule}/>
		    					<Route path="/adminRuleList" exact component={adminRuleList}/>
		    					<Route path="/editRule/:id" exact component={adminCreateRule}/>
		    				</Switch>
		    			</Col>
		    		</Row>
		    	</Container>
		    </Router>
		  );
		}
}

export default adminHome;