import { useSelector } from "react-redux";

import DeleteItem from "../../ui/DeleteItem";
import UpdateItemQuantity from "../../ui/UpdateItemQuantity";
import { formatCurrency } from "../../utils/helpers";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity  = useSelector(getCurrentQuantityById(pizzaId))

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between ">
      <p className=" mb-1 sm:mb-0" >
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6" > 
        <p className="text-sm font-bold mb-1  ">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity = {currentQuantity} />
        <DeleteItem pizzaId = {pizzaId} />
      </div>
   
    </li>
  );
}

export default CartItem;
