
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";


const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {

  const [withPriority , setWithPriority] = useState(false)
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const cart = useSelector(getCart)
  const dispatch = useDispatch()
  const {username ,status : addressStatus , position , address , error: errorAddress }  = useSelector(state => state.user);
  const isLoadingAdress  = addressStatus === "loading"
  const totalCartPrice = useSelector(getCartPrice);
  const priorityPrice = withPriority ? 0.2 * totalCartPrice : 0; 
  const totalPrice = totalCartPrice + priorityPrice;
 


  if(!cart.length) return <EmptyCart />

  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-8">Ready to order?Lets go!</h2>

      <Form method="POST">
        <div className=" mb-5 gap-2 flex flex-col sm:flex-row sm:items-center grow  ">
          <label className="sm:basis-40" >First Name</label>
          <input className="input grow" type="text" name="customer"  defaultValue = {username} required />
        </div>

        <div className="mb-5 gap-2 flex flex-col sm:flex-row sm:items-center  " >
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input  type="tel" name="phone" required className="input w-full" />
          {formErrors?.phone && <p className="text-xs mt-2 bg-red-100 text-red-700 p-2 rounded-md ">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 gap-2 flex flex-col sm:flex-row sm:items-center relative ">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" defaultValue={address } disabled = {isLoadingAdress}  required  />
            {addressStatus === "error" && <p className="text-xs mt-2 bg-red-100 text-red-700 p-2 rounded-md ">{errorAddress} error </p>}
          </div>

          
          {!position.latitude && !position.longitude &&
          <span className="absolute right-[3px] top-[35px]  sm:right-[1px] sm:top-[5.5px]  z-50  " >
          <Button  disabled = {isLoadingAdress}  type='small' onClick={(e) => {
            e.preventDefault()
            dispatch(fetchAddress())
          }} >Get address</Button>
          </span>
           }
          
        </div>

        <div className="mb-12 flex gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400
            focus:outline-none focus:ring focus:ring-yellow-400 
            focus:ring-offset-2
            "
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked) }  
          />
          <label htmlFor="priority" className="font-semibold" >Want to yo give your order priority?</label>
        </div>

        <div className="mb-5 gap-2 flex flex-col sm:flex-row sm:items-center ">
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <input type="hidden" name="position" value={ position.latitude && position.longitude ? `${position.latitude} , ${position.longitude}` : ''}  ></input>
          <Button type = "primary" disabled={isSubmitting || isLoadingAdress  }>
          {isSubmitting ? "Placing Order..." : `Order Now ${ formatCurrency(totalPrice)} `}
          </Button>
        </div>


      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);


  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === true,
    

  };
  console.log(data)

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number , We night need it to contact you";

  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`); 
}

export default CreateOrder;
