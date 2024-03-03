import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link, useParams } from 'react-router-dom'; 
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; 

const OthersProfile = () => {
  const {id}= useParams()
  const [user, setUser] = useState(null);
  let [isUser, setIsUser]= useState(null)
  const [profilePic, setProfilePic] = useState(null);
  const [about, setAbout] = useState('');
  const [confAbout, setConfAbout]= useState('')

  useEffect(() => {
    // Fetch user profile data from the backend
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(response.data.user);
        setUser(response.data.user);
        setAbout(response.data.user.about);
        setConfAbout(response.data.user.about)
        setIsUser(id == localStorage.getItem("userID"))
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const response = await axios.put('http://localhost:5000/api/user/profilepic', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      setProfilePic(response.data.user.profilePic)
      setUser({ ...user, profilePic: response.data.user.profilePic });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  const handleAboutUpdate = async () => {
    try {
      let response=await axios.put('http://localhost:5000/api/user/about', { about },{headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }});
      setConfAbout(about)
      setAbout("")
      
    } catch (error) {
      console.error('Error updating about section:', error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-picture" style={{ width: "400px", height: "400px", overflow: "hidden", borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", margin: "0 auto" ,marginTop:"30px" }}>
        <img onClick={()=>{ document.getElementById("imageUpload")?.click()}} style={{cursor:"pointer",width: "200px", height: "200px", objectFit: "cover"}}  src={`http://localhost:5000/${user?.profilePic}`} alt="Profile" />
        {isUser?<input id='imageUpload' type="file" accept="image/*" onChange={handleProfilePicUpload} />:<></>}
      </div>
      <div className="username">@{user?.name}</div>
      <div className="aboutText">{confAbout}</div>
      <div className="about">
       {isUser? <><p>(Click image to upload/change it)</p>
       <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About me..." />
        <button onClick={handleAboutUpdate}>Update About</button>
        </>:<></>}
      </div>
      <Container className="my-5">
        {user ? (
          user.blogs.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {user.blogs.map((blog) => (
                <Col key={blog._id}>
                  <Card>
                    <Card.Img variant="top" src={`http://localhost:5000/${blog.image}`} style={{ maxWidth: '500px' }} />
                    <Card.Body>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Text>{blog.description.slice(0, 50)}...</Card.Text>
                      <Link to={`/blog/${blog._id}`}><Button variant="primary">Read More</Button></Link>
                      {isUser ? (
                        <>
                          <Link to={`/edit/${blog._id}`}><Button variant="primary" style={{ backgroundColor: "green" }}>Edit</Button></Link>
                          <Button variant="primary" onClick={() => { handelDelete(blog._id) }} style={{ backgroundColor: "red" }}>Delete</Button>
                        </>
                      ) : null}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <h3>No blogs yet...</h3>
          )
        ) : (
          <h3>Loading...</h3>
        )}
      </Container>
    </div>
  );
  
};

export default OthersProfile;
