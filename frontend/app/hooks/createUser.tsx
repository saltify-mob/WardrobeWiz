export const createUser = async (user: string) => {
    const response = await fetch("https://wardrobewiz-backend.azurewebsites.net/api/users/" + user);
    if (!response.ok) {
        const data = '{' +
                    `"id":"${user}",` +
                    '"firstName":"Grim",' +
                    '"lastName":"Was here!"'
                    +'}';

        const response = await fetch("https://wardrobewiz-backend.azurewebsites.net/api/users/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });
        
          
        console.log(response.json.toString)
    }
};  
