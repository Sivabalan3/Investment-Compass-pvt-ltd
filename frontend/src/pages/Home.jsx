import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import Foter from "./Foter";
import Ads from "./Ads";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className=" ml-10">
            <h1 className=" mt-[6rem] text-[3rem]">
             All courses
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-[2rem] ">
  {data.products.map((product) => (
    <div key={product._id}>
      <Product product={product} />
    </div>
  ))}
</div>
        </>
      )}
      <Ads/>
      <Foter/>
    </>
  );
};

export default Home;
