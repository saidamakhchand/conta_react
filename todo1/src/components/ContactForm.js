import React, { useState } from 'react';

function ContactForm() {
  const [contacts, setContacts] = useState([]); 
  const [newContact, setNewContact] = useState({}); 
  const [search, setSearch] = useState(''); 
  const [filteredContacts, setFilteredContacts] = useState([]); 
  const [sortAsc, setSortAsc] = useState(true); 

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setContacts([...contacts, newContact]);
    setNewContact({}); 
    setFilteredContacts([...contacts, newContact]); 
  }

  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilteredContacts(contacts.filter
      (contact =>
        contact.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        contact.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        contact.phone.toLowerCase().includes(e.target.value.toLowerCase())
      ));
    }
  
    const handleDelete = (index) => {
      const updatedContacts = [...contacts];
      updatedContacts.splice(index, 1);
      setContacts(updatedContacts);
      setFilteredContacts(updatedContacts);
    }
  
    const handleSort = () => {
      setSortAsc(!sortAsc);
      const sortedContacts = [...contacts].sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return sortAsc ? -1 : 1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return sortAsc ? 1 : -1;
        }
        return 0;
      });
      setContacts(sortedContacts);
      setFilteredContacts(sortedContacts);
    }
  
    return (
      <div  >
        <img src={'blob1.svg'} className="ima" />
        <img src={'blob2.svg'} className="ima1" />
        <img src={'blob1.svg'} className="ima2" />
        <img src={'blob2.svg'} className="ima3" />
        <form onSubmit={handleSubmit} id='form1'  >
          <label htmlFor="">Entre le Nom :</label>
          <input type="text" className='name' name="name" placeholder="Nom" onChange={handleChange} value={newContact.name || ''} /> <br /><br />
          <label htmlFor="">Entre le Ville :</label><input type="text" className='ville' name="email" placeholder="Ville" onChange={handleChange} value={newContact.email || ''} /> <br /><br />
         <label htmlFor=""> Entre le Télé :</label><input type="text" className='tel' name="phone" placeholder="Tél" onChange={handleChange} value={newContact.phone || ''} /> <br /><br />
          <button type="submit" id='ajout' >Ajouter Contact</button>
        </form>
        <form > <br /><br />
          <button type="submit" id='bout' >Rechercher</button>
          <input type="text" name="search" placeholder="Rechercher..." onChange={handleSearch} value={search}  id='inp1' />
          <button type="button" onClick={handleSort} id='boot' >Trier par ordre alphabétique </button>
        </form><br /><br /><br /><br /><br />
        <table >
          <thead >
            <tr>
              <th>Nom</th>
              <th>Ville </th>
              <th>Tél</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length > 0
            ? filteredContacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button type="button" onClick={() => handleDelete(index)} id='sup' >Supperimer</button>
                </td>
              </tr>
            ))
            : contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button type="button" onClick={() => handleDelete(index)} id='sup' >Supperimer</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default ContactForm;
  