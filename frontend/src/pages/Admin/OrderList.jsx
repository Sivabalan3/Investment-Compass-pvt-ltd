import React,{useState} from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
  
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
    <select id="small" className="block p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option >last 30 days</option>
    <option >3 Months</option>
    <option >6 Monts</option>
    <option >1 Year</option>
    <option >above 1 Year</option>
  </select>
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search htmlFor items"/>
        </div>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    Items
                </th>
                <th scope="col" className="px-6 py-3">
                    Id
                </th>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Total
                </th>
                <th scope="col" className="px-6 py-3">
              Paid
                </th>
                <th scope="col" className="px-6 py-3">
              Delivery
                </th>
                <th scope="col" className="px-6 py-3">
             
                </th>
            </tr>
        </thead>
        <tbody>
        {orders.map((order,index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <td>
                 <img
                    src={order.orderItems[0].image}
                   alt={order._id}
                     className="w-[5rem] pt-4"
                  />
                  </td>
                <td className="px-6 py-4">
                 {order._id}
                </td>
                <td className="px-6 py-4">
                {order.user ? order.user.username : "N/A"}
                </td>
                <td className="px-6 py-4">
                {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>
                <td className="px-6 py-4">
                $ {order.totalPrice}
                </td>
                <td className="px-6 py-4">
                {order.isPaid ? (
                     <p className="p-1 text-center bg-green-400 text-white w-[6rem] rounded-full">
                      Completed
                     </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 text-white w-[6rem] rounded-full">
                       Pending
                     </p>
                   )}
                </td>
                <td className="px-6 py-4">
                {order.isDelivered ? (
                     <p className="p-1 text-center bg-green-400 text-white w-[6rem] rounded-full">
                     Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 text-white w-[6rem] rounded-full">
                       Pending
                 </p>
                   )}
                </td>
                <td className="px-6 py-4">
                <Link to={`/order/${order._id}`}>
                     <button className="text-blue-500 font-bold">More</button>
                   </Link>
                </td>
            </tr>
        ))}
            
            
            
        </tbody>
    </table>
</div>

      )}
    </>
  );
};

export default OrderList;
