import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import Alert from "./components/Alert.jsx";
import Home from "./components/Dashboard/Home.jsx";
import { signinAction, signupAction } from "./components/Auth/authActions.js";

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
                path: "/signup",
                element: <Signup />,
                action: signupAction,
                errorElement: <Alert style={"Warning"} />,
            },
        ],
    },
    {
        path: "/home",
        element: <Home />,
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </React.StrictMode>
);
