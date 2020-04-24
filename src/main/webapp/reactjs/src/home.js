import React from 'react';
import './App.css';

import {Container, Row ,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Redirect} from 'react-router';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

import Train from './components/Train';
import TrainList from './components/TrainList';
import Welcome from './components/Welcome';


class home extends React.Component {
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
		    					<Route path="/home" exact component={Welcome}/>
		    					<Route path="/add" exact component={Train}/>
		    					<Route path="/list" exact component={TrainList}/>
		    					<Route path="/edit/:id" exact component={Train}/>
		    				</Switch>
		    			</Col>
		    		</Row>
		    	
		    	</Container>
		    	<Footer/>
		    </Router>
		  );
		}
}

export default home;