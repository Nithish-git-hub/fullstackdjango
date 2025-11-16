



export async function fetchCurrentUser() {
  try {
    const res = await axios.get("users/me/");
    const user = res.data;
    if (user && user.is_admin !== undefined) {
      localStorage.setItem("role", user.is_admin ? "admin" : "user");
      localStorage.setItem("username", user.username || "");
    } else {
      localStorage.removeItem("role");
    }
    return user;
  } catch (err) {
    localStorage.removeItem("role");
    return null;
  }
}

export function isAdmin() {
  // return boolean only if role is already set
  return localStorage.getItem("role") === "admin";
}

