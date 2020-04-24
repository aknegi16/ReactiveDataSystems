import React from 'react';
import './App.css';

import {Container, Row ,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import home from './home';
import Footer from './components/Footer';
import Train from './components/Train';
import TrainList from './components/TrainList';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';

function App() {
	const marginTop = {
			marginTop: "40px"
	};

  return (
    <Router>
    	<Container>
    		<Row>
    			<Col lg={12} style={marginTop}>
    				
    					<Route path="/" exact component={Login}/>
    					<Route path="/register" exact component={Register}/>
    					<Route exact path="/home" component={home}/>
    					<Route path="/add" exact component={Train}/>
    					<Route path="/welcome" exact component={Welcome}/>
    					<Route path="/list" exact component={TrainList}/>
    					<Route path="/edit/:id" exact component={Train}/>
    			</Col>
    		</Row>
    	</Container>
    	<Footer/>
    </Router>
  );
}

export default App;
