import React from "react";

export function ContactList(){}
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