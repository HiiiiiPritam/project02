import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/Home.css'; // Import CSS file for styling
import axios from 'axios';

const MyBlogs = () => {
  const [flag, setFlag]= useState(true)
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  let handelDelete= async (id)=>{
    const res = await axios
    .delete(`http://localhost:5000/api/blog/delete/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then(()=>{
      console.log("deleted");
      setFlag(!flag)
    })
    .catch((err) => console.log(err));
  }
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog/user/${localStorage.getItem("userID")}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(res.data);
        setBlogs(res.data.user.blogs);
        setLoading(false); // Set loading to false after 

      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchBlogs();
  }, [flag]);

  return (
    <>
    <h1 className="text-center mb-4">Your Blogs</h1>
    <Container className="my-5">
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {blogs.map((blog) => (
            <Col key={blog._id}>
              <Card>
                <Card.Img variant="top" src={`http://localhost:5000/${blog.image}`} />
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.description.slice(0, 50)}...</Card.Text>
                  <Link to={`/blog/${blog._id}`}><Button variant="primary">Read More</Button></Link>
                  <Link to={`/edit/${blog._id}`}><Button variant="primary" style={{backgroundColor:"green"}}>Edit</Button></Link>
                    <Button variant="primary" onClick={()=>{handelDelete(blog._id)}} style={{backgroundColor:"red"}}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
    </>
  );
};

export default MyBlogs;
