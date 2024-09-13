
export interface PostData {
    title: string;
    description: string;
    user_id: number;
  }
  
  const addPost = async (postData: PostData): Promise<any> => {
    try {
      const response = await fetch('https://simuate-test-backend-1.onrender.com/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar el post');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al agregar el post:', error);
      throw new Error('Error al agregar el post');
    }
  };
  
  export default addPost;
  
  
  