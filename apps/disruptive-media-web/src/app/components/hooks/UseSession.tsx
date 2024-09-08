import { useEffect, useState } from 'react';

const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      console.log("useSession:true");
      
    } else {
      setIsLoggedIn(false);
    }  console.log("useSession:true");
  }, []);

  return isLoggedIn;
};

export default useSession;
