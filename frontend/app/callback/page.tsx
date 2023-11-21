import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
  callback: async (req: any, res: any) => {
    try {
      await handleCallback(req, res, {
        redirectUri: 'https://example.com'
      });
    } catch (error) {
      console.error(error);
    }
  }
});
