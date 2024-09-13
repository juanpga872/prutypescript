"use client";

import { useEffect, useState } from 'react';
import { getPosts, Post } from './services/postService';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';


const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;



const PostItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #3498db;
`;

const PostDescription = styled.p`
  font-size: 1rem;
  color: #333;
`;

const UserId = styled.span`
  font-size: 0.875rem;
  color: #888;
`;

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
        }
        setPosts(postsData);
      } catch (error) {
        setError('Error al cargar los posts');
      }
    };

    fetchPosts();
  }, []);

  return (
    <PostListContainer>
      <h1>Lista de Posts</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {posts.map((post) => (
        <PostItem key={post.id}>
          <PostTitle>{post.title}</PostTitle>
          <PostDescription>{post.description}</PostDescription>
          <UserId>Usuario ID: {post.user_id}</UserId>
        </PostItem>
      ))}
    </PostListContainer>
  );
}

