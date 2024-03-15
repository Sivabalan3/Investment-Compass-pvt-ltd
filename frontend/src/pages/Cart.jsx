import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
       {cartItems.length === 0 ? (
          <div className="text-blue-500 justify-center">
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
      <section className="n bg-gray-100 py-12 sm:py-16 ">
  <div className="mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-center">
      <h1 className="text-3xl font-semibold text-gray-900">Shopping Cart</h1>
    </div>

    <div className="mx-auto mt-8 w-[80%] md:mt-12">
      <div className="bg-white shadow">
        <div className="px-4 py-6 sm:px-8 sm:py-10">
          <div className="flow-root">
            <ul className="-my-8">
            {cartItems.map((item) => (
              <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                <div className="shrink-0">
                  <img className="h-24 w-24  rounded-lg object-contain border border-gray-300" src={item.image}
                      alt={item.name} />
                </div>

                <div className="relative flex flex-1 flex-col justify-between">
                  <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                    <div className="pr-8 sm:pr-5">
                      <Link to={`/product/ ₹ {item._id}`} className="text-base font-semibold text-gray-900">{item.name.toUpperCase()}</Link>
                      <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{item.brand}</p>
                    </div>

                    <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                      <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">  ₹  {item.price}</p>

                      <div className="sm:order-1">
                        <div className="mx-auto flex h-8 items-stretch text-gray-600">
                      
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                    <button onClick={() => removeFromCartHandler(item._id)} type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" className=""></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
                  ))}
              
            </ul>
          </div>

          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">No of Course Booking</p>
              <p className="text-lg font-semibold text-gray-900">  ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Amount</p>
              <p className="text-lg font-semibold text-gray-900"> ₹ {" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">INR</span> ₹ {" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}</p>
          </div>

          <div className="mt-6 text-center">
            <button disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                     type="button" className="group inline-flex w-[20rem] items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
              Checkout
              <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    )}
    </>
  );
};

export default Cart;
