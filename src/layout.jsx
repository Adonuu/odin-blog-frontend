import { Outlet, useLocation } from 'react-router-dom';
import { useState, useLayoutEffect, useEffect } from 'react';
import { TopBar } from './components/topbar';
import { UserContext } from './context/userContext';

export function Layout() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [user, setUser] = useState(undefined);

  useLayoutEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [location]);

  useEffect(() => {
    async function checkJWT() {
      const userInfo = JSON.parse(localStorage.getItem("blogUserInfo"));
    
      if (!userInfo || !userInfo.token) {
        setUser(undefined); 
        localStorage.removeItem("blogUserInfo");
        return;
      }
    
      try {
        const response = await fetch("http://localhost:3000/users/login/jwt", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${userInfo.token}`,
            "Content-Type": "application/json"
          },
        });
    
        if (response.status === 200) {
          setUser(userInfo);
        } else {
          setUser(undefined);
          localStorage.removeItem("blogUserInfo");
        }
      } catch (error) {
        console.error("Error verifying JWT:", error);
        setUser(undefined);
        localStorage.removeItem("blogUserInfo");
      }
    }    
    checkJWT();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <TopBar />
          <div className="ml-auto mr-auto w-full max-w-4xl p-4">
            <div
              key={location.key}
              className={`transition-all duration-300 ease-in-out ${
              isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
              }`}
            >
              <Outlet />
            </div>
          </div>
      </UserContext.Provider>
      
    </>
  );
}
