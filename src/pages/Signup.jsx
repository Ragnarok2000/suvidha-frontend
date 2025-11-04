import React, { useState } from "react";
import { signup } from "../services/authServcie";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const initialValues = { username: "", password: "" };

  // Updated validation schema with strong password requirements
  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Please enter a valid email address")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[@#$%^&+=!]/, "Password must contain at least one special character (@#$%^&+=!)")
      .required("Password is required"),
  });

  // Check password requirements in real-time
  const checkPasswordRequirements = (password) => {
    setPasswordChecks({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[@#$%^&+=!]/.test(password),
    });
  };

  const handleSubmit = async (values) => {
    try {
      await signup(values);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      // Display backend error message if available
      if (err.response && err.response.data) {
        const errors = err.response.data;
        if (typeof errors === 'object') {
          const errorMsg = Object.values(errors).join(', ');
          alert(`Signup failed: ${errorMsg}`);
        } else {
          alert(`Signup failed: ${errors}`);
        }
      } else {
        alert("Signup failed. Please try again.");
      }
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
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <Field
                name="username"
                placeholder="Choose an Email as Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  onKeyUp={(e) => checkPasswordRequirements(e.target.value)}
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

              {/* Password Requirements Checklist */}
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Password must contain:</p>
                <ul className="space-y-1 text-xs">
                  <li className={passwordChecks.minLength ? "text-green-600" : "text-gray-500"}>
                    {passwordChecks.minLength ? "✓" : "○"} At least 8 characters
                  </li>
                  <li className={passwordChecks.hasUppercase ? "text-green-600" : "text-gray-500"}>
                    {passwordChecks.hasUppercase ? "✓" : "○"} One uppercase letter (A-Z)
                  </li>
                  <li className={passwordChecks.hasLowercase ? "text-green-600" : "text-gray-500"}>
                    {passwordChecks.hasLowercase ? "✓" : "○"} One lowercase letter (a-z)
                  </li>
                  <li className={passwordChecks.hasNumber ? "text-green-600" : "text-gray-500"}>
                    {passwordChecks.hasNumber ? "✓" : "○"} One number (0-9)
                  </li>
                  <li className={passwordChecks.hasSpecialChar ? "text-green-600" : "text-gray-500"}>
                    {passwordChecks.hasSpecialChar ? "✓" : "○"} One special character (@#$%^&+=!)
                  </li>
                </ul>
              </div>
            </div>

            {/* Submit Button */}
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
