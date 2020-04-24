import React from 'react';
import './App.css';

import {Container, Row ,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import home from './home';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';

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
    			</Col>
    		</Row>
    	</Container>
    	<Footer/>
    </Router>
  );
}

export default App;
