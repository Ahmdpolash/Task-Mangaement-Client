import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../public/logo.png";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../Hooks/useAxiosPublic";
import { authContext } from "../Provider/AuthProvider";

const Navbar = () => {
  // const axiosPublic = useAxiosPublic();
  const { user, logOut } = useContext(authContext);
  // const { data } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get("/users");
  //     return res.data;
  //   },
  // });

  // const filter = data?.find((email) => email.email === user?.email);
  // console.log(filter);

  const handleLogOut = () => {
    logOut();
  };

  const nav = (
    <>
      <li>
        <Link
          className="text-black hover:text-[#4A35D0] hover:bg-white duration-300 hover:bg-none text-[16px] font-semibold"
          to="/#"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className="text-black hover:text-[#4A35D0] hover:bg-white duration-300 hover:bg-none text-[16px] font-semibold"
          to="/#"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          className="text-black hover:text-[#4A35D0] hover:bg-white duration-300 hover:bg-none text-[16px] font-semibold"
          to="/#"
        >
          Contact Us
        </Link>
      </li>
      <li>
        <Link
          className="text-black hover:text-[#4A35D0] hover:bg-white duration-300 text-[16px] font-semibold"
          to="/#"
        >
          Dashboard
        </Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar fixed px-4 lg:px-16 mx-auto z-10 bg-base-100  text-white">
        <div className="navbar-start">
          <div className="dropdown text-[#4A35D0] font-bold text-2xl">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {nav}
            </ul>
          </div>
          <Link to='/'>
            <img className="w-[140px]" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{nav}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="dropdown  dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-1 z-[1] shadow-lg p-2 border-2 menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <p className="text-black text-[18px] mx-auto font-bold py-3 hover:bg-white  ">
                      {user?.displayName}
                    </p>
                  </li>

                  <li>
                    {" "}
                    <button
                      className="bg-[#4A35D0] my-3 w-full mx-auto text-center hover:bg-transparent border-2 hover:text-black font-semibold duration-300 border-[#4A35D0] px-4 py-2 rounded-md text-white"
                      onClick={handleLogOut}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="border-2 font-semibold hover:bg-[#4a35d0] duration-300 hover:text-white text-[#4A35D0] border-[#4A35D0] px-7 py-2 mr-3 rounded-md">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="bg-[#4A35D0] font-semibold hover:bg-transparent hover:text-[#4A35D0] duration-300 hidden lg:block border-2 border-[#4A35D0]  px-7 py-2 rounded-md">
                  Registration
                </button>
              </Link>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
