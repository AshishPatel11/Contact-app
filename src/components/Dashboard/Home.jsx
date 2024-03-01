import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "./Navbar";
import UserContextProvider from "../../Context/UserContextProvider";
import ToggleStateProvider from "../../Context/ToggleStateProvider";
import { useState } from "react";
function Home() {
    const user = useLoaderData();
    const [formToggle, setFormToggle] = useState(false);
    return (
        <>
            <UserContextProvider value={user}>
                <ToggleStateProvider value={[formToggle, setFormToggle]}>
                    <Navbar />
                    <Outlet />
                </ToggleStateProvider>
            </UserContextProvider>
        </>
    );
}
export default Home;
