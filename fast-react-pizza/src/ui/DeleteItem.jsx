import { useDispatch } from "react-redux"
import Button from "./Button"
import { deleteItem } from "../features/cart/cartSlice"


function DeleteItem({pizzaId}) {

    const dispatch = useDispatch()

    return (
        <Button type={'small'} onClick={() => dispatch(deleteItem(pizzaId)) }     >
            Delete
        </Button>
    )
}

export default DeleteItem
