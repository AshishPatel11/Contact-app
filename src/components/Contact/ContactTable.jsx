function ContactTable({ children }) {
  return (
    <>
      <div className="overflow-x-auto my-6 mx-20 lg:mx-56 shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right  text-gray-400">
          <thead className="text-xs  uppercase  bg-slate-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
}

export default ContactTable;
