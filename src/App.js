import React, { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import tasks from "./components/data/tasks";
import AddModal from "./components/modal/AddModal";
import EditModal from "./components/modal/EditModal";
import DeleteModal from "./components/modal/DeleteModal";
import "./App.css";

function App() {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [description, setDescription] = useState("");

  const progress = tasks.filter((item) => item.completed === false);
  const completed = tasks.filter((item) => item.completed === true);
  const totalTask = progress.length + completed.length;

  const handleAddModal = () => {
    setAddModal(true);
  };
  const handleComplete = (id, description) => {
    setTaskID(id);
    tasks.splice(taskID, 0, { description, completed: true });
    toast.success("Task Completed");
  };
  const handleEditModal = (id, description) => {
    setEditModal(true);
    setTaskID(id);
    setDescription(description);
  };
  const handleDeleteModal = (id) => {
    setTaskID(id);
    setDeleteModal(true);
  };
  return (
    <div className="App">
      <Toaster position="top-left" />
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="basis-3/4 p-10">
          <div className="text-left">
            <h1 className="text-3xl lg:text-4xl font-semibold">Task Manager</h1>
            <p className="text-lg">
              This dashboard provides a page where task & processes can be
              viewed and managed at on place
            </p>
          </div>
          <div className="flex flex-row justify-between my-8">
            <button
              onClick={handleAddModal}
              className="bg-black px-12 py-4 text-white"
            >
              +Add Task
            </button>
          </div>
          <div className="my-10 flex flex-col lg:flex-row gap-10">
            {/* In Progress */}
            <div className="basis-1/2 border border-black shadow-xl p-5">
              <div className="flex flex-col gap-3">
                <h3 className="text-xl text-center">In Progess</h3>
                <hr className="border bg-gray-500 border-gray-500" />
              </div>
              {progress.map((task, index) => (
                <div
                  key={index}
                  className="border border-black p-5 text-left flex flex-col gap-2 mt-6"
                >
                  <p className="text-lg text-gray-500">In Progess</p>
                  <p className="text-base font-medium">{task.description}</p>
                  <div className="flex flex-row justify-between my-5">
                    <div className="flex flex-row gap-2">
                      <button
                        onClick={() => handleEditModal(index, task.description)}
                        className="p-2"
                      >
                        <PencilSquareIcon className="text-black h-6 w-6" />
                      </button>
                      <button
                        onClick={() => handleDeleteModal(index)}
                        className="p-2"
                      >
                        <TrashIcon className="text-red-600 h-6 w-6" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleComplete(index, task.description)}
                      className="bg-black p-3 text-sm text-white"
                    >
                      Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Completed */}
            <div className="basis-1/2 border border-black shadow-xl p-5">
              <div className="flex flex-col gap-3">
                <h3 className="text-xl text-center">Completed</h3>
                <hr className="border bg-gray-500 border-gray-500" />
              </div>
              {completed.map((task, index) => (
                <div
                  key={index}
                  className="border border-black p-5 text-left flex flex-col gap-2 mt-6"
                >
                  <p className="text-lg text-gray-500">Completed</p>
                  <p className="text-base font-medium">{task.description}</p>
                  <div className="flex flex-row justify-end my-5">
                    <div className="text-sm flex flex-row gap-1">
                      <CheckBadgeIcon className="w-6 h-6 text-green-500" />
                      <p>Done</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="basis-1/4 lg:right-10 lg:fixed">
          <div className="flex flex-col gap-4 bg-[#FFC900] p-10 border-2 border-black">
            <div className="text-left">
              <h3 className="text-lg lg:text-xl font-semibold">Summary</h3>
              <hr className="border border-black bg-black my-3" />
            </div>
            <div className="flex flex-col gap-6 text-left">
              <div>
                <p className="text-base">Total task assigned</p>
                <h3 className="text-2xl lg:text-3xl font-semibold">
                  {totalTask}
                </h3>
              </div>
              <div>
                <p className="text-base">Total task completed</p>
                <h3 className="text-2xl lg:text-3xl font-semibold">
                  {completed.length}
                </h3>
              </div>
              <div>
                <p className="text-base">Pending tasks</p>
                <h3 className="text-2xl lg:text-3xl font-semibold">
                  {progress.length}
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-[#FF90E8] p-10 text-left border-2 border-black">
            <p className="text-base">Productivity Level</p>
            <h2 className="text-3xl mt-2 font-bold">
              {parseInt((progress.length / totalTask) * 100)}% Active
            </h2>
          </div>
        </div>
      </div>
      <EditModal
        taskID={taskID}
        EditModal={editModal}
        setEditModal={setEditModal}
        value={description}
      />
      <DeleteModal
        TaskID={taskID}
        setDeleteModal={setDeleteModal}
        DeleteModal={deleteModal}
      />
      <AddModal AddModal={addModal} setAddModal={setAddModal} />
    </div>
  );
}

export default App;
