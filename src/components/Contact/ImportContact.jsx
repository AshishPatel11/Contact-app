import { Form, useNavigate } from "react-router-dom";

function ImportContact() {
    const navigate = useNavigate();
    return (
        <div className="fixed bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 flex items-center justify-center w-full z-10">
            <Form
                className="w-1/3"
                method="post"
                encType="multipart/form-data"
                replace
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
                            navigate(-1);
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
                        className={`flex self-end bottom-1 mx-1.5 my-1 justify-center rounded-md bg-indigo-600
                                px-3 py-1.5 text-sm font-semibold leading-6
                                text-white shadow-sm hover:bg-indigo-500
                                focus-visible:outline focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-indigo-600`}
                    >
                        Add Contacts
                    </button>
                </label>
            </Form>
        </div>
    );
}

export default ImportContact;
