import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import {Autoplay, Pagination, Navigation } from 'swiper/modules';
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const slides=[{imgs:"https://www.intertranslations.com/wp-content/uploads/2023/11/iStock-1353577196.jpg"},
  {imgs:"https://www.drishtiias.com/images/blogs/blog-cover-03.jpg"}, 
  {imgs:"https://icnn.in/wp-content/uploads/2023/12/0a756d9a-27e4-4161-8592-986a4a6b2623.webp"},
  {imgs:"https://images.indianexpress.com/2020/03/classroom.jpg"},
 ,
  ,]
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className=" lg:block xl:block md:block mt-[-12px]">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((img,index)=>(
          <SwiperSlide key={index}><img src={img.imgs} alt="images"/></SwiperSlide>
        
        ))}  
      </Swiper>
      )}
    </div>
  );
};

export default ProductCarousel;
