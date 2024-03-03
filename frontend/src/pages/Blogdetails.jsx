import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log("Each Blog", res.data);
        setBlog(res.data.blog);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const navigateToHomePage = () => {
    navigate('/');
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }

  return (
    <Container className="mt-5">
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Card style={{ flex: '0 0 auto', width: 'fit-content' }}>
          <Card.Img
            
            variant="top"
            src={`http://localhost:5000/${blog.image}`}
            style={{ maxHeight: '800px', width: '30vw' }}
          />
        </Card>
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <h1>{blog.title}</h1>
          <p>{blog.description}</p>
        </div>
      </div>
      <button style={{ background: "none", border: "none", backgroundColor: "orange", padding: "10px 15px", borderRadius: "20px", position: "absolute", top: "10%", right: "10%" }} onClick={navigateToHomePage}>Back to Posts</button>
    </Container>
  );
};

export default SingleBlog;
