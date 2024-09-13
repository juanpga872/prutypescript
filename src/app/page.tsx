"use client" 
import React, { useEffect, useState } from 'react'; 
import styled from 'styled-components'; 
import { useRouter } from 'next/navigation';
import deletePost from './services/deletePost';
import editPost from './services/editPost';



interface PostUpdate {
  title: string;
  description: string;
}

interface Post {
  id: number;
  title: string;
  description: string;
  likes: number;
  userHasLiked: boolean;
}

class PostModel implements Post {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public likes: number,
    public userHasLiked: boolean
  ) {}
}

const HomePage: React.FC = () => {
  const router = useRouter(); 
  const [posts, setPosts] = useState<PostModel[]>([]); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(''); 


  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch('https://simuate-test-backend-1.onrender.com/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json(); 
        const postsData = data.posts.map(
          (post: Post) =>
            new PostModel(post.id, post.title, post.description, post.likes, post.userHasLiked)
        );
        setPosts(postsData); 
      } catch (error) {
        console.error('Error fetching posts:', error); 
      }
    };

    fetchPosts(); 
  }, [router]); 

  const handleLike = (id: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? new PostModel(
              post.id,
              post.title,
              post.description,
              post.userHasLiked ? post.likes - 1 : post.likes + 1, 
              !post.userHasLiked 
            )
          : post
      )
    );
  };

 
  const handleAddPost = async () => {
    const token = localStorage.getItem('token');

  
    if (!title || !description) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
  
      const response = await fetch('https://simuate-test-backend-1.onrender.com/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          title,
          description,
          user_id: 16, 
        }),
      });

   
      if (response.ok) {
        const newPost = await response.json();
        setPosts([newPost, ...posts]); 
        setTitle(''); 
        setDescription(''); 
        setError(''); 
      } else {
        throw new Error('Error al agregar el post'); 
      }
    } catch (error) {
      console.error('Error adding post:', error); 
      setError('Error al agregar el post'); 
    }
  };


  const handleDelete = async (postId: number) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error: any) {
      console.error('Error al eliminar el post:', error.message);
    }
  };


  const [isEditing, setIsEditing] = useState<number | null>(null); 
  const [editTitle, setEditTitle] = useState(''); 
  const [editDescription, setEditDescription] = useState('');

    const handleEdit = async (postId: number) => {
      try {
        await editPost(postId, { title: editTitle, description: editDescription });
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? new PostModel(post.id, editTitle, editDescription, post.likes, post.userHasLiked)
              : post
          )
        );
        setIsEditing(null); 
        setEditTitle(''); 
        setEditDescription('');
      } catch (error: any) {
        console.error('Error al editar el post:', error.message);
      }
    };
  
  
  

 
  return (
    <Container>
      <Title>Publicaciones</Title>
      <PostsContainer>
  {posts.map((post) => (
    <PostCard key={post.id}>
      {isEditing === post.id ? (
        <>
          <Input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Edita el título"
          />
          <Input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Edita la descripción"
          />
<Button onClick={() => handleEdit(post.id)}>
  Guardar Cambios
</Button>

          <Button onClick={() => setIsEditing(null)}>Cancelar</Button>
        </>
      ) : (
        <>
          <PostTitle>{post.title}</PostTitle>
          <PostDescription>{post.description}</PostDescription>
          <LikeButton onClick={() => handleLike(post.id)}>
            {post.userHasLiked ? 'Unlike' : 'Like'} ({post.likes})
          </LikeButton>
          <EditButton onClick={() => {
            setIsEditing(post.id);
            setEditTitle(post.title);
            setEditDescription(post.description);
          }}>Editar</EditButton>
          <DeleteButton onClick={() => handleDelete(post.id)}>Eliminar</DeleteButton>
        </>
      )}
    </PostCard>
  ))}
</PostsContainer>
    </Container>
  );
};

export default HomePage;


const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
`;

const AddPostButton = styled.button`
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  background-color: #2b6cb0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2c5282;
  }
`;

const FormContainer = styled.form`
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f7fafc;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  background-color: #48bb78;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #38a169;
  }
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PostCard = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`;

const PostTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #111;
`;

const PostDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #555;
`;

const LikeButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4c51bf;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #434190;
  }
    `;


const Button = styled.button`
background-color: #007bff;
color: white;
padding: 10px 20px;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 16px;
transition: background-color 0.3s ease;

&:hover {
  background-color: #0056b3;
}

&:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: darkred;
  }
`;

const EditButton = styled.button`
  background-color: blue;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: darkblue;
  }
`;

const CancelButton = styled.button`
  background-color: gray;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: darkgray;
  }
`;

const ErrorMessage = styled.div`
color: red;
margin-bottom: 10px;
font-size: 14px;
text-align: center;
`;