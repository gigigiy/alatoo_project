export const getAccessToken = () => localStorage.getItem('access');
export const getRefreshToken = () => localStorage.getItem('refresh');

export const isAuthenticated = () => !!getAccessToken();

export const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};
