import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";

const Product = ({ product }) => {
  return (
    <>
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
  <Link to={`/product/${product._id}`} className="relative mx-1 mt-3 flex h-60 overflow-hidden rounded-xl" >
    <img className="object-contain w-[60rem]" src={product.image}
          alt={product.name} />
  </Link>
   <HeartIcon product={product} />
   
  <div className="mt-4 px-5 pb-5">
     <Link to={`/product/${product._id}`}>
      <h5 className="text-xl tracking-tight text-slate-900">{product.name.toUpperCase()}</h5>
    </Link>
    <div className="mt-2 mb-5 flex items-center justify-between">
      <p>
        <span className="text-3xl font-bold text-slate-900">${product.price}</span>
        <span className="text-sm text-red-600 line-through font-medium">$ {product.countInStock}</span>
      </p>
      <div className="flex items-center">
      
        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
        <Ratings  value={product.rating}/>
      </div>
    </div>
   
  </div>
</div>
    </>
  );
};

export default Product;
