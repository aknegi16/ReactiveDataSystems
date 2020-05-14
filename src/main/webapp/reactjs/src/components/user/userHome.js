import React from 'react';
import '../../App.css';

import {Container, Row ,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Redirect} from 'react-router';

import NavigationBar from './userNavigationBar';
import Footer from '../Footer';

import bookingHistory from '../train/bookingHistory';
import bookTicket from '../train/bookTicket';
import userWelcome from './userWelcome';
import userChangePassword from './userChangePassword';

class userHome extends React.Component {
	render() {
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
		    					<Route path="/userHome" exact component={userWelcome}/> 
		    					<Route path="/bookingHistory" exact component={bookingHistory}/>
		    					<Route path="/bookTicket" exact component={bookTicket}/>
		    					<Route path="/userChangePassword" exact component={userChangePassword}/>
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