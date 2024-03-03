import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/signup", {
        name: username,
        email,
        password
      });
      
      alert(res.data.message);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     <h2 className="text-center mb-4" style={{position:"relative",top:"30px"}}>Register</h2>
    <Container style={{position:'absolute',left:"40%"}}>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
     
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email_Address</Form.Label>
              <Form.Control
                type="email"
                style={{width:"15vw"}}
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                style={{width:"15vw"}}
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Register;
