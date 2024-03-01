import { Form } from "react-router-dom";
import { useContext } from "react";
import { User, toggleState } from "../../Context/context";

function AddContact() {
    const user = useContext(User);
    const [, setFormToggle] = useContext(toggleState);
    const hideForm = (e) => {
        if (e.target.id === "form-container") {
            setFormToggle((prev) => !prev);
        }
    };
    return (
        <>
            <div
                id="form-container"
                className="backdrop-blur-sm w-full h-screen fixed top-0 z-10 flex items-center justify-center"
                onClick={hideForm}
            >
                <div className=" bg-white mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 border-slate-700 rounded-xl">
                    <div className="p-2 bg-slate-700 border-inherit rounded-t-lg  text-white flex items-center justify-between">
                        <h1 className="">Add Contact</h1>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-8 h-8 cursor-pointer"
                            onClick={(e) => {
                                setFormToggle((prev) => !prev);
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
                    </div>
                    <Form
                        className="space-y-6 m-5"
                        method="post"
                        replace
                        action="add-contact"
                        encType="multipart/form-data"
                    >
                        <div>
                            <input
                                type="hidden"
                                name="userId"
                                value={user.userId}
                            />
                            <label
                                htmlFor="name"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="border-2 border-slate-600 rounded-md py-1 px-3 w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="email"
                                    className="block font-medium leading-6 text-gray-900"
                                >
                                    Email
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    defaultValue=""
                                    className="border-2 border-slate-600 rounded-md py-1 px-3 w-full"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="phone"
                                    className="block font-medium leading-6 text-gray-900"
                                >
                                    Phone Number
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    defaultValue=""
                                    pattern="[0-9]{10}"
                                    onInvalid={(e) => {
                                        e.target.setCustomValidity(
                                            "Phone number must be 10 digits nubmers only"
                                        );
                                    }}
                                    className="border-2 border-slate-600 rounded-md py-1 px-3 w-full"
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="image"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Contact Image
                            </label>
                            <input
                                className="relative m-0 block w-full min-w-0 flex-auto rounded-md border-2 border-solid border-slate-700 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none cursor-pointer"
                                type="file"
                                id="image"
                                name="image"
                            />
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
                                Add Contact
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default AddContact;
