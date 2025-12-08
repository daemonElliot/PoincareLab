const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function registerUser({ username, email, password }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Registration failed");
  }

  return response.json();
}

export async function loginUser({ username, password }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Login failed");
  }

  return response.json();
}
