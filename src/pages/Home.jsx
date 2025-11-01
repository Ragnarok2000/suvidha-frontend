import React from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";

const Home = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      {/* Hero Section */}
      <div className="flex items-center justify-center">
        <div className="max-w-xl bg-white/20 backdrop-blur-md shadow-xl rounded-xl p-8 text-white text-center">
          <h1 className="text-4xl font-extrabold mb-4 animate-pulse">
            ✨ Suvidha Summarizer
          </h1>
          <p className="text-lg mb-6">
            Welcome! This app helps you summarize articles instantly. <br />
            Choose to change your way of reading — start smart, read less, know more.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-100 transition"
            >
              🔐 Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-green-100 transition"
            >
              ✅ Signup
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="mt-16">
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;