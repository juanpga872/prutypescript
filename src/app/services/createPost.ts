interface PostData {
    title: string;
    description: string;
    user_id: number;
  }
  
  const API_URL = 'http://localhost:3060/api/posts';
  
  const createPost = async (postData: PostData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear el post');
    }
  
    return response.json();
  };
  
  export default createPost;
  