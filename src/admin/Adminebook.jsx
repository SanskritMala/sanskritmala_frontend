import React, { useState, useEffect } from "react";
import Layout from "./utils/layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../main";
import BookCard from "../components/bookcard"; // Import BookCard component

const AdminBooks = ({ user }) => {
  const navigate = useNavigate();

  // Redirect to home if user is not admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // State for form inputs and Books
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [image, setImage] = useState(null); // Initialize as null instead of an empty string
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [fetchingBooks, setFetchingBooks] = useState(false);

  // Fetch all Books
  const fetchBooks = async () => {
    setFetchingBooks(true);
    try {
      const { data } = await axios.get(`${server}/api/book/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setBooks(data.books);
    } catch (error) {
      toast.error("Failed to fetch Books.");
    } finally {
      setFetchingBooks(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle image file selection
  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePrev(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form for adding new Book
  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("author", author);
    myForm.append("description", description);
    myForm.append("price", price);
    myForm.append("coverImage", image);

    try {
      const { data } = await axios.post(`${server}/api/book/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(data.message);
      fetchBooks(); // Refresh the list of Books
      // Clear form fields
      setTitle("");
      setAuthor("");
      setDescription("");
      setPrice("");
      setImage(null); // Reset to null
      setImagePrev("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col bg-gray-100 lg:flex-row min-h-screen p-6 py-20">
        {/* Books List */}
        <div className="lg:w-2/3 lg:pr-6 mb-6 lg:mb-0">
          <h1 className="text-3xl font-semibold mb-4 text-blue-600">All Books</h1>
          {fetchingBooks ? (
            <p className="text-gray-800">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.length > 0 ? (
                books.map((book) => (
                  <BookCard key={book._id} book={book} /> // Use BookCard component
                ))
              ) : (
                <p className="text-gray-800">No Books Yet</p>
              )}
            </div>
          )}
        </div>

        {/* Add Book Form */}
        <div className="lg:w-1/3">
          <div className="bg-gray-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Add Book</h2>
            <form onSubmit={submitHandler}>
              {/* Title Input */}
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

              {/* Author Input */}
              <div className="mb-4">
                <label htmlFor="author" className="block text-gray-800">Author</label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-800">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Price Input */}
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

              {/* Cover Image Input */}
              <div className="mb-4">
                <label htmlFor="coverImage" className="block text-gray-800">Cover Image</label>
                <input
                  type="file"
                  id="image"
                  required
                  onChange={changeImageHandler}
                  className="mt-1 block w-full text-sm text-gray-800
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-100 file:text-gray-700
                     hover:file:bg-gray-200"
                />
                {imagePrev && (
                  <img src={imagePrev} alt="Preview" className="mt-2 max-w-full h-auto rounded-md" />
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={btnLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
              >
                {btnLoading ? "Please Wait..." : "Add Book"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminBooks;
