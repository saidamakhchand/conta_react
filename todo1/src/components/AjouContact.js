import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactForm = ({ addContact, currentId, setCurrentId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (currentId !== null) {
      axios
        .get(`http://localhost:3000/contacts/${currentId}`)
        .then(response => {
          setName(response.data.name);
          setEmail(response.data.email);
          setPhone(response.data.phone);
        });
    }
  }, [currentId]);

  const handleSubmit = e => {
    e.preventDefault();
    if (currentId === null) {
      addContact({ name, email, phone });
    } else {
      axios
        .put(`http://localhost:3000/contacts/${currentId}`, { name, email, phone })
        .then(() => {
          setCurrentId(null);
        });
    }
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <button type="submit">
        {currentId === null ? 'Add Contact' : 'Update Contact'}
      </button>
      <button
        type="button"
        onClick={() => {
          setCurrentId(null);
        }}
      >
        Cancel
      </button>
    </form>
  );
};

const ContactList = ({ contacts, deleteContact, setCurrentId }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {contacts.map(contact => (
        <tr key={contact.id}>
          <td>{contact.name}</td>
          <td>{contact.email}</td>
          <td>{contact.phone}</td>
          <td>
            <button
              onClick={() => {
                setCurrentId(contact.id);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteContact(
                    contact.id);
                }}
                >
                Delete
                </button>
                </td>
                </tr>
                ))}
                </tbody>
                
                  </table>
                );
                const App = () => {
                const [contacts, setContacts] = useState([]);
                const [currentId, setCurrentId] = useState(null);
                
                useEffect(() => {
                axios
                .get('http://localhost:3000/contacts')
                .then(response => {
                setContacts(response.data);
                });
                }, []);
                
                const addContact = newContact => {
                axios
                .post('http://localhost:3000/contacts', newContact)
                .then(response => {
                setContacts([...contacts, response.data]);
                });
                };
                
                const deleteContact = id => {
                axios
                .delete('http://localhost:3000/contacts/${id}')
                .then(() => {
                setContacts(contacts.filter(contact => contact.id !== id));
                });
                };
                
                return (
                <div>
                <ContactForm
                     addContact={addContact}
                     currentId={currentId}
                     setCurrentId={setCurrentId}
                   />
                <ContactList
                     contacts={contacts}
                     deleteContact={deleteContact}
                     setCurrentId={setCurrentId}
                   />
                </div>
                );
                };
                
                export default App;
                
                