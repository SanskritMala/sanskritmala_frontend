import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotesData } from "../context/notesContext"; // Adjust the path as necessary
import { server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../context/userContext";
import Loading from "../components/loading/loading";

const NotesDescription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { fetchNote, note } = NotesData();
  const { fetchUser, user } = UserData(); // Add user here

  useEffect(() => {
    fetchNote(params.id);
  }, [params.id]);

  const handleAccessNote = async () => {
    setLoading(true);

    try {
      // Directly access the note
      const { data } = await axios.post(
        `${server}/api/notes/access/${params.id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      await fetchUser(); // Refresh user data
      toast.success("Note added successfully to your collection!");
      setLoading(false);

      // Use user._id if it’s available
      if (user && user._id) {
        navigate(`/${user._id}/dashboard`);
      } else {
        toast.error("User ID not found, unable to navigate to dashboard.");
      }
    } catch (error) {
      toast.error("Failed to access the note");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {note && (
            <div className="container mx-auto px-4 py-28 lg:py-40">
              <div className="bg-gray-300 text-blue1 rounded-lg shadow-xl overflow-hidden w-full max-w-4xl mx-auto transition-transform transform hover:scale-105 duration-300 ease-in-out">
                <div className="flex flex-col lg:flex-row">
                  <img
                    src={note.coverImage}
                    alt={note.title}
                    className="w-full lg:w-1/2 h-64 lg:h-80 object-cover rounded-lg shadow-md"
                  />
                  <div className="lg:ml-6 flex-1 p-6">
                    <h2 className="text-4xl font-bold mb-4 text-indigo-400">{note.title}</h2>
                    <p className="text-lg mb-4 text-gray-900">{note.description}</p>
                    <p className="text-xl font-semibold mb-6 text-blue1">Free</p>

                    <button
                      onClick={handleAccessNote}
                      className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-lg transition-transform transform hover:scale-105 duration-300"
                    >
                      Access Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NotesDescription;
