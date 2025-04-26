import { useDispatch, useSelector } from "react-redux"
import Button from "./Button"
import { decrease, getCurrentQuantityById, increase } from "../features/cart/cartSlice"

function UpdateItemQuantity({pizzaId , currentQuantity }) {


    const dispatch = useDispatch()
    return (
        <div className="flex gap-2 items-center md:gap-3 ">
           <Button type = "round" onClick={() => dispatch(decrease(pizzaId)) }  > - </Button>
           <span className="text-sm font-medium" >{currentQuantity}</span>
           <Button type = "round" onClick={() => dispatch(increase(pizzaId)) }  > + </Button>

        </div>
      
    )
}

export default UpdateItemQuantity
