"use client";

import { FormEvent, useState } from 'react';
import { registerUser, RegisterData } from '../services/auth';
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

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: RegisterData = {
      name,
      email,
      password,
    };

    try {
      await registerUser(userData);
      setSuccess('Usuario registrado con éxito');
      setName('');
      setEmail('');
      setPassword('');
      setError(null);
    } catch (error) {
      setError('Error al registrar usuario');
      setSuccess(null);
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <h1>Registro de Usuario</h1>
      {error && <Message>{error}</Message>}
      {success && <Message success>{success}</Message>}
      <Form onSubmit={handleRegister}>
        <div>
          <Label htmlFor="name">Nombre:</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <Button type="submit">Registrarse</Button>
      </Form>
    </Container>
  );
}