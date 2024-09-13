

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




export const loginUser = async (loginData: LoginData): Promise<string> => {
  const response = await fetch('https://simuate-test-backend-1.onrender.com/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error('Error al iniciar sesión');
  }

  const data = await response.json();
  return data.token;
};
  