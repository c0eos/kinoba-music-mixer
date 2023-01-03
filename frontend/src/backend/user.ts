import axios from "axios";

export async function login(email: string, password: string) {
  return axios
    .post(
      "/api/users/login/",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .catch((error) => {
      if (error?.response?.data) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error(error.message);
      }
    });
}

export async function register(email: string, password: string) {
  return axios
    .post(
      "/api/users/",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .catch((error) => {
      if (error?.response?.data) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error(error.message);
      }
    });
}
