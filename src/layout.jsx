import { Outlet, useLocation } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
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

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <TopBar />
          <div className="ml-auto mr-auto max-w-4xl p-4">
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
