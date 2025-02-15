import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  loginWithEmail,
  loginWithGoogle,
  logout,
} from "../services/authService";
import { LogIn, LogOut } from "lucide-react";

const Auth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { user, error } = await loginWithEmail(
        values.email,
        values.password
      );
      if (error) {
        toast.error(error);
      } else {
        setUser(user);
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    },
  });

  const handleGoogleLogin = async () => {
    const { user, error } = await loginWithGoogle();

    console.log("user, error", user, error);
    if (error) {
      toast.error(error);
    } else {
      setUser(user);
      toast.success("Google login successful!");
      setTimeout(() => navigate("/dashboard"), 2000);
    }
  };

  const handleLogout = async () => {
    const { success, error } = await logout();
    if (success) {
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/");
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="w-96 p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-all duration-200"
          >
            <LogIn size={20} /> Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-gray-900 py-2 rounded-md shadow-md hover:bg-gray-200 transition-all duration-200"
        >
          Sign in with Google
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="w-full text-white text-sm mt-2 hover:underline"
        >
          Don't have an account? Sign up
        </button>

        {user && (
          <div className="mt-6 text-center">
            <p className="text-white">Welcome, {user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-2 flex items-center gap-2 justify-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-all duration-200"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Auth;
