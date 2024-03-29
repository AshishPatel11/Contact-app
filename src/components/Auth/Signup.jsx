import { Link, redirect, useNavigate } from 'react-router-dom';
import logo from '../../assets/download.png';
import { useRef, useState } from 'react';
import { insertUser } from '../../Storage/user';
import { toast } from 'react-toastify';

function Signup() {
  const [actionData, setActionData] = useState(null);
  const form = useRef();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const userData = Object.fromEntries(formData.entries());

    if (userData.password !== userData.confirmPassword)
      setActionData({ err: { password: 'password does not match' } });
    else {
      const { email, password } = userData;
      const response = insertUser({ email, password });
      if (response.error) {
        setActionData({ err: { email: response.error } });
      } else {
        toast.success(response.success);
        navigate('/', { replace: true });
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            ref={form}
            className="space-y-6"
            method="post"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                            ${
                              actionData && actionData.err
                                ? actionData.err.email
                                  ? `border-red-500 text-red-600
                                focus:border-red-500 focus:ring-red-500`
                                  : ''
                                : ''
                            } `}
                />
              </div>
              <p className="mt-2  text-red-600 text-sm">
                {actionData && actionData.err && actionData.err.email
                  ? actionData.err.email
                  : ''}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  defaultValue=""
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className={`peer mt-1 block w-full p-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${
                                      actionData && actionData.err
                                        ? actionData.err.password
                                          ? `border-red-500 text-red-600
                                        focus:border-red-500 focus:ring-red-500`
                                          : ''
                                        : ''
                                    } `}
                />
                <p className="mt-2  text-red-600 text-sm">
                  {actionData && actionData.err && actionData.err.password
                    ? actionData.err.password
                    : ''}
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-indigo-600
                                px-3 py-1.5 text-sm font-semibold leading-6
                                text-white shadow-sm hover:bg-indigo-500
                                focus-visible:outline focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-indigo-600`}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {'Already have an account? '}
            <Link
              to="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default Signup;
