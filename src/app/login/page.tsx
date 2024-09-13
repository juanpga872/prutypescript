"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, LoginData } from '../services/auth';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;


const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;


const Button = styled.button`
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #2980b9;
  }
`;


const Message = styled.p<{ success?: boolean }>`
  color: ${(props) => (props.success ? 'green' : 'red')};
  margin-bottom: 15px;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData: LoginData = {
      email,
      password,
    };

    try {
      const token = await loginUser(loginData);
      localStorage.setItem('token', token);
      setError(null);
      router.push('/');
    } catch (error) {
      setError('Error al iniciar sesión');
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <h1>Iniciar Sesión</h1>
      {error && <Message>{error}</Message>}
      <Form onSubmit={handleLogin}>
        <div>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Contraseña:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Iniciar Sesión</Button>
      </Form>
    </Container>
  );
}