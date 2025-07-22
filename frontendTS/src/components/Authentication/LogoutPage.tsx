import { useEffect } from 'react';
import { logout } from '../../services/userService';

export function LogoutPage() {
  useEffect(() => {
    logout();
    window.location.href = '/';
  }, []);
  return null;
}
