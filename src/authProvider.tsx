import { AuthProvider } from "react-admin";

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL;

export const authProvider: AuthProvider = {
  // called when the user attempts to log in
  login: ({ username, password }) => {
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
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  // called when the user clicks on the logout button
  // It is a good place to notify the authentication backend that the user credentials are no longer valid after logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    localStorage.removeItem("uid");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      const token = JSON.parse(localStorage.getItem("token") as string),
        uid = JSON.parse(localStorage.getItem("uid") as string),
        username = JSON.parse(localStorage.getItem("username") as string)
      return Promise.resolve({ id: uid, username, token /*, permissions, role */ });
    } catch (error) {
      return Promise.reject({ message: "Failed to retrieve identity", error });
    }
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    try {
      const role = localStorage.getItem("role" as string)?.replace(/"/g, ""),
        permissions = localStorage.getItem("permissions" as string)?.replace(/"/g, "");
      return Promise.resolve({ role, permissions });
    } catch (error) {
      return Promise.reject({ message: "Failed to retrieve permissions", error });
    }
  },
};
