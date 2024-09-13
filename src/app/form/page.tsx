"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import addPost, { PostData } from '../services/posts';

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

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
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

export default function AddPostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user_id = Number(localStorage.getItem('user_id'));
    const postData: PostData = {
      title,
      description,
      user_id,
    };

    try {
      const response = await addPost(postData);
      setSuccess('Post agregado con éxito');
      setTitle('');
      setDescription('');
      setError(null);
      router.push('/'); 
    } catch (error) {
      setError( 'Error al agregar el post');
      console.error('Error:', error);
      setSuccess(null);
    }
  };

  return (
    <Container>
      <h1>Agregar Nuevo Post</h1>
      {error && <Message>{error}</Message>}
      {success && <Message success>{success}</Message>}
      <Form onSubmit={handleCreatePost}>
        <div>
          <Label htmlFor="title">Título:</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Descripción:</Label>
          <TextArea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Agregar Post</Button>
      </Form>
    </Container>
  );
}

