import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { server } from "../main";

const UpdateNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverImagePrev, setCoverImagePrev] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    // Fetch the note details
    const fetchNote = async () => {
      try {
        const { data } = await axios.get(`${server}/api/notes/${id}`);
        setNote(data.note);
        setTitle(data.note.title);
        setDescription(data.note.description);
        setPrice(data.note.price);
        setCoverImagePrev(`${server}/${data.note.coverImage}`);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchNote();
  }, [id]);

  const changeCoverImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setCoverImagePrev(reader.result);
      setCoverImage(file);
    };
  };

  const changePdfFileHandler = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("price", price);
    if (coverImage) myForm.append("coverImage", coverImage);
    if (pdfFile) myForm.append("notePdf", pdfFile);

    try {
      const { data } = await axios.put(`${server}/api/notes/${id}`, myForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      navigate("/admin/notes"); // Redirect after successful update
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-28 items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-md w-full transition-transform transform hover:scale-105 duration-300 ease-in-out">
        {note ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">Update Note</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-300 text-sm">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-300 text-sm">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-300 text-sm">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="coverImage" className="block text-gray-300 text-sm">Cover Image</label>
                <input
                  type="file"
                  id="coverImage"
                  onChange={changeCoverImageHandler}
                  className="mt-1 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-100 file:text-gray-700
                     hover:file:bg-gray-200 transition-transform duration-300 ease-in-out"
                />
                {coverImagePrev && (
                  <img src={coverImagePrev} alt="Preview" className="mt-2 max-w-full h-auto rounded-md shadow-md" />
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="notePdf" className="block text-gray-300 text-sm">Note PDF</label>
                <input
                  type="file"
                  id="notePdf"
                  onChange={changePdfFileHandler}
                  className="mt-1 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-100 file:text-gray-700
                     hover:file:bg-gray-200 transition-transform duration-300 ease-in-out"
                />
              </div>

              <button
                type="submit"
                disabled={btnLoading}
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
              >
                {btnLoading ? "Please Wait..." : "Update"}
              </button>
            </form>
          </>
        ) : (
          <p className="text-center text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UpdateNote;
