import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/courseContext";
import Loading from "../../components/loading/loading"; // Import your loading component
import ReactPlayer from "react-player"; // Import React Player

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourse = async () => {
      try {
        await fetchCourse(params.id);
      } catch (error) {
        setError("Error fetching course data. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
      navigate("/");
    } else {
      getCourse();
    }
  }, [fetchCourse, params.id, navigate, user]);

  if (loading) {
    return <Loading />; // Show loading component while fetching data
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error message if there's an issue
  }

  return (
    <>
      {course && (
        <div className="flex flex-col mt-10 items-center justify-center min-h-screen px-4 py-6 md:py-10 bg-gray-100 text-blue1">
          <div className="w-full max-w-2xl mb-6 rounded-lg shadow-lg overflow-hidden">
            <ReactPlayer
              url={course.youtubeLink} // Use the YouTube link for the course video
              width="100%"
              height="300px" // Adjusted height for a more professional look
              className="rounded-lg"
              controls={true} // Show video controls
              onError={(e) => console.error("Error loading video:", e)} // Error handling
            />
          </div>
          <div className="flex flex-col items-center w-full max-w-2xl text-center"> {/* Centering text and button */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue1 mb-2 transition-transform transform hover:scale-105">
              {course.title}
            </h2>
            <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 transition-transform transform hover:scale-105">
              {course.description}
            </h4>
            <h5 className="text-base md:text-lg font-medium text-gray-800 mb-1">
              by - {course.createdBy}
            </h5>
            <h5 className="text-base md:text-lg font-medium text-gray-800 mb-4">
              Duration - {course.duration} weeks
            </h5>
            <Link
              to={`/lectures/${course._id}`}
              className="px-4 py-2 md:px-6 md:py-3 bg-green-500 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600"
            >
              <h2 className="text-base md:text-lg font-bold">Lectures</h2>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
