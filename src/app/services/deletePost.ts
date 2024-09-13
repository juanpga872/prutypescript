const API_URL = 'https://simuate-test-backend-1.onrender.com/api/posts/';


const deletePost = async (postId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al eliminar el post');
  }
};

export default deletePost;
