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

function App() {
	const marginTop = {
			marginTop: "20px"
	};
  return (
    <Router>
    	<Container>
    		<Row>
    			<Col lg={12} style={marginTop}>
    				<Switch>
    					<Route path="/" exact component={Login}/>
    					<Route path="/register" exact component={Register}/>
    					<Route path="/home" exact component={home}/>
    					<Route path="/add" exact component={Train}/>
    					<Route path="/list" exact component={TrainList}/>"
    					<Route path="/edit/:id" exact component={Train}/>
    				</Switch>
    			</Col>
    		</Row>
    	</Container>
    	<Footer/>
    </Router>
  );
}

export default App;
