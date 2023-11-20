import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginForm = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSocialLogin = (connection: string) => {
    loginWithRedirect({
      appState: { connection }
    });
  };

  return (
    <div>
      <button onClick={() => handleSocialLogin('google-oauth2')}>
        Login with Google
      </button>
      <button onClick={() => handleSocialLogin('facebook')}>
        Login with Facebook
      </button>
    </div>
  );
};

export default LoginForm;
