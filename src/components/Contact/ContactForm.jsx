import { useLayoutEffect, useRef, useState } from "react";
import { useSubmit, useUser } from "../../Context/context";
import {
    getContacts,
    insertContact,
    updateContact,
} from "../../Storage/contact";
import Image from "./Image";
import { readImage } from "./readImage";
import { toast } from "react-toastify";

function ContactForm({ formType, formState, contactId }) {
    //hooks declaration
    const user = useUser();
    const [, setSubmitted] = useSubmit();
    const [contactData, setContactData] = useState({});
    const [formError, setFormError] = useState(null);
    const form = useRef();

    //useEffect for fetching contact to be edited
    useLayoutEffect(() => {
        if (contactId) {
            setContactData(getContacts(parseInt(contactId)));
        }
    }, [contactId]);

    //Form submit event handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);
        const contactData = Object.fromEntries(formData.entries());

        if (contactData.image.name) {
            contactData.image = await readImage(contactData.image);
        } else contactData.image = null;

        let response;
        if (e.nativeEvent.submitter.value === "Edit Contact")
            response = updateContact(contactData);
        else response = insertContact(contactData);

        if (response.error) setFormError({ err: response.error });
        else {
            toast.success(response.success, { autoClose: 1000 });
            setFormError(null);
            formState(false);
            setSubmitted((prev) => !prev);
        }
    };

    //event handler to hide the form
    const hideForm = (e) => {
        if (e.target.id === "form-container") {
            formState(false);
            return;
        }
    };

    return (
        <>
            <div
                id="form-container"
                className="backdrop-blur-sm w-full h-screen fixed top-0 left-0 z-10 flex items-center justify-center"
                onClick={hideForm}
            >
                <div className=" bg-white mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 border-slate-700 rounded-xl">
                    <div className="p-2 bg-slate-700 border-inherit rounded-t-lg  text-white flex items-center justify-between">
                        <h1 className="">
                            {formType === "update"
                                ? "Edit Contact"
                                : "Add Contact"}
                        </h1>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="white"
                            className="w-8 h-8 cursor-pointer"
                            onClick={(e) => {
                                if (formState) formState(false);
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
                    <form
                        ref={form}
                        className="space-y-6 m-5"
                        method="post"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <div className="text-slate-800 text-base">
                            {formType && (
                                <input
                                    type="hidden"
                                    name="contactId"
                                    defaultValue={contactData.contactId}
                                />
                            )}
                            <input
                                type="hidden"
                                name="userId"
                                defaultValue={user.userId}
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
                                    defaultValue={
                                        formType ? contactData.name : ""
                                    }
                                    className="border-2 border-slate-600 rounded-md py-1 px-3 w-full"
                                />
                            </div>
                        </div>

                        <div className="text-slate-800 text-base">
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
                                    defaultValue={
                                        formType ? contactData.email : ""
                                    }
                                    className="border-2 border-slate-600 rounded-md py-1 px-3 w-full"
                                />
                            </div>
                        </div>
                        <div className="text-slate-800 text-base">
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
                                    defaultValue={
                                        formType ? contactData.phone : ""
                                    }
                                    pattern="[0-9]{10}"
                                    onInvalid={(e) => {
                                        e.target.setCustomValidity(
                                            "Phone number must be 10 digits nubmers only"
                                        );
                                    }}
                                    onInput={(e) => {
                                        e.target.setCustomValidity("");
                                    }}
                                    className="border-2 border-slate-600 rounded-md py-1 px-3 w-full"
                                />
                            </div>
                            <p className="mt-2  text-red-600 text-sm">
                                {formError
                                    ? formError.err
                                        ? formError.err
                                        : ""
                                    : ""}
                            </p>
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
                        {contactData.image && (
                            <>
                                <div className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        id="removeImage"
                                        name="removeImage"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-50 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="removeImage"
                                        className="text-base block font-medium text-gray-900"
                                    >
                                        Remove Current Image
                                    </label>
                                </div>
                                <div>
                                    <Image src={contactData.image} alt="" />
                                </div>
                            </>
                        )}
                        <div>
                            <input
                                type="submit"
                                name="intent"
                                className={`flex w-full justify-center rounded-md bg-indigo-600
                            px-3 py-1.5 text-sm font-semibold leading-6
                            text-white shadow-sm hover:bg-indigo-500
                            focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-indigo-600 cursor-pointer`}
                                value={
                                    formType === "update"
                                        ? "Edit Contact"
                                        : "Add Contact"
                                }
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ContactForm;
