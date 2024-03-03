import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/category/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setCategories(res.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchAllCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image);

      const res = await axios.post("http://localhost:5000/api/blog/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      alert(res.data.message);
      navigate('/');
    } catch (error) {
      console.log("Error adding blog:", error);
    }
  };

  return (
   <> <h1 className="text-center mb-4">Add Blog</h1>
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
    </Container>
    </>
  );
};

export default AddBlog;
