import React from 'react';
import './Aboutpage.css';
import Avatar from '@mui/material/Avatar';

function Aboutpage() {
  return (
    <div className="about-container">
      <h1 className="about-title">About This Project</h1>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
        <Avatar
          alt="Ilay Admoni"
          src="/ilaypicture.jpeg"
          sx={{ width: 120, height: 120, boxShadow: 3 }}
        />
      </div>
      <p className="about-description">
        My name is Ilay Admoni, and I created this recipe-sharing web application out of curiosity and a deep passion for web development.
        <br />
        The platform allows users to create, edit, and delete their own personal recipes, including detailed ingredients, step-by-step preparation instructions, and an illustrative image to enhance the experience.
      </p>
      <div className="about-details">
        <h2>Technologies Used:</h2>
        <ul>
          <li>Frontend: <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React.js</a></li>
          <li>Backend: <a href="https://flask.palletsprojects.com/" target="_blank" rel="noopener noreferrer">Python with Flask</a></li>
          <li>Database: <a href="https://www.mongodb.com/atlas" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a></li>
          <li>Version Control: <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">Git</a> (code hosted on <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>)</li>
        </ul>
        <h2>Deployment & Running:</h2>
        <ul>
          <li>The entire project runs inside a custom multi-stage <a href="https://docs.docker.com/engine/reference/builder/" target="_blank" rel="noopener noreferrer">Docker</a> container (Dockerfile).</li>
          <li>In the first stage, the frontend is built with the backend API URL injected via environment variables.</li>
          <li>In the second stage, the Flask backend is set up, the frontend build is copied in, and everything is served together.</li>
          <li>The backend handles both API requests and serves the static frontend files.</li>
        </ul>
        <h2>Hosting:</h2>
        <p>The project is deployed and hosted on the <a href="https://render.com/" target="_blank" rel="noopener noreferrer">Render</a> platform.</p>
        <h2>Contact:</h2>
        <p>Email: <a href="mailto:ilayadmoni9@gmail.com">ilayadmoni9@gmail.com</a></p>
        <p>GitHub: <a href="https://github.com/ilayadmoni" target="_blank" rel="noopener noreferrer">ilayadmoni</a></p>
      </div>
    </div>
  );
}

export default Aboutpage;
