import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const SignUp = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    role: "student",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.lo;
    console.log(formData);
    const res = await axios.post("/api/users/signup", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    setFormData(initialState);
  };
  return (
    <div>
      <section className="bg-gray-50 font-poppins ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-4 ">
          <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign Up
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Username
                  </label>
                  <input
                    onChange={handleChange}
                    value={formData.username}
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     "
                    placeholder="username"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    value={formData.email}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={formData.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     "
                    required=""
                  />
                </div>

                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-900 "
                >
                  Who are you
                </label>
                <select
                  required
                  value={formData?.role}
                  onChange={handleChange}
                  name="role"
                  id="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 "
                >
                  <option value="student">Student</option>
                  <option value="landlord">Landlord</option>
                </select>

                <button
                  type="submit"
                  className="w-full  bg-primary-600  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Already have an account?
                  <Link
                    to="/signin"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
