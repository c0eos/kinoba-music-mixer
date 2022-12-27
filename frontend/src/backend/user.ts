export async function login(email: string, password: string) {
  return fetch("http://localhost:5173")
    .then((response) => "jwt")
    .catch((err) => console.log(err));
}

export async function register(email: string, password: string) {
  return fetch("http://localhost:5173")
    .then((response) => "jwt")
    .catch((err) => console.log(err));
}
