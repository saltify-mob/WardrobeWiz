const LoginForm = () => {
  const buildAuthUrl = (connection: string) => {
    const domain = 'dev-zhqvuxtn6agalo22.us.auth0.com';
    const clientId = 'OiNGCIMzk5ofiQJd1V7xbtQAMS042QZR';
    const redirectUri = encodeURIComponent('https://wardrobe-wiz.vercel.app/');
    const responseType = 'code';
  
    return `https://${domain}/authorize?response_type=${responseType}&client_id=${clientId}&connection=${connection}&redirect_uri=${redirectUri}`;
  };

  return (
    <div>
      <a href={buildAuthUrl('google-oauth2')} className="login-button">Login with Google</a>
      <a href={buildAuthUrl('facebook')} className="login-button">Login with Facebook</a>
    </div>
  );
};

export default LoginForm;
