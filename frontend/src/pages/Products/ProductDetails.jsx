import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>

<section className="py-12 sm:py-16 bg-white"> 

  <div className="container mx-auto px-4">

    <div className="bg-gray-200 lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16 border border-gray-800 rounded-md">
      <div className="lg:col-span-3 lg:row-end-1 border-r-2">
        <div className="lg:flex lg:items-start">
          <div className="lg:order-2 lg:ml-5 ">
            
            <div className="max-w-xl overflow-hidden rounded-lg">
            
              <img className="h-full w-full xl:w-[25rem] xl:h-[20rem] max-w-full object-contain mt-14 " src={product.image}
                alt={product.name} />
                
            </div>
          </div>

          
        </div>
      </div>

      <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2 px-4">
        <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{product.name.toUpperCase()}</h1>
        
        <div className="mt-5 flex items-center">
          <div className="flex items-center text-amber-400">
            
            <Ratings 
                  value={product.rating}
                 
                />
          </div>
          <p className="ml-2 text-sm font-medium text-gray-500">{product.numReviews} Reviews</p>
        </div>
  
        <h2 className="mt-8 text-2xl text-gray-900"> ₹ {product.price}</h2>
        <div className="mt-3   gap-1">
         
           <h1 className="text-gray-600"><strong>Description :</strong>  {product.description}</h1>  
          <label className="text-gray-600">
          <h1><strong>Brand : </strong> {product.brand}</h1>
          </label>
        </div>
        <div className="mt-3 gap-1">
        <label className="text-gray-600">
          <h1><strong>Added : </strong> {moment(product.createAt).fromNow()}</h1>
          </label>
          <label className="text-gray-600 flex gap-2">
          <FaStar className="mt-[3px] text-green-400" /><strong>Ratings:</strong> {rating}
          </label>
          
        </div>

        <div className="mt-10 flex flex-col items-center justify-betweenspace-y-4 border-t   py-4 sm:flex-row sm:space-y-0">
          

          <button  onClick={addToCartHandler}
                  disabled={product.countInStock === 0} type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to cart
          </button>
        </div>

      </div>

      
    </div>
  </div>
  <div className="mt-[1rem] px-12 flex flex-wrap items-center justify-center py-6 text-gray-800 bg-gray-200 xl:mx-4">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
</section>

        </>
      )}
    </>
  );
};

export default ProductDetails;
