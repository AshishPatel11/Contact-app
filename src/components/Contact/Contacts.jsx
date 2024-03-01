import { useLoaderData } from "react-router-dom";
import ContactCard from "./ContactCard";
import ContactHeader from "./ContactHeader";
import ContactTable from "./ContactTable";
import { useContext } from "react";
import AddContact from "./AddContact";
import { toggleState } from "../../Context/context";

function Contacts() {
    const contacts = useLoaderData();
    const [formToggle] = useContext(toggleState);
    if (contacts.length) {
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
                <ContactTable>{contactList}</ContactTable>
                {formToggle && <AddContact />}
            </>
        );
    } else {
        return (
            <>
                <ContactHeader />
                {formToggle && <AddContact />}
                <div className="text-center my-52 text-5xl font-bold">
                    <h1>No Contacts Available !</h1>
                </div>
            </>
        );
    }
}

export default Contacts;
