import React, { useState, useEffect } from "react";
import Layout from "./utils/layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../main";
import NoteCard from "../components/notesCard"; // Import NoteCard component

const AdminNotes = ({ user }) => {
  const navigate = useNavigate();

  // Redirect to home if user is not admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // State for form inputs and notes
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [coverImage, setCoverImage] = useState(null); // Initialize as null
  const [coverImagePrev, setCoverImagePrev] = useState("");
  const [notePdf, setNotePdf] = useState(null); // Initialize as null
  const [btnLoading, setBtnLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [fetchingNotes, setFetchingNotes] = useState(false);

  // Fetch all notes
  const fetchNotes = async () => {
    setFetchingNotes(true);
    try {
      const { data } = await axios.get(`${server}/api/notes/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setNotes(data.notes);
    } catch (error) {
      toast.error("Failed to fetch notes.");
    } finally {
      setFetchingNotes(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle cover image file selection
 // Handle cover image selection for notes
const changeCoverImageHandler = (e) => {
  const file = e.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          setCoverImagePrev(reader.result); // Assuming you have a state for note image preview
          setCoverImage(file); // Assuming you have a state for note image
      };
      reader.readAsDataURL(file);
  }
};

// Handle note file selection (PDF)
const changeNotePdfHandler = (e) => {
  const file = e.target.files[0];
  if (file) {
      setNotePdf(file); // Assuming you have a state for note file
  }
};

// Submit form for adding new note
const submitHandler = async (e) => {
  e.preventDefault();
  setBtnLoading(true);

  const myForm = new FormData();
  myForm.append("title", nTitle); // Assuming you have a state for note title
  myForm.append("description", Description); // Assuming you have a state for note description
  myForm.append("price", Price); // Assuming you have a state for note price
  myForm.append("coverImage", coverImage); // Assuming you have a state for note cover image
  myForm.append("notePdf", notePdf); // Assuming you have a state for note file

  try {
      const { data } = await axios.post(`${server}/api/note/new`, myForm, {
          headers: {
              token: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
          },
      });

      toast.success(data.message);
      fetchNotes(); // Refresh the list of notes
      // Clear form fields
      setTitle(""); // Reset note title
      setNDescription(""); // Reset note description
      setPrice(""); // Reset note price
      setCoverImage(null); // Reset note image to null
      setCoverImagePrev(""); // Reset note image preview
      setNotePdf(null); // Reset note file to null
  } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
      setBtnLoading(false);
  }
};


  return (
    <Layout>
      <div className="flex flex-col bg-gray-100 lg:flex-row min-h-screen p-6 py-20">
        {/* Notes List */}
        <div className="lg:w-2/3 lg:pr-6 mb-6 lg:mb-0">
          <h1 className="text-3xl font-semibold mb-4 text-blue-600">All Notes</h1>
          {fetchingNotes ? (
            <p className="text-gray-800">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <NoteCard key={note._id} note={note} /> // Use NoteCard component
                ))
              ) : (
                <p className="text-gray-800">No Notes Yet</p>
              )}
            </div>
          )}
        </div>

        {/* Add Note Form */}
        <div className="lg:w-1/3">
          <div className="bg-gray-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Add Note</h2>
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
                  id="coverImage"
                  required
                  onChange={changeCoverImageHandler}
                  className="mt-1 block w-full text-sm text-gray-800
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-100 file:text-gray-700
                     hover:file:bg-gray-200"
                />
                {coverImagePrev && (
                  <img src={coverImagePrev} alt="Preview" className="mt-2 max-w-full h-auto rounded-md" />
                )}
              </div>

              {/* Note PDF Input */}
              <div className="mb-4">
                <label htmlFor="notePdf" className="block text-gray-800">Note PDF</label>
                <input
                  type="file"
                  id="notePdf"
                  required
                  onChange={changeNotePdfHandler}
                  className="mt-1 block w-full text-sm text-gray-800
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-100 file:text-gray-700
                     hover:file:bg-gray-200"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={btnLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
              >
                {btnLoading ? "Please Wait..." : "Add Note"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminNotes;
