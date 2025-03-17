import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export function TopBar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    // set context to undefined
    setUser(undefined);
    // clear localstorage
    localStorage.clear("blogUserInfo");
  };

  return (
    <header>
      <nav className="flex w-full gap-2 justify-between items-center p-4 lg:w-3/5 mx-auto">
        <div className="flex gap-3 items-center">
          <Link to="/" className="relative font-bold text-2xl hover:text-blue-500 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left hover:no-underline">
            Blog
          </Link>
        </div>
        <div className="hidden gap-2 md:flex lg:ml-auto mt-2 lg:mt-0">
          {user ? (
            <>
              <span className="text-lg">Welcome, {user.name}!</span>
              {user.role === "ADMIN" && (
                <Link 
                  to="/admin"
                  className="relative text-lg hover:text-blue-500 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left hover:no-underline"
                >
                  Admin
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="relative text-lg hover:text-blue-500 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left hover:no-underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                className="relative text-lg hover:text-blue-500 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left hover:no-underline" 
                to="/login"
              >
                Login
              </Link>
              <Link 
                className="relative text-lg hover:text-blue-500 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left hover:no-underline" 
                to="/signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <div className="px-4">
        <div className="h-0.25 w-full bg-white lg:w-3/5 mx-auto"></div>
      </div>
    </header>
  );
}
