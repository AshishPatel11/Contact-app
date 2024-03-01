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
import {
    addContactAction,
    editContactAction,
    importContactAction,
} from "./components/Contact/contactActions.js";
import { getContacts, userContacts } from "./Storage/Contact.js";
import EditContact from "./components/Contact/EditContact.jsx";
import { currentUser, logoutUser } from "./Storage/User.js";
import ImportContact from "./components/Contact/ImportContact.jsx";
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
                currentUser() ??
                (alert("Please Login to your account") || redirect("/"))
            );
        },
        element: <Home />,
        children: [
            {
                path: "",
                index: true,
                loader: () => userContacts(),
                element: <Contacts />,
            },
            {
                path: "add-contact",
                action: addContactAction,
                errorElement: <Alert style={"Warning"} />,
            },
            {
                path: "editContact/:contactId",
                element: <EditContact />,
                loader: ({ params }) => {
                    return (
                        getContacts(parseInt(params.contactId)) ??
                        redirect("not-found")
                    );
                },
                action: editContactAction,
                errorElement: <Alert style={"Warning"} />,
            },
            {
                path: "importContact",
                element: <ImportContact />,
                action: importContactAction,
                errorElement: <Alert style={"Warning"} />,
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
