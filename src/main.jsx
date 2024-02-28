import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import Alert from "./components/Alert.jsx";
import Home from "./components/Dashboard/Home.jsx";
import { signinAction, signupAction } from "./components/Auth/authActions.js";
import Contacts from "./components/Contact/Contacts.jsx";
import AddContact from "./components/Contact/AddContact.jsx";
import { addContactAction } from "./components/Contact/contactActions.js";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                element: <Signin />,
                action: signinAction,
                errorElement: <Alert style={"Warning"} />,
            },
            {
                path: "signup",
                element: <Signup />,
                action: signupAction,
                errorElement: <Alert style={"Warning"} />,
            },
        ],
    },
    {
        path: "/home",
        element: <Home />,
        children: [
            {
                path: "",
                index: true,
                element: <Contacts />,
            },
            {
                path: "addContact",
                element: <AddContact />,
                action: addContactAction,
            },
        ],
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);
