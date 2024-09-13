interface EditPostParams {
    title: string;
    description: string;
  }
  
  const editPost = async (postId: number, updatedPost: EditPostParams): Promise<void> => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
  
    if (!userId) {
      throw new Error('No se encontró el user_id en localStorage');
    }
  
    try {
      const response = await fetch(`https://simuate-test-backend-1.onrender.com/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...updatedPost,
          user_id: parseInt(userId, 10),
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al editar el post');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  
  export default editPost;
  
  

