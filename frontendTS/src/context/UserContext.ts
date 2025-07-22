import type { JwtPayload } from 'jwt-decode';
import { createContext } from 'react';

const UserContext = createContext<JwtPayload | null>(null);
export default UserContext;
