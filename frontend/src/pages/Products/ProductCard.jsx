import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (

    <div className="relative  w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md">
  <Link to={`/product/${p._id}`}>
    <img className=" h-[19rem] rounded-t-lg object-contain justify-center flex w-full"  src={p.image}
            alt={p.name} />
  </Link>
  <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Offer in {p?.quantity}</span>
  <div className="mt-4 px-5 pb-5">
    <Link to={`/product/${p._id}`} className="flex justify-between">
      <h5 className="text-xl font-semibold tracking-tight text-slate-900">{p?.name}</h5>
      <span className=" bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
           {p?.brand}
           </span>
    </Link>
    <div className="mt-2.5 mb-5 flex items-center">
  <Link to={`/product/${p._id}`}><p className="text-slate-800">{p?.description?.substring(0, 60)} ...</p></Link> 
     
    </div>
    <div className="flex items-center justify-between">
      <p>
        <span className="text-2xl font-bold text-slate-900"> {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })} </span>
        <span className="text-md font-semibold text-pink-500 line-through">  {p?.countInStock.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",})}</span>
      </p>
      <button  onClick={() => addToCartHandler(p, 1)} className="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg></button>
    </div>
  </div>
</div>

  );
};

export default ProductCard;
