import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card, Container, Row, Col } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
const AllProfiles = () => {
  // let navigate= useNavigate();
  const [users, setUsers] = useState([]);
  // const handelCLick= async (id)=>{
  //    const response= await axios.get(`http://localhost:5000/api/user/${id}`,{
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`
  //     }
  //   });
  //   navigate(``)
  //   console.log("from clicked ",response.data);
  // }
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  return (
   <>
           <h2 style={{position:"relative",display:"inline", left:"50%", top:"20px", transform:"translate(-50%,0)"}}>All bloggers</h2>
    <Container className="my-5">
      <Row xs={1} md={2} lg={3} className="g-4">
        {users.map((user) => (
          <Col key={user._id}>
            <Link to={`/profile/${user._id}`}>
            <Card style={{  width: "200px",
                  height: "200px",
                  overflow: "hidden",
                 
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  margin: "0 auto",}} >
                <Card.Img style={{height:"100px",width:"100px",borderRadius:"50%",objectFit:"cover"}}
                  variant="top"
                  src={`http://localhost:5000/${user.profilePic}`}
                />

                <Card.Title>{user.name}</Card.Title>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default AllProfiles;
