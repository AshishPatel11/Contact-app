import { Link } from "react-router-dom";
import Image from "./Image";

// function ContactCard({ image, name, email, number, contactId }) {
//     return (
//         <>
//             <div className="flex items-center text-center justify-between mx-24 my-3 border border-1 border-slate-600 rounded-xl py-2 px-5 cursor-pointer hover:bg-slate-300">
//                 <div className="flex items-center gap-2 basis-1/5 ">
//                     <Image src={image || null} />
//                     <div>
//                         <h1 className="font-semibold text-2xl">{name}</h1>
//                     </div>
//                 </div>
//                 <div className="flex-1">
//                     <h1 className="text-md text-sky-800">{email}</h1>
//                 </div>
//                 <div className="flex-1">
//                     <h1 className="text-md text-slate-800">{number}</h1>
//                 </div>
//                 <div className="flex gap-3">
//                     <Link
//                         to={`editContact/${contactId}`}
//                         className="flex gap-1 border-2 text-blue-700 bg-white border-blue-400 py-1 px-4 rounded-lg hover:ring-2 hover:ring-blue-300"
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth={1.5}
//                             stroke="currentColor"
//                             className="w-6 h-6"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
//                             />
//                         </svg>
//                         Edit
//                     </Link>
//                     <button className="flex gap-1 border-2 text-red-700 bg-white border-red-400 py-1 px-4 rounded-lg hover:ring-2 hover:ring-red-300">
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth={1.5}
//                             stroke="currentColor"
//                             className="w-6 h-6"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                             />
//                         </svg>
//                         delete
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ContactCard;

function ContactCard({ image, name, email, number, contactId }) {
    return (
        <>
            <tr className="border-b bg-gray-800 border-gray-700  hover:bg-gray-600">
                <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium  whitespace-nowrap text-white"
                >
                    <Image src={image || null} />
                    <div className="ps-3">
                        <div className="text-base font-semibold">{name}</div>
                    </div>
                </th>
                <td className="px-6 py-4">{email}</td>
                <td className="px-6 py-4">
                    <div className="flex items-center">{number}</div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Link
                            to={`editContact/${contactId}`}
                            className="flex items-center gap-1 border-2 text-blue-700 bg-white border-blue-400 py-1 px-4 rounded-lg hover:ring-2 hover:ring-blue-300"
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
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                            </svg>
                            Edit
                        </Link>
                        <button className="flex gap-1 items-center border-2 text-red-700 bg-white border-red-400 py-1 px-4 rounded-lg hover:ring-2 hover:ring-red-300">
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
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                            delete
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}

export default ContactCard;
