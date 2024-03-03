import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS file for styling
import { faBars } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          <img style={{ height: "80px" }} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/50607df8-4977-4ddd-a78a-f685e6dd7843/d5lxyj3-10afbcc2-8a6b-4350-b76b-9f97d98bfcbc.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUwNjA3ZGY4LTQ5NzctNGRkZC1hNzhhLWY2ODVlNmRkNzg0M1wvZDVseHlqMy0xMGFmYmNjMi04YTZiLTQzNTAtYjc2Yi05Zjk3ZDk4YmZjYmMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FFD5wxwZBFcJReWGWUhO7_B12kk0zIHwLQTdCtCbpgE" alt="" />
        </Link>
        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/addBlog" className="navbar-link">Add Blog</Link>
          <Link to="/addCategory" className="navbar-link">Add Category</Link>
          <Link to="/myBlogs" className="navbar-link">My Blogs</Link>
          <Link to="/profile" className="navbar-link">Profile</Link>
          <Link to="/allProfiles" className="navbar-link">All Creators</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          ) : (
            <button style={{ background: "none", backgroundColor: "crimson", border: "none", padding: "10px 15px", borderRadius: "30px" }} onClick={logout} className="navbar-link button-text">Logout</button>
          )}
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
