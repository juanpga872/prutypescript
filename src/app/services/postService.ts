
export interface Post {
  id: number;
  title: string;
  description: string;
  user_id: number;
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://simuate-test-backend-1.onrender.com/api/posts'); 
  if (!response.ok) {
    throw new Error('Error al obtener los posts');
  }
  const data = await response.json();
  return data.posts; 
};