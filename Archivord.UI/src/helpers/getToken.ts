export const getToken = () => {
  const tokenString: string | null = sessionStorage.getItem('token')
  if (!tokenString) return null;

  const userToken = JSON.parse(tokenString)
  return userToken
} 