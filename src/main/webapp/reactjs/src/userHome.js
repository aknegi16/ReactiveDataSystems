import React from 'react';
import './App.css';

import {Container, Row ,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Redirect} from 'react-router';

import NavigationBar from './components/userNavigationBar';
import Footer from './components/Footer';

import bookingHistory from './components/bookingHistory';
import bookTrain from './components/bookTrain';
import userWelcome from './components/userWelcome';


class userHome extends React.Component {
		constructor(props)
		{
			super(props);
		}
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
		    					<Route path="/userHome" exact component={userWelcome}/>" 
		    					<Route path="/bookingHistory" exact component={bookingHistory}/>
		    					<Route path="/bookTrain" exact component={bookTrain}/>
		    				</Switch>
		    			</Col>
		    		</Row>
		    	</Container>
		    	<Footer/>
		    </Router>
		  );
		}
}

export default userHome;