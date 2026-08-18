import { useState } from 'react';

const initialAuth = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export function useAuth() {
  const [auth, setAuth] = useState(initialAuth);

  const login = (email) => {
    setAuth({
      user: {
        email,
        name: email.split('@')[0] || 'User',
      },
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const signup = (name, email) => {
    setAuth({
      user: {
        name: name || 'User',
        email,
      },
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    setAuth(initialAuth);
  };

  return {
    ...auth,
    login,
    signup,
    logout,
  };
}
