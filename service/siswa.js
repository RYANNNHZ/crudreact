import axios from "axios";

export async function FetchSiswas() {
  const token = localStorage.getItem("token") // dapatkan token dari local storage
  const res = await axios.get(`${import.meta.env.VITE_LINK_API}/siswas`, {
    headers : {
      "Authorization" : `Bearer ${token}` // gunakan authorization untuk mengirimkan token ke server
    }
  });

  return res;
}
