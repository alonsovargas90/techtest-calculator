import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../providers/UserContext';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import api from '../API';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { setUserProfile } = useContext(UserContext);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await api.post('/auth/login', { data: { username, password } });
      const jwt = response.data.access_token;
      document.cookie = `jwt=${jwt}; path=/; secure; SameSite=strict`;

      const responseProfile = await api.get('/auth/profile');
      const userProfile = responseProfile.data;

      if (setUserProfile) {
        setUserProfile(userProfile);
        history.push("/operations");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <Form className="mt-5" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={username} onChange={handleUsernameChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign in
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;