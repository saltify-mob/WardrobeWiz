import { Auth0Provider } from "@auth0/auth0-react";
import LoginForm from "./components/loginForm/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm />
    </main>
  );
}
