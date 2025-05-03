import axios from "axios";

//server localhost"http://localhost:5000"
const LocalHost = "http://localhost:5000";
//const Deployment = "https://homespacebh.vercel.app";
export const API_BASE_URL = LocalHost;

{
  /**
  const jwt = localStorage.getItem("jwt");
console.log("const jwt", jwt);
//creates an instance and sets jwt for auth used for protected routes
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  },
});
 */
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Using interceptors because old version would get empty jwt at start and not update after signin so when using api. for a req it would contain empty jwt untill refresh.
//Using interceptors it will run every time the req is made using api.

api.interceptors.request.use(
  (config) => {
    // Retrieve the JWT token each time a request is made
    const jwt = localStorage.getItem("jwt");
    // console.log("const jwt", jwt);
    // If the jwt exists, set it in the Authorization header
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    } else {
      // Optionally, you could also remove the Authorization header if there's no token
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Interceps all responses and checks if its a 429 rate error. If so alerts user
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 429) {
      alert(
        error.response.data.message ||
          "Too many requests. Please try again later."
      );
    }
    // Even though the interceptor shows an alert for 429 Too Many Requests, other parts of the application might still need to know about the error.
    return Promise.reject(error);
  }
);
