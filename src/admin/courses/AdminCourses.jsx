import React, { useState } from "react";
import Layout from "../utils/layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/courseContext";
import CourseCard from "../../components/courseCard/coursecard";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const categories = [
  "Basic",
  "Intermediate",
  "Advanced",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = {
      title,
      description,
      category,
      price,
      createdBy,
      duration,
      youtubeLink,
    };

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setTitle("");
      setDescription("");
      setDuration("");
      setYoutubeLink("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col bg-gray-100 lg:flex-row min-h-screen p-6 py-20">
        {/* Courses List */}
        <div className="lg:w-2/3 lg:pr-6 mb-6 lg:mb-0">
          <h1 className="text-3xl font-semibold mb-4 text-blue1">All Courses</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses && courses.length > 0 ? (
              courses.map((e) => (
                <CourseCard key={e._id} course={e} />
              ))
            ) : (
              <p className="text-gray-800">No Courses Yet</p>
            )}
          </div>
        </div>

        {/* Add Course Form */}
        <div className="lg:w-1/3">
          <div className="bg-gray-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-black">Add Course</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-800">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-800">Description</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-800">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="createdBy" className="block text-gray-800">Created By</label>
                <input
                  type="text"
                  id="createdBy"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-800">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Category</option>
                  {categories.map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="duration" className="block text-gray-800">Duration (hours)</label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="youtubeLink" className="block text-gray-800">YouTube Link</label>
                <input
                  type="url"
                  id="youtubeLink"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={btnLoading}
                className="w-full px-4 py-2 bg-blue1 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
              >
                {btnLoading ? "Please Wait..." : "Add Course"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
