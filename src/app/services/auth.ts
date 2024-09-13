

  export interface LoginData {
  email: string;
  password: string;
  }



  export interface RegisterData {
    name: string;
    email: string;
    password: string;
  }
  

  export const registerUser = async (userData: RegisterData): Promise<void> => {
    const response = await fetch('https://simuate-test-backend-1.onrender.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      throw new Error('Error al registrar el usuario');
    }
  
    const data = await response.json();
    return data;
  };




  export const loginUser = async (loginData: LoginData): Promise<{ token: string; user: { id: number } }> => {
    try {
      const response = await fetch('https://simuate-test-backend-1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Error al iniciar sesión');
    }
  };