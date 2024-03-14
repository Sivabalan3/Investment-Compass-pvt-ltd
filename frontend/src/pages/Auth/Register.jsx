import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
   <>
   
<div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
            <div className="hidden bg-cover lg:block lg:w-2/3"style={{backgroundImage: "url('https://akinon.com/wp-content/uploads/banner_cover.jpg')"}}>
                <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <h2 className="text-4xl font-bold text-white">My-udemy</h2>
                        
                        <p className="max-w-xl mt-3 text-gray-300"> “Customers don’t expect you to be perfect. They do expect you to fix things when they go wrong.” <strong><i>– Donald Porter, British Airways</i></strong></p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div className="flex-1">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Register</h2>
                        
                        <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={submitHandler}>
                        <div>
                              <label for="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Name</label>
                                <input type="text" name="username"   id="name" value={username}
              onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                <input type="email" name="email" id="email" placeholder="demo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            
                                <div className="flex justify-between mb-2">
                                    <label for="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                   
                                </div>

                                <input type="password" name="password" id="password"   
              value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              <div>
                                <label for="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirmed Password</label>
                                <input type="password"
              id="confirmPassword" 
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                          

                            <div className="mt-6">
                                <button
                                disabled={isLoading}
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                 {isLoading ? "Please Wait..." : "Sign Up"}
                                </button>
                            </div>

                        </form>

                        <p className="mt-6 text-sm text-center text-gray-400">Alredy have an account yet? <Link to="/login" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign in</Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Register;
