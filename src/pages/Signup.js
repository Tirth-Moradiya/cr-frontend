import { useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signupUser } from "../services/authService"; // Import API function
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      await signupUser(values.email, values.password);
      toast.success("Account created successfully!");
      navigate("/login"); // Redirect to login after success
    } catch (err) {
      toast.error(err.message); // Display Firebase error message in toast
    }
    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="w-96 p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Create an Account
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-all duration-200"
              >
                <FiUserPlus size={20} />{" "}
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full text-white text-sm hover:underline text-center"
              >
                Already have an account? Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
