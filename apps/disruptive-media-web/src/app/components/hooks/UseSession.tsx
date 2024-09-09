import { useEffect, useState } from 'react';

const UseSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
};

export default UseSession;
