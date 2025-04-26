
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";




function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher()

  

 useEffect(function () {
  if(!fetcher.data && fetcher.state === 'idle' )
  fetcher.load('/menu')
 } ,[fetcher] )


 
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

 

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order # {id} status </h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 rounded-full text-sm px-3 py-1 uppercase font-semibold text-red-50 tracking-wide" >Priority</span>}
          <span  className="bg-green-500 rounded-full text-sm px-3 py-1 uppercase font-semibold text-green-50 tracking-wide" >{status} order</span>
        </div>
      </div>

      <div className=" gap-2 flex items-center justify-between flex-wrap bg-stone-200 py-6 px-5 ">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-t border-b" >
        {cart.map((item) => <OrderItem item={item} key= {item.id} ingredients={fetcher?.data?.find((i) => i.id === item.pizzaId).ingredients ?? [] } isLoadingIngredients={fetcher.state === 'loading'} /> )}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>

      {!priority && <UpdateOrder  /> }
    
    </div>
  );
}

export async function loader({ params }) {
  const data = await getOrder(params.orderId);
  return data;
}

export default Order;
