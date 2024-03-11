import ReactDOM from 'react-dom/client';
import './index.css';
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import Home from './components/Dashboard/Home.jsx';
import Contacts from './components/Contact/Contacts.jsx';
import { userContacts } from './Storage/contact.js';
import { currentUser, logoutUser } from './Storage/user.js';
import NotFound from './components/NotFound.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RequiredAuth from './components/Auth/RequiredAuth.jsx';
import UserContextProvider from './Context/UserContextProvider.jsx';
import IsSubmitProvider from './Context/IsSubmitProvider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => {
      return currentUser() && redirect('/home');
    },
    children: [
      {
        index: true,
        element: <Signin />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
  {
    element: <RequiredAuth />,
    children: [
      {
        path: '/home',
        element: <Home />,
        children: [
          {
            index: true,
            loader: () => userContacts(),
            element: <Contacts />,
          },
        ],
      },
    ],
  },
  {
    path: '/logout',
    loader: () => {
      if (confirm('Are you sure you want to logout?')) {
        logoutUser();
        return redirect('/');
      } else return redirect('/home');
    },
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <UserContextProvider>
      <IsSubmitProvider>
        <ToastContainer />
        <RouterProvider router={router}></RouterProvider>
      </IsSubmitProvider>
    </UserContextProvider>
  </>
);
