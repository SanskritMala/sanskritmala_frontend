import { Link } from "react-router-dom";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-600 bg-gray-600 text-gray-100 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>
            Email:{" "}
            <a href="mailto:sanskritmala01@gmail.com" className="hover:text-blue1">
              sanskritmala01@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+918396068147" className="hover:text-blue1">
              +918396068147
            </a>
            ,{" "}
            <a href="tel:+917323908890" className="hover:text-blue1">
              +917323908890
            </a>
          </p>
        </div>

        {/* Useful Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul>
            <li className="mb-2">
              <Link to="/about" className="hover:text-blue1">About Us</Link>
            </li>
            <li className="mb-2">
              <Link to="/courses" className="hover:text-blue1">Courses</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.whatsapp.com/channel/0029Va64wQKJpe8j9Ewb8z37" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue1">
              <FaWhatsapp size={24} />
            </a>
            <a href="https://www.facebook.com/sanskritmalas?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue1">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.instagram.com/sanskrit_mala/" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue1">
              <FaInstagram size={24} />
            </a>
            <a href="https://t.me/+IfUCxE5n3kA2YzI1" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-blue1">
              <FaTelegram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Statement */}
      <div className="mt-10 text-center pt-6">
        <p>&copy; 2024 SanskritMala. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
