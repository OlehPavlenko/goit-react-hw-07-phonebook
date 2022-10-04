import {
    useGetContactsByNameQuery,
    useDeleteContactMutation,
} from 'redux/contactsApi';
import { useEffect } from 'react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import React from 'react';

const ContactsList = ({ filter }) => {
    const { data, error, isFetching } = useGetContactsByNameQuery();
    const [deleteContact] = useDeleteContactMutation();

    useEffect(() => {
        isFetching && Loading.circle('Loading contacts...');
        !isFetching && Loading.remove(500);
    }, [isFetching]);

    return (
        <div className="markup">
            {data && !error && (
                <ul className="contact_list">
                    {data
                        .filter(({ name }) =>
                            name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
                        )
                        .map(({ id, name, phone }) => {
                            return (
                                <li key={id} className="contact_item">
                                    {name} : {phone}
                                    <button
                                        className="del-btn"
                                        onClick={() => {
                                            deleteContact(id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </li>
                            );
                        })}
                </ul>
            )}
            {error && <h1>Contacts {error.data}</h1>}
        </div>
    );
};

export default ContactsList;