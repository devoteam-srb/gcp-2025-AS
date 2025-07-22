import { useEffect, useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Routing } from './components/Routing/Routing';
import { getJwt, getUser } from './services/userService';
import type { JwtPayload } from 'jwt-decode';
import setAuthToken from './components/utils/setAuthToken';
import UserContext from './context/UserContext';

setAuthToken(getJwt());

function App() {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (jwtUser && jwtUser.exp && Date.now() >= jwtUser?.exp * 1000) {
        localStorage.removeItem('token');
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <div className="app">
        <Navbar user={user} />
        <main>
          <Routing />
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
