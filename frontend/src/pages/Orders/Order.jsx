import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
   <>

    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32 bo">
  <p  className="text-2xl font-bold text-gray-800">Details</p>
 
</div>
<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 text-gray-900  border-2">
  <div className="px-4 pt-8">
    <p className="text-xl font-medium">Booking Summary</p>
    <p className="text-gray-400">Check your items. And select a suitable Course.</p>
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
    {order.orderItems.map((item, index) => (
      <div className="flex flex-col rounded-lg bg-white sm:flex-row">
        <img className="m-2 h-24 w-28 rounded-md border object-contain object-center"  src={item.image}   alt={item.name} />
        <div className="flex w-full flex-col px-4 py-4">
        <Link to={`/product/${item.product}`}><span className="font-semibold">{item.name.toUpperCase()}</span></Link>
          <span className="float-right text-gray-400">{item.brand}</span>
          <p className="text-lg font-bold">${item.price}</p>
        </div>
      </div>
    ))}
    </div>

    <p className="mt-8 text-lg font-medium">Booking Details</p>
    <form className="mt-5 grid gap-6">
      <div className="relative">
        <input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
          <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
          <div className="ml-5">
            <span className="mt-2 "><strong>Order Id : </strong> {order._id}</span>
            <p className=""><strong>Name : </strong> {order.user.username}</p>
            <p className=""><strong>Email : </strong> {order.user.email}</p>
            <p className=""><strong>Address : </strong>  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            <p className=""><strong>Payment Method : </strong>  {order.paymentMethod}</p>
          </div>
        </label>
      </div>
     
    </form>
  </div>
  <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
    <p className="text-xl font-medium">Payment Details</p>
    <p className="text-gray-400">Complete your order by providing your payment details.</p>
         {!order.isPaid && (
           <div>
             {loadingPay && <Loader />}{" "}
             {isPending ? (
               <Loader />
             ) : (
               <div>
                 <div>
                   <PayPalButtons
                     createOrder={createOrder}
                     onApprove={onApprove}
                     onError={onError}
                   ></PayPalButtons>
                 </div>
               </div>
             )}
           </div>
         )}
          {loadingDeliver && <Loader />}
         {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
           <div>
             <button
               type="button"
               className="bg-pink-500 text-white w-full py-2"
               onClick={deliverHandler}
            >
               Mark As Delivered
             </button>
          </div>
         )}
    <Link to='/'><button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Back to Home</button></Link>
  </div>
</div>
</>
  );
};

export default Order;
