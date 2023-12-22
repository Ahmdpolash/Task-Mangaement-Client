import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";

import { useContext } from "react";
import { authContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import DashboardHome from "./DashboardHome";
// import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { user } = useContext(authContext);

  const axiosPublic = useAxiosPublic();

  const { data, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const result = await axiosPublic.get("/tasks");
      return result.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const deadline = form.deadline.value;
    const priority = form.priority.value;
    const description = form.description.value;

    form.reset();
    const formData = { title, deadline, priority, description };
    console.log(formData);

    axiosPublic.post("/tasks", formData).then((res) => {
      if (res.data.insertedId) {
        refetch();
        toast.success("Task added successfully");
      }
    });
  };

  return (
    <div className="">
      <div className="flex">
        <div>
          <div className="drawer lg:hidden z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="  drawer-button">
                <IoMdMenu className="text-3xl pl-2  mt-4  font-bold" />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="w-[300px] bg-[#021A48] h-screen text-white p-8">
                <div className="flex flex-col justify-center items-center mb-6">
                  <img
                    src={user?.photoURL}
                    alt="User"
                    className="rounded-full w-16 h-16 mr-4"
                  />
                  <div>
                    <p className="text-lg font-semibold">{user.displayName}</p>
                  </div>
                </div>

                <ul className="flex flex-col gap-4 mt-16">
                  <li>
                    <button className="w-full">
                      <NavLink
                        to="/dashboard/dashboardHome"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "bg-[#2563DC] text-white py-1 px-2 rounded w-full text-center block"
                            : "bg-[#EEF2FC] py-1 px-2 rounded text-black w-full text-center block"
                        }
                      >
                        DashBoard
                      </NavLink>
                    </button>
                  </li>
                  <li>
                    <button className="w-full">
                      <NavLink
                        to=""
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "bg-[#2563DC] text-white py-1 px-2 rounded w-full text-center block"
                            : "bg-[#2563DC] py-1 px-2 rounded text-black w-full text-center block"
                        }
                      >
                        Add Task+
                      </NavLink>
                    </button>
                  </li>
                </ul>
                <div className="divider">OR</div>
                <ul className="flex flex-col gap-4 mt-4">
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                    className="w-full"
                  >
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "bg-[#2563DC] text-white py-1 px-2 rounded w-full text-center block"
                          : "bg-[#EEF2FC] py-1 px-2 rounded text-black w-full text-center block"
                      }
                    >
                      Add Task
                    </NavLink>
                  </button>
                </ul>
              </div>
            </div>
          </div>

          {/* lg navbar */}
          <div className="w-[300px] relative bg-[#D9E1F2] h-full hidden lg:block p-8">
            <div className="flex flex-col justify-center items-center mb-6">
              <img
                src={user?.photoURL}
                alt="User"
                className="rounded-full w-20 h-20 mr-4"
              />
              <div>
                <p className="text-lg mt-2 text-center font-semibold">
                  {user.displayName}
                </p>
                <p className="text-[16px] text-gray-500 font-semibold">
                  {user.email}
                </p>
              </div>
            </div>

            <ul className="flex flex-col gap-4 mt-16">
              <li>
                <button className="w-full">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-[#406BBF] text-white py-2 px-2 rounded w-full text-center block"
                        : "bg-[#EEF2FC] py-2 px-2 rounded text-black w-full text-center block"
                    }
                  >
                    Home
                  </NavLink>
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  className="w-full"
                >
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-[#5082E8] text-white py-2 px-2 rounded w-full text-center block"
                        : "bg-[#5082E8] hover:bg-[#9FB5DF] transition duration-300 py-2 px-2 rounded text-black w-full text-center block"
                    }
                  >
                    Add Task +
                  </NavLink>
                </button>
              </li>
            </ul>
            <div className="divider">OR</div>

            <li>
                <button
                 
                  className="w-full"
                >
                  <NavLink to='/' className='bg-[#5082E8] text-white py-2 px-2 rounded w-full text-center block'
                  >
                    Go Home
                  </NavLink>
                </button>
              </li>


            <dialog id="my_modal_3" className="modal  ">
              <div className="modal-box ">
                <form onSubmit={handleSubmit} >
                  <h1 className="text-center text-2xl font-bold">
                    Add New Task
                  </h1>
                  <label htmlFor="title">
                    <h2 className="mb-2">Title</h2>
                  </label>

                  <input
                    name="title"
                    placeholder="Enter a title"
                    type="text"
                    className="w-full rounded-md px-2 py-2 border-2 border-black"
                  />
                  <label htmlFor="title">
                    <h2 className="py-2">Priority</h2>
                  </label>
                  <select
                    className="w-full border-2 py-2 border-black rounded-md"
                    name="priority"
                    id=""
                  >
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                  </select>
                  <label htmlFor="title">
                    <h2 className="py-2">Deadline</h2>
                  </label>
                  <input
                    name="deadline"
                    placeholder="Enter a title"
                    type="date"
                    className="w-full rounded-md px-2 py-2 border-2 border-black"
                  />
                  <label htmlFor="title">
                    <h2 className="py-2">Description</h2>
                  </label>
                  <textarea
                    className="w-full mb-1 border-2 border-black rounded-md"
                    name="description"
                    id=""
                    cols="5"
                    rows="5"
                  ></textarea>
                  <button className="w-full bg-[#2563EB] text-white py-2 rounded-md">
                    Add Task
                  </button>
                </form>
                 <form method="dialog">
                 <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                 </form>
              </div>
            </dialog>

          </div>
        </div>
        <div className="lg:border-l w-full min-h-screen py-4">
          <div>
            <div className="flex  gap-4 border-b px-10 pb-6 items-center">
              <div className="w-full ">
                <form className=" hidden lg:block relative">
                  {" "}
                  <input
                    className="border w-full rounded-sm py-2 px-2 "
                    type="text"
                    placeholder="Search by task name..."
                  />
                  <IoIosSearch className="absolute top-2 right-2" />
                </form>
              </div>
              <div className="flex gap-4 items-center justify-end lg:w-[20%]">
                <IoMdNotificationsOutline className="w-[45px] h-[25px]" />
                <img
                  className="w-[30px] h-[30px] rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              </div>
            </div>

            <div className="px-6 pt-3">
              <DashboardHome refetch={refetch} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
