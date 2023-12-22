import React, { useContext } from "react";
import logo from "../../public/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Login = () => {
  const { loginUser, googleLogin } = useContext(authContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const location = useLocation()

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    loginUser(email, password).then((res) => {
      toast.success("Login successful");
      navigate(location.state? location.state : '/');
    });
  };

  const handleGoogleLogin = () => {
    googleLogin().then((res) => {
      const userInfo = {
        name: res.user.displayName,
        image: res.user.photoURL,
        email: res.user.email,
      };
      navigate(location.state? location.state : '/');

      toast.success("Login successful");
      axiosPublic.post("/users", userInfo);
      if (res.data.insertedId) {
      }
    });
  };

  return (
    <div>
      <>
        {/* source:https://codepen.io/owaiswiz/pen/jOPvEPB */}
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <div>
                {/* <img
                  src={logo}
                  className=" w-[160px] w-mx-auto"
                /> */}
                <p className="text-center font-bold text-3xl ">
                  Welcome to{" "}
                  <span className="text-4xl text-green-400">urTask</span>
                </p>
              </div>

              <form onSubmit={handleLogin} action="">
                <div className="mt-12 flex flex-col items-center">
                  <div className="w-full flex-1 mt-8">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleGoogleLogin}
                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                      >
                        <div className="bg-white p-2 rounded-full">
                          <svg className="w-4" viewBox="0 0 533.5 544.3">
                            <path
                              d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                              fill="#4285f4"
                            />
                            <path
                              d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                              fill="#34a853"
                            />
                            <path
                              d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                              fill="#fbbc04"
                            />
                            <path
                              d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                              fill="#ea4335"
                            />
                          </svg>
                        </div>
                        <span className="ml-4">Sign In with Google</span>
                      </button>
                    </div>
                    <div className="my-12 border-b text-center">
                      <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                        Or sign In with Email & Password
                      </div>
                    </div>
                    <div className="mx-auto max-w-xs">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                        name="email"
                      />
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                      <button className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy={7} r={4} />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-2 text-black font-bold">
                          Sign In
                        </span>
                      </button>
                      <p className="mt-6 text-[16px] text-gray-600 text-center">
                        Don't Have and Account ? &nbsp;
                        <Link
                          className="text-green-700 hover:underline font-bold"
                          to="/register"
                        >
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex-1 bg-green-100 text-center hidden lg:flex">
              <div
                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("https://drive.google.com/uc?export=view&id=1KZ_Ub_2lZ0dHbKV0fAIhxVhiQA183RCz")',
                }}
              ></div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Login;
