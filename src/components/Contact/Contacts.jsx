import ContactCard from './ContactCard';
import ContactHeader from './ContactHeader';
import ContactTable from './ContactTable';
import { useEffect, useState } from 'react';
import { searchContact, userContacts } from '../../Storage/contact';
import { useSubmit } from '../../Context/context';
import { useLocation, useSearchParams } from 'react-router-dom';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [isSubmitted] = useSubmit();
  const [search] = useSearchParams();
  const searchString = search.get('search');

  useEffect(() => {
    if (searchString) {
      setContacts(searchContact(searchString));
    } else setContacts(userContacts());
  }, [isSubmitted, searchString]);

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
        <ContactHeader />
        <h1 className="font-medium text-gray-600 mx-24 lg:mx-56 mt-5">
          {searchString ? 'Search Results:- ' : 'Total Contacts:- '}
          {contacts.length}
        </h1>
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
