import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// react icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { authContext } from "../Provider/AuthProvider";
import { toast } from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const [visible, setVisible] = useState(false);
  const { createUser, update } = useContext(authContext);

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.Username.value;
    const email = form.email.value;
    const password = form.password.value;
    const bio = form.bio.value;
    const img = form.img.files[0];

    const formData = { name, email, password, bio, img };
    console.log(formData);

    const imageFile = { image: img };

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    console.log(res.data);

    if (res.data.success) {
      const data = {
        name,
        email,
        image: res.data.data.display_url,
        bio,
      };
      const result = await axiosPublic.post("/users", data);

      if (result.data.insertedId) {
        createUser(email, password)
          .then((res) => {
            update(res.data.data.display_url, name).then((res) => {
              console.log(res.data);
              toast.success(
                "Account Created Successfully ! Please Login Now!!"
              );
              navigate("/login");
            });
          })
          .catch((err) => {
            console.log(err.message);
            toast.error(err.message);
          });
      }

      if (!result.data.insertedId) {
        toast.error("User already exists");
      }

      console.log(result.data);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-4 sm:px-6 lg:px-8 dark:bg-[#060B13] max-w-[1200px] mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className=" text-center text-3xl font-extrabold text-gray-900 dark:text-[#7997D2]">
            Sign Up
          </h2>
        </div>
        <div className="mt-8 mx-auto w-[90%] 800px:w-[45%]">
          <div className="bg-white dark:bg-[#060B13] dark:border dark:border-[#7997D2] py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleRegister} className="space-y-6 ">
              <div>
                <label
                  htmlFor="Username"
                  className="block text-sm dark:text-[#D9E1F2]  font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="Username"
                    autoComplete="Username"
                    required
                    placeholder="Username"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:bg-[#3960AC] dark:border-[#6e93dd] rounded-md shadow-sm placeholder-gray-400 dark:placeholder:text-[#7997D2] focus:outline-none dark:text-[#7997D2]  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm dark:text-[#D9E1F2]  font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:bg-[#3960AC] dark:border-[#6e93dd] rounded-md shadow-sm placeholder-gray-400 dark:placeholder:text-[#7997D2] focus:outline-none dark:text-[#7997D2]  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm dark:text-[#D9E1F2]  font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:bg-[#3960AC] dark:border-[#6e93dd] rounded-md shadow-sm placeholder-gray-400 dark:placeholder:text-[#7997D2] focus:outline-none dark:text-[#7997D2]  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute dark:text-[#6e93dd] right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 dark:text-[#6e93dd] top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="Bio"
                  className="block text-sm dark:text-[#D9E1F2] font-medium text-gray-700"
                >
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    type="text"
                    name="bio"
                    required
                    maxLength={100}
                    placeholder="Write bio"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 dark:bg-[#3960AC] dark:border-[#6e93dd] dark:placeholder:text-[#7997D2] focus:outline-none dark:text-[#7997D2] focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="image"
                  className="block text-sm py-2 dark:text-[#D9E1F2] font-medium text-gray-700"
                >
                  Image
                </label>
                <input
                  className="border-2 w-full "
                  type="file"
                  name="img"
                  id=""
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 dark:bg-[#7997D2] dark:text-[#0D1526] border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
              <div className="flex">
                <h4>Already have an account?</h4>
                <Link
                  to="/login"
                  className="text-blue-600 pl-2 dark:text-[#6689CC]"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
