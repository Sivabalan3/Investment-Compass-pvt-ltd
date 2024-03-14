import { useState } from "react";
import { AiOutlineShoppingCart} from "react-icons/ai";
import { FaHeart,FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [hide,sethide]=useState(false)
  const [navhide,setnavhide]=useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

const handlehide=()=>{
  sethide(!hide)
}
const handlenavhide=()=>{
  setnavhide(!navhide)
}
  return (
    <>  
     
    <nav className="bg-gray-800">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
       
        <button onClick={handlenavhide} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
          
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
         
          <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
          <img className="h-8 w-auto rounded-full cursor-pointer" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDDmu4LvJ7dLZHqWvrqCE944cYY6kiJ7Y4eodNjHWpy89NJBQCGeLYYEOnCT-whdh5wqg&usqp=CAU" alt="Your Company"/>
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            
            <Link to="/" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</Link>
            <Link to="/shop" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Shop</Link>
            <Link to="/cart" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Cart</Link>
            <Link to="/favorite" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Favorite</Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center gap-x-4 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className=" mr-2" size={26} />
            
          </div>

          <div className="absolute mt-[-15px]">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>
        <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <Link to="/favorite" className="flex relative">
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
            <FaHeart className=" mr-2 mt-2 w-6 h-6" size={20} />
        
            <FavoritesCount />
          </div>
        </Link>
        </button>

  
        <div className="relative ml-3">
  {userInfo && userInfo.isAdmin ? (
    <div>
      <button onClick={handlehide} type="button" className="rounded-full ring ring-green-400 ring-offset-base-100 ring-offset-2 relative flex  bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
        <span className="sr-only">Open user menu</span>

        <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#fbbf24] rounded-full dark:bg-gray-600">
    <h1 class="font-bold text-lg text-white dark:text-gray-300">{userInfo.username.charAt(0).toUpperCase()}</h1>
</div>
        {/* <img className="h-8 w-8 rounded-full" src={userInfo.image} alt=""/> */}
      </button>
      
      <div className={hide ? "absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
        <div className=" divide-y divide-gray-400">
        <h1  className="block px-4 py-2  text-gray-700 font-bold">{userInfo.username}</h1>
        <Link to="/profile"  className="block px-4 py-2 text-sm text-gray-700">{userInfo.email}</Link>
        </div>
        <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700">Dashboard</Link>
        <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-gray-700">Products</Link>
        <Link to="/admin/categorylist" className="block px-4 py-2 text-sm text-gray-700">Category</Link>
        <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-gray-700">OrderList</Link>
        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700">Profile</Link>
        <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-gray-700">User</Link>
        <button onClick={logoutHandler} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</button>
      </div>
      
    </div>
  ):
  
  <div>
   <button onClick={handlehide} className="rounded-full ring ring-green-400 ring-offset-base-100 ring-offset-2 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#fbbf24]  dark:bg-gray-600">
    <h1 className="font-bold text-lg text-white dark:text-gray-300">{userInfo ? userInfo.username.charAt(0).toUpperCase():<FaUser className="w-4 h-4" />}</h1>
</button>
{userInfo && (
  <div className={hide ? "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
  <div className=" divide-y divide-gray-400">
        <h1  className="block px-4 py-2  text-gray-700 font-bold">{userInfo.username}</h1>
        <Link to="/profile"  className="block px-4 py-2 text-sm text-gray-700">{userInfo.email}</Link>
        </div>
  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700">Profile</Link>
 
  <button onClick={logoutHandler} className="block px-4 py-2 text-sm text-gray-700" >Sign out</button>
</div>
)}
</div>
  }
  
</div>

      </div>
    </div>
  </div>


  <div className="sm:hidden" >
  {navhide ? null : (
    <div className="space-y-1 px-2 pb-3 pt-2">
  
      <Link to='/' className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</Link>
      <Link to="/shop" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Shop</Link>
      <Link to='/cart' className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Cart</Link>
      <Link to='/favorite' className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Favorite</Link>
    </div>
     )}
  </div>
  
</nav>
</>

  );
};

export default Navigation;
