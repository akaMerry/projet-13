import { Link, Outlet, href } from "react-router";
import Logo from "~/assets/argentBankLogo.png";
import { logout, useAppDispatch, useAppSelector, getUser } from "~/store";
import { useEffect } from "react";

function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  return (
    <header className="absolute h-16 w-full top-0 z-10 bg-white">
      <nav className="flex grid-cols-2 justify-between items-center pl-4 pr-4">
        <Link to={href("/")} tabIndex={0}>
          <img className="max-h-13.5" src={Logo} alt="Argent Bank Logo" />
        </Link>
        <div className="flex flex-row items-center">
          {user.isAuthenticated ? (
            <>
              <i className="fa fa-user-circle text-gray-700"></i>
              <Link to="/dashboard">
                <p className="text-md md:text-lg text-gray-700 font-bold p-2">
                  {user.user.firstName}
                </p>
              </Link>
              <i className="fa fa-sign-out text-gray-700 ml-4"></i>
              <button onClick={() => dispatch(logout())}>
                <p className="text-md md:text-lg text-gray-700 font-bold p-2 cursor-pointer">
                  Sign out
                </p>
              </button>
            </>
          ) : (
            <>
              <i className="fa fa-user-circle text-gray-700"></i>
              <Link to="/login">
                <p className="text-md md:text-lg text-gray-700 font-bold p-2">
                  Sign In
                </p>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="absolute bg-white justify-center h-17.5 w-full bottom-0 z-10 p-6 border-t-2 border-neutral-300">
      <p className="text-md text-center text-gray-700">
        Copyright 2020 Argent Bank
      </p>
    </footer>
  );
}

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      dispatch(getUser());
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <main className="mt-16 mb-17.5 flex h-full w-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
