const LoginForm = () => {
  const handleLogin = (connection: string) => {
    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
    const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
    const redirectUri = encodeURIComponent('https://wardrobe-wiz.vercel.app/LoginCallback');
    const responseType = 'code';
    const authUrl = `https://${domain}/authorize?response_type=${responseType}&client_id=${clientId}&connection=${connection}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={() => handleLogin('google-oauth2')} className="login-button">
        Login with Google
      </button>
      <button onClick={() => handleLogin('facebook')} className="login-button">
        Login with Facebook
      </button>
    </div>
  );
};

export default LoginForm;
