import { useState } from 'react';
import React from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
    useGetContactsByNameQuery,
    useAddContactMutation,
} from 'redux/contactsApi';

const Form = () => {
    const [contact, setContact] = useState({
        name: '',
        phone: '',
    });
    const { data } = useGetContactsByNameQuery();

    const [addContact] = useAddContactMutation();

    const onChange = e => {
        const { name, value } = e.currentTarget;
        setContact(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const clear = () => {
        setContact({ name: '', phone: '' });
    };

    const checkExistContacts = (data, newContact) => {
        for (const contact of data) {
            if (contact.name.toLowerCase() === newContact.name.toLowerCase()) {
                return Notify.failure(
                    `${newContact.name} Is already in your contact list!`
                );
            }
        }
        return addContact(contact);
    };

    const onSubmit = e => {
        e.preventDefault();

        checkExistContacts(data, contact);
        clear();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>PhoneBook</h1>
            <h3>Name</h3>
            <input
                type="text"
                name="name"
                value={contact.name}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={onChange}
            />
            <h3>Telephone number</h3>
            <input
                type="tel"
                name="phone"
                value={contact.phone}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={onChange}
            />
            <button type="submit">Add a contact</button>
        </form>
    );
};

export default Form;