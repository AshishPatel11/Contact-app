import { useLoaderData } from "react-router-dom";
import ContactCard from "./ContactCard";
import ContactHeader from "./ContactHeader";

function Contacts() {
    const contacts = useLoaderData();
    contacts.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    const contactList = contacts.map((contact) => {
        return (
            <ContactCard
                key={contact.contactId}
                name={contact.name}
                email={contact.email}
                number={contact.phone}
                contactId={contact.contactId}
                image={contact.image || null}
            />
        );
    });
    return (
        <>
            <ContactHeader />
            {contactList}
        </>
    );
}

export default Contacts;
