import { useState } from 'react';
import { userAuth } from './context';
import { currentUser } from '../Storage/user';

function UserContextProvider({ children }) {
  const [user, setUser] = useState(currentUser());
  return (
    <>
      <userAuth.Provider value={[user, setUser]}>{children}</userAuth.Provider>
    </>
  );
}

export default UserContextProvider;
