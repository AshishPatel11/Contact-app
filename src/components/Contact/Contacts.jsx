import ContactCard from "./ContactCard";
import ContactHeader from "./ContactHeader";
import ContactTable from "./ContactTable";
import { useEffect, useState } from "react";
import { userContacts } from "../../Storage/contact";
import { useSubmit } from "../../Context/context";

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [isSubmitted] = useSubmit();
    useEffect(() => {
        setContacts(userContacts());
    }, [isSubmitted]);
    if (contacts.length) {
        contacts.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
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
                <ContactHeader />
                <ContactTable>{contactList}</ContactTable>
            </>
        );
    } else {
        return (
            <>
                <ContactHeader />
                <div className="text-center my-52 text-5xl font-bold">
                    <h1>No Contacts Available !</h1>
                </div>
            </>
        );
    }
}

export default Contacts;
