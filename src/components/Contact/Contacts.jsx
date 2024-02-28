import ContactCard from "./ContactCard";
import ContactHeader from "./ContactHeader";

function Contacts() {
    return (
        <>
            <ContactHeader />
            <ContactCard
                name="ashish"
                email="ashish@gmail.com"
                number="6353287608"
            />
            <ContactCard />
        </>
    );
}

export default Contacts;
