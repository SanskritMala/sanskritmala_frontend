import React from "react";
import { server } from "../main";
import { UserData } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BookData } from "../context/bookContext";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchBooks } = BookData();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const { data } = await axios.delete(`${server}/api/book/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchBooks();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-gray-300 text-blue1 rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out max-w-xs sm:max-w-sm lg:max-w-md h-full flex flex-col">
      {/* Display the cover image with object-contain to fit within the height */}
      <img
        src={book.coverImage} // Use Cloudinary URL for the image
        alt={book.title}
        className="w-full bg-white h-48 object-contain transition-transform duration-500 ease-in-out hover:scale-110" // Use object-contain for full image visibility
      />
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-semibold mb-2">{book.title}</h3>
        <p className="text-gray-900 mb-2">Author: {book.author}</p>
        <p className="text-gray-900 mb-2">Price: ₹{book.price}</p>

        <div className="flex-1 flex items-end">
          {isAuth ? (
            <>
              {user && user.role === "admin" && (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => navigate(`/book/modify/${book._id}`)}
                    className="w-full py-2 px-4 bg-blue1 hover:bg-blue-500 text-white rounded-md shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => deleteHandler(book._id)}
                    className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              )}
              {user && user.role !== "admin" && (
                <button
                  onClick={() => navigate(`/book/${book._id}`)}
                  className="w-full py-2 px-4 bg-blue1 hover:bg-blue-500 text-white rounded-md shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                >
                  View
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 px-4 bg-blue1 hover:bg-blue-500 text-white rounded-md shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              Login to View
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
