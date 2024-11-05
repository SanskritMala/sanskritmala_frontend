import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/courseContext";
import { UserData } from "../../context/userContext";
import Loading from "../../components/loading/loading";
import ReactPlayer from "react-player";
import axios from "axios";
import { toast } from 'react-toastify';
import { server } from "../../main";

const CourseDescription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const { fetchCourse, course } = CourseData();
  const { fetchUser, user } = UserData();

  useEffect(() => {
    const getCourse = async () => {
      try {
        await fetchCourse(params.id);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    const getUser = async () => {
      try {
        await fetchUser(); // Fetch user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    getCourse();
    getUser();
  }, [params.id, fetchCourse, fetchUser]);

  const checkoutHandler = async (event) => {
    event.preventDefault();
    console.log("Buy Now button clicked!");

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      if (course.price === 0) {
        // If the course is free, directly enroll the user
        const response = await axios.post(
          `${server}/api/course/checkout/${params.id}`,
          {},
          {
            headers: {
              token,
            },
          }
        );

        toast.success(response.data.message);
        navigate(`/${user._id}/dashboard`); // Redirect to a page that lists user courses
        setLoading(false);
        return;
      }

      const { data: { order } } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      console.log("Order Data:", order); // Debugging log

      const options = {
        key: "rzp_live_YKAs7EQjRlk8Kt",
        amount: order.amount, // Make sure this is in paise
        currency: "INR",
        name: "SanskritMala",
        description: "Learn with us",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                headers: {
                  token,
                },
              }
            );

            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error(error.response.data.message);
            setLoading(false);
          }
        },
        theme: {
          color: "#FFAE42",
        },
      };

      console.log("Razorpay options:", options); // Debugging log
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating checkout:", error);
      toast.error("Failed to initiate payment");
      setLoading(false);
    }
  };

  if (loading || loadingUser) {
    return <Loading />;
  }

  return (
    <div className="container bg-gray-100 mx-auto px-4 py-40">
      {course && (
        <div className="bg-gray-300 text-blue1 rounded-lg shadow-xl overflow-hidden w-full max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <ReactPlayer
                url={course.youtubeLink}
                width="100%"
                height="100%"
                className="rounded-lg shadow-md"
                controls={true}
                onError={(e) => {
                  console.error("Error loading video:", e);
                  toast.error("Failed to load video. Please check if you have any ad blockers enabled.");
                }} 
              />
            </div>
            <div className="lg:ml-6 flex-1 p-6">
              <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
              <p className="text-lg text-gray-900 mb-2">
                Instructor: <span className="font-semibold">{course.createdBy}</span>
              </p>
              <p className="text-lg text-gray-900 mb-4">
                Duration: <span className="font-semibold">{course.duration} weeks</span>
              </p>
              <p className="text-lg text-gray-800 mb-6">{course.description}</p>
              <p className="text-xl text-gray-900 font-semibold mb-6">
                Get started with this course for just ₹{course.price}
              </p>
              <button
                onClick={checkoutHandler}
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-lg transition-transform transform hover:scale-105 duration-300"
              >
                {course.price === 0 ? "Enroll Now" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDescription;
