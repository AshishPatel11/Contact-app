import { useLayoutEffect, useRef, useState } from 'react';
import { useSubmit, useUser } from '../../Context/context';
import {
  getContacts,
  insertContact,
  updateContact,
} from '../../Storage/contact';
import Image from './Image';
import { readImage } from './readImage';
import { toast } from 'react-toastify';

function ContactForm({ formType, formState, contactId }) {
  //hooks declaration
  const [user] = useUser();
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
    const contact = Object.fromEntries(formData.entries());

    contact.image = contactData.image;

    let response;
    if (e.nativeEvent.submitter.value === 'Edit Contact')
      response = updateContact(contact);
    else response = insertContact(contact);

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
    if (e.target.id === 'form-container') {
      formState(false);
      return;
    }
  };

  const changeImage = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = await readImage(e.target.files[0]);
      setContactData((prev) => ({ ...prev, image: img }));
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
              {formType === 'update' ? 'Edit Contact' : 'Add Contact'}
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
            <div className="mb-3 flex items-center justify-center">
              <label
                htmlFor="image"
                className=" cursor-pointer font-medium leading-6 text-gray-900"
              >
                <Image src={contactData.image || null} />
              </label>
              <div className="relative">
                <input
                  className="hidden"
                  type="file"
                  onChange={changeImage}
                  id="image"
                  name="image"
                />
                {contactData.image && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="red"
                    className="w-6 h-6 cursor-pointer absolute top-3 right-1 z-10 bg-cyan-400 rounded-full p-1"
                    onClick={(e) => {
                      setContactData((prev) => ({ ...prev, image: null }));
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div className="text-slate-800 text-base">
              {formType && (
                <input
                  type="hidden"
                  name="contactId"
                  defaultValue={contactData.contactId}
                />
              )}
              <input type="hidden" name="userId" defaultValue={user.userId} />
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
                  defaultValue={formType ? contactData.name : ''}
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
                  defaultValue={formType ? contactData.email : ''}
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
                  defaultValue={formType ? contactData.phone : ''}
                  pattern="[0-9]{10}"
                  onInvalid={(e) => {
                    e.target.setCustomValidity(
                      'Phone number must be 10 digits nubmers only'
                    );
                  }}
                  onInput={(e) => {
                    e.target.setCustomValidity('');
                  }}
                  className="border-2 border-slate-600 rounded-md py-1 px-3 w-full"
                />
              </div>
              <p className="mt-2  text-red-600 text-sm">
                {formError ? (formError.err ? formError.err : '') : ''}
              </p>
            </div>

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
                value={formType === 'update' ? 'Edit Contact' : 'Add Contact'}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
