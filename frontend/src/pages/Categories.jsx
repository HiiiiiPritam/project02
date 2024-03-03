import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddCAtegory= () => {
  const [category, setCategory] = useState('');
  let navigate= useNavigate();
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const res= await axios.post("http://localhost:5000/api/category/add",{
        title:category
      },{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      }
      )
      alert(res.data.message)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     <h1 className="text-center mb-4">Add Category</h1>
    <Container className="mt-5">
 
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="category">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
    </Container></>
  );
};

export default AddCAtegory

