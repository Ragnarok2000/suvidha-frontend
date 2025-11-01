import React, { useState } from "react";
import { signup } from "../services/authServcie";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const initialValues = { username: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Please enter a valid email address")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8) return "Strong";
    return "Medium";
  };

  const handleSubmit = async (values) => {
    try {
      await signup(values);
      alert("Signup successful! Please log in.");
      navigate("/login");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 backdrop-blur-md">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6 animate-pulse">
          🧾 Create Your Account
        </h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <Field
                name="username"
                placeholder="Choose a Email as Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  onKeyUp={(e) => setPasswordStrength(checkPasswordStrength(e.target.value))}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-sm text-green-600"
                >
                  {showPassword ? "🙈 Hide" : "👁️ Show"}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              {passwordStrength && (
                <div
                  className={`text-sm mt-1 ${
                    passwordStrength === "Strong"
                      ? "text-green-600"
                      : passwordStrength === "Medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Password Strength: {passwordStrength}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
            >
              ✅ Signup
            </button>
          </Form>
        </Formik>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            className="text-green-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;