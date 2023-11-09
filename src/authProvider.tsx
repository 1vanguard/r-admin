import { AuthProvider } from "react-admin";

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL;

export const authProvider: AuthProvider = {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    const request = new Request(apiUrl + "/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.token));
        localStorage.setItem("permissions", JSON.stringify(res.permissions));
        localStorage.setItem("uid", JSON.stringify(res.uid));
        localStorage.setItem("username", JSON.stringify(res.username));
        localStorage.setItem("role", JSON.stringify(res.role));
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },
  // called when the API returns an error
  checkError: (error) => {
    console.log("Работает authProvider checkError");
    const status = error.status
    let errorText = ''
    if (error.body) {
      errorText = `Error: ${status}, ${error.body.error}`
    } else {
      errorText = `Error: ${status}`
    }
    if (status && (status.toString().startsWith("4") || status.toString().startsWith("5"))) {
      localStorage.removeItem("token");
      return Promise.reject({ message: errorText });
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    console.log("Работает authProvider checkAuth");
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  // called when the user clicks on the logout button
  // It is a good place to notify the authentication backend that the user credentials are no longer valid after logout
  logout: async () => {
    const token = JSON.parse(localStorage.getItem("token") as string),
      uid = JSON.parse(localStorage.getItem("uid") as string),
      username = JSON.parse(localStorage.getItem("username") as string),
      request = new Request(apiUrl + "/logout", {
        method: "POST",
        body: JSON.stringify({
          userId: uid,
          username: username,
        }),
        headers: new Headers({ authorization: token }),
      });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("permissions");
        localStorage.removeItem("uid");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        return Promise.resolve();
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },
  getIdentity: () => {
    try {
      const token = JSON.parse(localStorage.getItem("token") as string),
        uid = JSON.parse(localStorage.getItem("uid") as string),
        username = JSON.parse(localStorage.getItem("username") as string);
      return Promise.resolve({ id: uid, username, token });
    } catch (error) {
      return Promise.reject({ message: "Failed to retrieve identity", error });
    }
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    try {
      // const role = localStorage.getItem("role" as string)?.replace(/"/g, ""),
      const role: number = parseInt(localStorage.getItem("role") || "0"),
        permissions = localStorage
          .getItem("permissions" as string)
          ?.replace(/"/g, "");
      return Promise.resolve({ role, permissions });
    } catch (error) {
      return Promise.reject({
        message: "Failed to retrieve permissions",
        error,
      });
    }
  },
};
