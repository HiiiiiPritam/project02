import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate= useNavigate();

  const handleLogin =async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password
      });
      alert(res.data.message);
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("username", res.data.name)
      localStorage.setItem("userID", res.data.userID)
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <> <h2 className="text-center mb-4" style={{position:"relative",top:"30px"}}>Login</h2>
  
    <Container  style={{position:'absolute',left:"40%"}}>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
         
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                style={{width:"15vw"}}
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                style={{width:"15vw"}}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>  </>
  );
};

export default Login;
