import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    RouterProvider,
    createBrowserRouter,
    redirect,
} from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import Alert from "./components/Alert.jsx";
import Home from "./components/Dashboard/Home.jsx";
import { signinAction, signupAction } from "./components/Auth/authActions.js";
import Contacts from "./components/Contact/Contacts.jsx";
import AddContact from "./components/Contact/AddContact.jsx";
import {
    addContactAction,
    editContactAction,
} from "./components/Contact/contactActions.js";
import { getContact, getContacts } from "./Storage/Contact.js";
import EditContact from "./components/Contact/EditContact.jsx";

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
        loader: () => {
            return (
                JSON.parse(localStorage.getItem("loggedIn")) ??
                (alert("Please Login to your account") || redirect("/"))
            );
        },
        element: <Home />,
        children: [
            {
                path: "",
                index: true,
                loader: () => getContacts(),
                element: <Contacts />,
            },
            {
                path: "addContact",
                element: <AddContact />,
                action: addContactAction,
                errorElement: <Alert style={"Warning"} />,
            },
            {
                path: "editContact/:contactId",
                element: <EditContact />,
                loader: ({ params }) => {
                    return getContact(parseInt(params.contactId));
                },
                action: editContactAction,
            },
        ],
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);
