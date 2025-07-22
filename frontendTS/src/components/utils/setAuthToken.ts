import apiClient from './api-client';

const setAuthToken = (token: any) => {
  if (token) {
    apiClient.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete apiClient.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
