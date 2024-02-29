import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "./Navbar";
import UserContextProvider from "../../Context/UserContextProvider";

function Home() {
    const user = useLoaderData();
    return (
        <>
            <UserContextProvider value={user}>
                <Navbar />
                <Outlet />
            </UserContextProvider>
        </>
    );
}
export default Home;
