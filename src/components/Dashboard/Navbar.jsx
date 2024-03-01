import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="bg-slate-700 text-neutral-200 flex items-center justify-between px-20 py-5">
                <h1 className="text-2xl font-bold uppercase">Contact List</h1>
                <div className="flex items-center gap-28">
                    <Link
                        to="addContact"
                        className=" border-2 border-white px-2 py-1.5 rounded-lg flex items-center justify-between gap-1 focus:ring-2 focus:outline-none focus:ring-slate-400"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                        </svg>
                        Add Contact
                    </Link>
                    <Link
                        to="/logout"
                        className=" border-2 border-red-300 text-red-300 px-2 py-1.5 rounded-lg flex items-center justify-between gap-1 focus:ring-1 focus:outline-none focus:ring-red-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
                            />
                        </svg>
                        Logout
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
