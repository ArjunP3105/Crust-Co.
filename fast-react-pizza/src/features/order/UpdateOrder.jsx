import { useFetcher } from "react-router-dom"
import Button from "../../ui/Button"
import { updateOrder } from "../../services/apiRestaurant"

function UpdateOrder() {

    const fetcher = useFetcher()

    return (
        <fetcher.Form method="PATCH" >
            <Button type={'primary'}>
            Set Priority
            </Button>
        </fetcher.Form>
     
    )
}

export async function action({params}){
    const {orderId} = params
    const updatedObj = {
        priority : true
    }

    await updateOrder(orderId , updatedObj);
    return null
}

export default UpdateOrder
