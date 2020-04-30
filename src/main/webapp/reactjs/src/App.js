import React from 'react';
import './App.css';

import {Container, Row ,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import userHome from './userHome';
import adminHome from './adminHome';
import userLogin from './components/userLogin';
import Register from './components/Register';
import adminLogin from './components/adminLogin';

function App() {
	const marginTop = {
			marginTop: "40px"
	};

  return (
    <Router>
    	<Container>
    		<Row>
    			<Col lg={12} style={marginTop}>
					<Route path="/" exact component={userLogin}/>
					<Route path="/register" exact component={Register}/>
					<Route path="/adminLogin" exact component={adminLogin}/>
					<Route exact path="/adminHome" exact component={adminHome}/>
					<Route path="/userHome" exact component={userHome}/>
    			</Col>
    		</Row>
    	</Container>
    </Router>
  );
}

export default App;
