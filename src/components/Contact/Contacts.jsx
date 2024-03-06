import ContactCard from "./ContactCard";
import ContactHeader from "./ContactHeader";
import ContactTable from "./ContactTable";
import { useEffect, useState } from "react";
import { searchContact, userContacts } from "../../Storage/contact";
import { useSubmit } from "../../Context/context";

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [contactName, setContactName] = useState(null);
    const [isSubmitted] = useSubmit();

    useEffect(() => {
        if (contactName) {
            setContacts(searchContact(contactName));
        } else setContacts(userContacts());
    }, [isSubmitted, contactName]);

    const getSearchDataId = (contactName) => {
        setContactName(contactName);
    };

    if (contacts.length) {
        contacts.sort((first, second) => {
            const firstName = first.name.toUpperCase();
            const secondName = second.name.toUpperCase();
            if (firstName < secondName) return -1;
            if (firstName > secondName) return 1;
            return 0;
        });

        const contactList = contacts.map((contact) => (
            <ContactCard
                key={contact.contactId}
                name={contact.name}
                email={contact.email}
                number={contact.phone}
                contactId={contact.contactId}
                image={contact.image || null}
            />
        ));

        return (
            <>
                <ContactHeader searchData={getSearchDataId} />
                <h1 className="font-medium text-gray-600 mx-24 lg:mx-56 mt-5">
                    {contactName ? "Search Results:- " : "Total Contacts:- "}
                    {contacts.length}
                </h1>
                <ContactTable>{contactList}</ContactTable>
            </>
        );
    } else {
        return (
            <>
                <ContactHeader searchData={getSearchDataId} />
                <div className="text-center my-52 text-5xl font-bold">
                    <h1>No Contacts Available !</h1>
                </div>
            </>
        );
    }
}

export default Contacts;
