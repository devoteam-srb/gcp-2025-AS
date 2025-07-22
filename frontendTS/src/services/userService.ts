import axios from 'axios';
import type { LoginFormData, SignupFormData } from '../interface/UserInterface';
import { jwtDecode } from 'jwt-decode';

const tokenName = 'token';

export async function signup(user: SignupFormData, profile: File | null) {
  const body = new FormData();
  body.append('name', user.name);
  body.append('email', user.email);
  body.append('password', user.password);
  body.append('deliveryAddress', user.deliveryAddress);
  if (profile) {
    body.append('profilePic', profile);
  }

  const { data } = await axios.post(
    'http://localhost:5000/api/user/signup',
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  localStorage.setItem('token', data.token);
}

export async function login(user: LoginFormData) {
  const body = new FormData();
  body.append('email', user.email);
  body.append('password', user.password);

  const { data } = await axios.post(
    'http://localhost:5000/api/user/login',
    user
  );
  localStorage.setItem('token', data.token);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenName);
    if (jwt) {
      return jwtDecode(jwt);
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenName);
}

export function getJwt() {
  return localStorage.getItem(tokenName);
}
