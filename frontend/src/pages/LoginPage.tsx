import React, { useState, useContext } from 'react';
import { MyContext } from '../context';
import { Form, Button } from 'react-bootstrap';
import api from '../API';
import { User } from '../types/User';

const LoginPage: React.FC = () => {
  const { setUserLogIn } = useContext(MyContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await api.post('/users/login', { data: { name: email, password } });
      const user: User = response.data;
      console.log('response.data', response.data);
      if (setUserLogIn) {
        setUserLogIn(user);
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
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleUsernameChange} />
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