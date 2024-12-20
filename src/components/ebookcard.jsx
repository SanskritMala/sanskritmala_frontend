import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { UserData } from "../context/userContext";
import { EbookData } from "../context/ebookContext";
import { server } from "../main"; // Assuming this contains the server URL

const EbookCard = ({ ebook }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchEbooks } = EbookData();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this eBook?")) {
      try {
        const { data } = await axios.delete(`${server}/api/ebook/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchEbooks();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Check if the user has purchased the ebook
  const hasPurchased = user?.purchasedEbooks?.includes(ebook._id);

  return (
    <div className="bg-gray-300 text-blue1 rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out max-w-xs sm:max-w-sm lg:max-w-md h-full flex flex-col">
      <div className="w-full h-48 flex items-center justify-center bg-gray-200">
        {/* Use the Cloudinary URL (assuming ebook.coverImage contains the Cloudinary URL) */}
        <img
          src={ebook.coverImage} // Directly using the Cloudinary image URL stored in the database
          alt={ebook.title}
          className="w-full h-full object-contain transition-transform duration-500 ease-in-out" // Use object-contain to show the full image
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-semibold mb-2">{ebook.title}</h3>
        <p className="text-gray-900 mb-2">Author: {ebook.author}</p>
        <p className="text-gray-900 mb-2">Price: ₹{ebook.price}</p>

        <div className="flex-1 flex items-end">
          {isAuth ? (
            <>
              {user && user.role === "admin" ? (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => navigate(`/ebook/modify/${ebook._id}`)}
                    className="w-full py-2 px-4 bg-blue1 text-white hover:bg-blue-500 textblue1 rounded-md shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => deleteHandler(ebook._id)}
                    className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate(hasPurchased ? `/ebook/read/${ebook._id}` : `/ebook/${ebook._id}`)}
                  className="w-full py-2 px-4 bg-blue1 hover:bg-blue-500 text-white rounded-md shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                >
                  {hasPurchased ? "Read" : "View"}
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

export default EbookCard;
