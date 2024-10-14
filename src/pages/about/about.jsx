import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import values from '../../assets/values.png';
import mission from '../../assets/mission.jpg';
import vision from '../../assets/vision.jpeg';
import about from '../../assets/about.jpg';
const AboutUs = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleGetStartedClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* About Section */}
      <section className="flex flex-col lg:flex-row items-center py-28 px-4 lg:px-16 gap-8" data-aos="fade-up">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-blue-600 mb-4">About Us</h1>
          <p className="text-lg mb-6">
            Welcome to Sanskrit Mala, your ultimate destination for comprehensive and accessible education resources.
            Our mission is to provide high-quality educational materials and courses to learners of all ages and
            backgrounds. We strive to make learning a seamless and enriching experience through our diverse range of
            offerings.
          </p>
          <button 
            className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
            onClick={handleGetStartedClick} // Attach the click handler
          >
            Get Started
          </button>
        </div>
        <div className="flex-1">
          <img 
            src={about} 
            alt="About Us" 
            className="w-full h-auto max-h-80 object-cover rounded-lg shadow-lg" 
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="flex flex-col lg:flex-row items-center py-16 px-4 lg:px-16 gap-8" data-aos="fade-up">
        <div className="flex-1">
          <img 
            src={vision}
            alt="Vision" 
           className="w-full h-auto max-h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-blue-600 mb-4">Vision</h1>
          <p className="text-lg">
            At Sanskrit Mala, our vision is to empower learners globally by providing them with unparalleled access to
            educational resources. We aim to be a beacon of knowledge, fostering an environment where learning is
            limitless and accessible to everyone. Our goal is to integrate traditional learning with modern technology,
            creating a holistic and engaging educational experience.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col lg:flex-row items-center py-16 px-4 lg:px-16 gap-8" data-aos="fade-up">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-blue-600 mb-4">Mission</h1>
          <p className="text-lg">
            Our mission at Sanskrit Mala is to bridge the gap between learners and quality education. We are committed
            to offering a vast array of books, e-books, test series, notes, and courses that cater to various
            educational needs. By leveraging digital platforms, we aim to make learning flexible, interactive, and
            enjoyable. We believe in continuous improvement and strive to update our resources to meet the evolving
            educational landscape.
          </p>
        </div>
        <div className="flex-1">
        <img 
      src={mission}
      alt="Mission" 
      className="w-auto h-auto max-h-80 object-contain rounded-lg shadow-lg" // Adjusted to max-h-80 with object-contain
    />
        </div>
      </section>

      {/* Values Section */}
      <section className="flex flex-col lg:flex-row items-center py-16 px-4 lg:px-16 gap-8" data-aos="fade-up">
  <div className="flex-1">
    <img 
      src={values}
      alt="Values" 
      className="w-full h-auto  max-h-80 object-contain rounded-lg shadow-lg" // Changed to max-h-80 for a smaller size with object-contain
    />
  </div>
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-blue-600 mb-4">Our Values</h1>
          <p className="text-lg">
            We uphold the highest standards of integrity in all our actions, ensuring that everything we do is rooted in honesty and ethical principles. Striving for excellence in every aspect of our work, we are committed to continuous improvement and innovation. Inclusivity is at the heart of our mission, as we believe in providing access to quality education for everyone, regardless of their background or circumstances. We emphasize the importance of collaboration, working closely with our partners, educators, and learners to achieve our shared goals. Moreover, we promote a culture of lifelong learning, encouraging curiosity and a passion for knowledge in all individuals.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center py-16 px-4 lg:px-16 bg-blue-100">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-blue-600 mb-6">Contact Us</h1>
        <p className="text-lg mb-4">
          We are here to assist you with any inquiries or support you may need. Reach out to us using the contact details below:
        </p>
        <p className="text-lg mb-4">
          <strong className="text-blue-600">Phone:</strong> 8396068147, 7323908890
        </p>
        <p className="text-lg">
          We look forward to hearing from you and assisting you with your needs.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
