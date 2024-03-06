import { utils, writeFile } from "xlsx";
import { userContacts } from "../../Storage/contact";
import { useState } from "react";
import ImportContact from "./ImportContact";
import { toast } from "react-toastify";

function ContactHeader({ searchData }) {
    const [showImport, setShowImport] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        searchData(formData.get("search").trim() || null);
    };

    //Export contact to excel
    const genContacts = () => {
        const contacts = userContacts();
        if (!contacts.length) {
            alert("No contacts available to export!");
            return;
        }
        const contact = contacts.map((cont) => {
            return { Name: cont.name, Email: cont.email, Phone: cont.phone };
        });
        const wb = utils.book_new(),
            ws = utils.json_to_sheet(contact);

        utils.book_append_sheet(wb, ws, "Contacts");

        writeFile(wb, "Contacts.xlsx");
        toast.success("Contact Exported!");
    };

    return (
        <>
            <div className="flex items-center justify-between py-3 px-20 flex-col gap-4 md:flex-row">
                <form
                    className="flex items-center max-w-sm my-2"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="simpleSearch" className="sr-only">
                        Search
                    </label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-slate-600"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="simpleSearch"
                            name="search"
                            className="bg-gray-50 border border-slate-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                            placeholder="Search ..."
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <button
                            type="submit"
                            className="p-3 ms-2 text-sm font-medium text-white bg-slate-600 rounded-lg border border-slate-500 hover:bg-slate-700 focus:ring-2 focus:outline-none focus:ring-slate-300"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                        <button
                            type="reset"
                            onClick={() => searchData(null)}
                            className="p-3 text-neutral-900 ms-2 border rounded-lg w-32 bg-red-400 font-normal text-sm hover:bg-red-300 focus:ring-2 focus:outline-none focus:ring-slate-300"
                        >
                            Clear Search
                        </button>
                    </div>
                </form>
                <div className="flex gap-3 items-center">
                    <button
                        type="button"
                        onClick={() => setShowImport(!showImport)}
                        className="bg-white border-2 border-slate-600 px-2 py-1.5 rounded-lg flex items-center justify-between gap-1 focus:ring-4 focus:outline-none focus:ring-slate-300"
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
                                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                            />
                        </svg>
                        Import
                    </button>
                    <button
                        type="button"
                        onClick={genContacts}
                        className="bg-slate-600 px-3 py-2 rounded-lg text-white flex items-center justify-between gap-1 focus:ring-4 focus:outline-none focus:ring-slate-300"
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
                                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                            />
                        </svg>
                        Export
                    </button>
                </div>
                {showImport && <ImportContact state={setShowImport} />}
            </div>
        </>
    );
}

export default ContactHeader;
