export async function FetchSiswas() {
  const res = await fetch(`${import.meta.env.VITE_LINK_API}/siswas`);
  const data = await res.json()
  return data.siswa;
}
