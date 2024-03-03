import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/Home.css'; // Import CSS file for styling
import axios from 'axios';

const Home = () => {
  const [flag, setFlag]= useState(true)
  const navigate = useNavigate();
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
        const res = await axios.get("http://localhost:5000/api/blog/", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log("home blogs",res.data.blogs);
        setBlogs(res.data.blogs);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchBlogs();
  }, [flag]);

  return (
    <>
    <h1 style={{marginTop:"20px"}} className="text-center mb-4">Welcome to My Blog App, {localStorage.getItem("username")}</h1>
    <Container className="my-5">
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {blogs.map((blog) => (
            <Col key={blog._id}>
              <Card style={{width:"fit-content"}}>
              <Card.Img variant="top" src={`http://localhost:5000/${blog.image}`} style={{ height:"400px",aspectRatio:"1/1"}} />
                <Card.Body>
                 <div style={{display:"flex",alignItems:"center", gap:"10px",marginBottom:"20px"}}> <Card.Img variant="top" src={`http://localhost:5000/${blog.user.profilePic}`} style={{ height:"50px",width:"50px",borderRadius:"50%"}} /> 
                  <h3><Link to={`/profile/${blog.user._id}`}  style={{textDecoration:"none",color:"black"}}>{blog.user.name}</Link></h3></div>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.description.slice(0, 50)}...</Card.Text>
                  <Link to={`/blog/${blog._id}`}><Button variant="primary">Read More</Button></Link>
                   {
                    blog.user._id==localStorage.getItem("userID")?<>
                    <Link to={`/edit/${blog._id}`}><Button variant="primary" style={{backgroundColor:"green"}}>Edit</Button></Link>
                    <Button variant="primary" onClick={()=>{handelDelete(blog._id)}} style={{backgroundColor:"red"}}>Delete</Button></>:<></>
                   }
                  

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

export default Home;
