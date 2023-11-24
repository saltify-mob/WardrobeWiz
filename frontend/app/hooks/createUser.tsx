import { UserProfile } from "@auth0/nextjs-auth0/client";

export const createUser = async (user: UserProfile) => {
    const response = await fetch("https://wardrobewiz-backend.azurewebsites.net/api/users/" + user);
    if (!response.ok) {
      const fullName = user.name!.split(" ");
      const raw = JSON.stringify({
        id: user.email,
        firstName: fullName[0],
        lastName: fullName[1],
      });
      const response = await fetch(
        "https://wardrobewiz-backend.azurewebsites.net/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: raw,
        }
      );
        console.log(response.json.toString);
    }
};  
