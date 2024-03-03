import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryID, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const { title, description, category } = response.data.blog;
        setTitle(title);
        setDescription(description);
        setCategory(category._id);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", categoryID);
      formData.append("image", image);

      const response = await axios.put(`http://localhost:5000/api/blog/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <>
    <h1 className="text-center mb-4">Edit Blog</h1>
    <Container className="mt-5">
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
  as="select"
  value={categoryID}
  onChange={(e) => {
    setCategory(e.target.value);
    console.log(e.target.value); // Corrected line
  }}
  required
>

            <option value="" disabled>Select category</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>{item.title}</option>
         
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Blog
        </Button>
      </Form>
    </Container></>
  );
};

export default EditBlog;
