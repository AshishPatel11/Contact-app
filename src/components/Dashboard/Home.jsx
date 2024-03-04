import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "./Navbar";
import UserContextProvider from "../../Context/UserContextProvider";
import { useState } from "react";
import IsSubmitProvider from "../../Context/IsSubmitProvider";
function Home() {
    const user = useLoaderData();
    const [isSubmitted, setSubmitted] = useState(false);
    return (
        <>
            <UserContextProvider value={user}>
                <IsSubmitProvider value={[isSubmitted, setSubmitted]}>
                    <Navbar />
                    <Outlet />
                </IsSubmitProvider>
            </UserContextProvider>
        </>
    );
}
export default Home;
