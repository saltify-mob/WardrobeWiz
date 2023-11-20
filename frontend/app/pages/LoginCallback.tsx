import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginCallback = () => {
  const { handleRedirectCallback, isAuthenticated } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    const handleAuth0Callback = async () => {
      await handleRedirectCallback();
      router.push(isAuthenticated ? '/' : '/login');
    };
    handleAuth0Callback();
  }, [handleRedirectCallback, isAuthenticated, router]);

  return <div>Loading...</div>;
};

export default LoginCallback;