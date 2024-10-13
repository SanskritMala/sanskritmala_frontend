import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  // Check user role and subscription
  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    navigate("/");
  }

  // Fetch lectures for the course
  const fetchLectures = async () => {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching lectures:", error);
      setLoading(false);
    }
  };

  // Fetch specific lecture details
  const fetchLecture = async (id) => {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.error("Error fetching lecture:", error);
      setLecLoading(false);
    }
  };

  // Submit new lecture
  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("youtubeLink", youtubeLink);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Explicitly set the content type
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setYoutubeLink(""); // Reset youtubeLink
    } catch (error) {
      console.error("Error adding lecture:", error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
      setBtnLoading(false);
    }
  };

  // Delete lecture
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const [completed, setCompleted] = useState(0);
  const [completedLec, setCompletedLec] = useState(0);
  const [lectLength, setLectLength] = useState(0);
  const [progress, setProgress] = useState([]);

  // Fetch user progress
  const fetchProgress = async () => {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      setCompleted(data.courseProgressPercentage || 0);
      setCompletedLec(data.completedLectures || 0);
      setLectLength(data.allLectures || 0);
      setProgress(data.progress || []);
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  const addProgress = async (id) => {
    try {
      await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      fetchProgress(); // Refresh progress
    } catch (error) {
      console.error("Error adding progress:", error);
    }
  };

  // Function to get YouTube embed URL
  const getEmbedUrl = (url) => {
    const videoId = new URL(url).searchParams.get("v"); // Safely get video ID
    return `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3`;
  };

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col lg:flex-row min-h-screen mt-7 py-20 bg-gray-100 text-blue1 p-4 lg:py-20 xl:py-20 px-4">
          <div className="flex-1 lg:w-2/3 lg:pr-6">
            <div className="bg-gray-300 p-4 rounded-lg shadow-lg mb-6">
              <div className="text-lg font-bold mb-4">
                Lecture Completed: {completedLec} out of {lectLength}
              </div>
              <progress
                className="w-full bg-white text-white rounded"
                value={completed}
                max={100}
              ></progress>
              <div className="text-right text-sm mt-2">{completed} %</div>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg shadow-lg">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture.youtubeLink ? (
                    <iframe
                      src={getEmbedUrl(lecture.youtubeLink)}
                      className="w-full h-64 rounded-lg shadow-lg"
                      controls
                      allowFullScreen
                      title={lecture.title}
                    ></iframe>
                    
                  ) : (
                    <h1 className="text-2xl lg:text-3xl font-bold">Please Select a Lecture</h1>
                  )}
                  <h1 className="text-2xl lg:text-3xl font-bold mt-4">{lecture.title}</h1>
                  <h3 className="text-lg lg:text-xl text-gray-900 font-semibold mt-2">
                    {lecture.description}
                  </h3>
                </>
              )}
            </div>
          </div>
          <div className="flex-1 lg:w-1/3 lg:pl-6">
            {user && user.role === "admin" && (
              <button
                className="bg-blue1 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-orange transition-all duration-300 mb-6"
                onClick={() => setShow(!show)}
              >
                {show ? "Close" : "Add Lecture +"}
              </button>
            )}

            {show && (
              <div className="bg-gray-300 p-4 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">Add Lecture</h2>
                <form onSubmit={submitHandler}>
                  <label htmlFor="title" className="block text-gray-800 text-sm lg:text-base font-medium mb-2">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2 mb-4 rounded border border-gray-400 bg-white text-gray-900"
                  />

                  <label htmlFor="description" className="block text-gray-800 text-sm lg:text-base font-medium mb-2">
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full p-2 mb-4 rounded border border-gray-400 bg-white text-gray-900"
                  />

                  <label htmlFor="youtubeLink" className="block text-gray-800 text-sm lg:text-base font-medium mb-2">
                    YouTube Link
                  </label>
                  <input
                    id="youtubeLink"
                    type="text"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    required
                    className="w-full p-2 mb-4 rounded border border-gray-400 bg-white text-gray-900"
                  />

                  <button
                    type="submit"
                    disabled={btnLoading}
                    className="bg-blue1 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-orange transition-all duration-300"
                  >
                    {btnLoading ? "Adding..." : "Add Lecture"}
                  </button>
                </form>
              </div>
            )}
            <div className="bg-gray-300 p-4 rounded-lg shadow-lg">
              <h1 className="text-2xl lg:text-3xl font-bold mb-4">Lectures</h1>
              {lectures.length === 0 ? (
                <p>No lectures available</p>
              ) : (
                lectures.map((lec) => (
                  <div key={lec._id} className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <h2 className="font-semibold text-lg">{lec.title}</h2>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="bg-blue1 text-white py-1 px-2 rounded-lg shadow-lg hover:bg-orange transition-all duration-300 mr-2"
                        onClick={() => fetchLecture(lec._id)}
                      >
                        Select
                      </button>
                      {user && user.role === "admin" && (
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
                          onClick={() => deleteHandler(lec._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
