import ReactDOM from "react-dom/client";
import "./index.css";
import {
    RouterProvider,
    createBrowserRouter,
    redirect,
} from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import Home from "./components/Dashboard/Home.jsx";
import { signinAction, signupAction } from "./components/Auth/authActions.js";
import Contacts from "./components/Contact/Contacts.jsx";
import { userContacts } from "./Storage/contact.js";
import { currentUser, logoutUser } from "./Storage/user.js";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        loader: () => {
            return currentUser() && redirect("/home");
        },
        children: [
            {
                index: true,
                element: <Signin />,
                action: signinAction,
            },
            {
                path: "signup",
                element: <Signup />,
                action: signupAction,
            },
        ],
    },
    {
        path: "/home",
        loader: () => {
            return (
                currentUser() ??
                (alert("Please Login to your account") || redirect("/"))
            );
        },
        element: <Home />,
        children: [
            {
                index: true,
                loader: () => userContacts(),
                element: <Contacts />,
            },
        ],
    },
    {
        path: "/logout",
        loader: () => {
            if (confirm("Are you sure you want to logout?")) {
                logoutUser();
                return redirect("/");
            } else return redirect("/home");
        },
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router}></RouterProvider>
);
