import React from 'react';
import './App.css';

import {Container, Row ,Col} from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import userHome from './components/user/userHome';
import adminHome from './components/admin/adminHome';
import userLogin from './components/user/userLogin';
import Register from './components/user/Register';
import adminLogin from './components/admin/adminLogin';

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
					<Route path="/adminHome" exact component={adminHome}/>
					<Route path="/userHome" exact component={userHome}/>
    			</Col>
    		</Row>
    	</Container>
    </Router>
  );
}

export default App;
