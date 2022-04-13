export function getJWT() {
  const JWT = localStorage.getItem('JWT')

  if (JWT) {
    return JWT
  }
  return null
}