import { useRef } from "react";
import { read, utils } from "xlsx";
import { insertContacts } from "../../Storage/contact";
import { useSubmit } from "../../Context/context";
import { toast } from "react-toastify";

function ImportContact({ state }) {
    const importForm = useRef();
    const [, setSubmitted] = useSubmit();

    //submit event handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(importForm.current);
        const file = Object.fromEntries(formData.entries());
        const arrayBuffer = await file.sheet.arrayBuffer();

        const workbook = read(arrayBuffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const contacts = utils.sheet_to_json(worksheet);

        const newContacts = contacts.map((contact) => {
            const validContact = {};
            for (const key in contact) {
                validContact[key.toLowerCase()] = contact[key];
            }
            return validContact;
        });
        insertContacts(newContacts);
        toast.success("Contacts Imported!", { autoClose: 1000 });
        state(false);
        setSubmitted((prev) => !prev);
    };

    //hide form on event
    const hideForm = (e) => {
        if (e.target.id === "form-container") {
            state(false);
        }
    };

    return (
        <div
            id="form-container"
            className="backdrop-blur-sm lg:w-full w-screen h-screen fixed top-0 left-0 z-10 flex items-center justify-center"
            onClick={hideForm}
        >
            <div className="bg-white lg:w-1/3 w-1/2 relative flex rounded-xl z-10">
                <form
                    ref={importForm}
                    className="w-full"
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer  hover:bg-bray-800 bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-12 h-12 self-end absolute top-1"
                            onClick={(e) => {
                                state(false);
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>

                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4  text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-400">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                        </div>
                        <input
                            className="block w-full text-lg rounded-lg cursor-pointer text-gray-400 focus:outline-none  border-gray-600 placeholder-gray-400"
                            id="dropzone-file"
                            required
                            type="file"
                            accept=".xls,.xlsx"
                            name="sheet"
                        />
                        <button
                            type="submit"
                            className={`flex bottom-0 mt-2 my-1 justify-center rounded-md bg-indigo-600
                                px-3 py-1.5 text-sm font-semibold leading-6
                                text-white shadow-sm hover:bg-indigo-500
                                focus-visible:outline focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-indigo-600`}
                        >
                            Import Contacts
                        </button>
                    </label>
                </form>
            </div>
        </div>
    );
}
ImportContact.propType = {
    state: String,
};
export default ImportContact;
