const remoteURL = "http://localhost:3001";

export default {
  checkUser(username, password) {
    return fetch(
      `${remoteURL}/users?username=${username}&password=${password}`
    ).then(result => result.json());
  },

  postNewUser(newUser) {
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(response => response.json());
  },

  checkUsername(username) {
    return fetch(`${remoteURL}/users?username=${username}`).then(result =>
      result.json()
    );
  }
};