import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {

  const username = useSelector(state => state.user.username)
  return (
    <div className="my-10 text-center sm:my-16 px-4  ">
      <h1 className="text-xl font-semibold text-center mb-8 md:text-3xl    ">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
     {username ? <Button type={'primary'} to = "/menu" >Continue Ordering {username}</Button> : <CreateUser />}
    </div>
  );
}

export default Home;