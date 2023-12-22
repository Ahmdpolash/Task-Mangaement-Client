import React, { useContext, useState } from "react";
import { authContext } from "../Provider/AuthProvider";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { FcHighPriority } from "react-icons/fc";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const DashboardHome = ({ data, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const [singleTask, setSingleTask] = useState("");

  const { user } = useContext(authContext);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const deadline = form.deadline.value;
    const priority = form.priority.value;
    const description = form.description.value;

    const formData = { title, deadline, priority, description };

    axiosPublic.put(`/tasks/${singleTask._id}`, formData).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Task Updated successfully");
      }
    });
  };

  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/tasks/${_id}`);
        console.log(res.data);

        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your Task has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleEdit = async (id) => {
    const result = await axiosPublic.get(`/tasks/singleTask/${id}`);

    console.log(result.data);
    setSingleTask(result.data);
  };

  // console.log(data);

  return (
    <div>
      <h1 className="mb-2 text-[17px] ml-2 font-semibold">
        {" "}
        <span className="text-[#5082E8] font-bold text-[18px]">
          {user.displayName}
        </span>{" "}
        All Tasks
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="border-2  shadow-xl bg-[#D9E1F2]">
          <div className="bg-[#5082e8] border-2  border-[#396fdd] text-white text-[17px] w-full py-3 text-center font-semibold ">
            <h3>To Do ({data?.length})</h3>
          </div>

          {data?.map((task) => (
            <div key={task._id}>
              <div className="px-3 mt-2 mb-[5px]">
                <div className=" bg-white rounded-lg ">
                  <div className="p-4 space-y-1 shadow-md">
                    <div className="flex justify-between">
                      <h1 className="font-bold">{task?.title}</h1>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(task._id)}>
                          <FaEdit
                            onClick={() =>
                              document.getElementById("my_modal_4").showModal()
                            }
                            className="text-[22px] text-[#5082e8]"
                          />
                        </button>
                        <MdDelete
                          onClick={() => handleDelete(task?._id)}
                          className="text-red-500 text-[25px]"
                        />
                      </div>
                    </div>
                    <p className="flex font-semibold items-center gap-2">
                      {" "}
                      <FcHighPriority /> {task?.priority}
                    </p>
                    <p className="text-gray-600">{task?.description}</p>
                    <hr />
                    <p className="flex gap-2 items-center">
                      {" "}
                      <IoIosTimer /> {task?.deadline}
                    </p>
                  </div>
                </div>
              </div>

              {/* modal */}

              <dialog id="my_modal_4" className="modal  ">
                <div className="modal-box ">
                  <form onSubmit={handleUpdate}>
                    <h1 className="text-center text-2xl font-bold">
                      Update Task
                    </h1>
                    <label htmlFor="title">
                      <h2 className="mb-2">Title</h2>
                    </label>

                    <input
                      name="title"
                      placeholder="Enter a title"
                      type="text"
                      defaultValue={singleTask?.title}
                      className="w-full rounded-md px-2 py-2 border-2 border-black"
                    />
                    <label htmlFor="title">
                      <h2 className="py-2">Priority</h2>
                    </label>
                    <select
                      defaultValue={singleTask?.priority}
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
                      defaultValue={singleTask?.deadline}
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
                      defaultValue={singleTask?.description}
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

              {/* modal */}
            </div>
          ))}
        </div>

        <div className="border-2 bg-[#D9E1F2] h-screen shadow-xl">
          <div className="bg-[#5082e8] border-2  border-[#396fdd] text-white w-full text-[17px]  py-3 text-center font-semibold">
            <h3>Ongoing</h3>
          </div>

          <div className=""></div>
        </div>
        <div className="border-2 bg-[#D9E1F2] h-screen shadow-xl">
          <div className="bg-[#5082e8] border-2  border-[#396fdd] text-white w-full text-[17px]  py-3 text-center font-semibold ">
            <h3>Completed</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
