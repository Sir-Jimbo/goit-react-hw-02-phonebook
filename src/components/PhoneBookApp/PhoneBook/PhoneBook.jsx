import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Filter from 'components/PhoneBookApp/Filter/Filter'
import ContactList from 'components/PhoneBookApp/ContactList/ContactList'
import ContactForm from 'components/PhoneBookApp/ContactForm/ContactForm'
import s from './PhoneBook.module.css'

class PhoneBook extends Component {
   state = {
      contacts: [],
      filter: '',

   }

   formSubmitHandler = ({ name, number }) => {

      const contact = {
         id: uuidv4(),
         name: name,
         number: number,
      }
      if (this.state.contacts.find((item) => item.name.toLowerCase() === name.toLowerCase())) {
         alert(`${name} is already in contacts.`);
      } else {
         this.setState(({ contacts }) => ({
            contacts: [contact, ...contacts]
         }))
      }
   }
   deleteContact = (contactId) => {
      console.log(contactId);
      this.setState(prevState => ({
         contacts: prevState
            .contacts
            .filter(contact => contact.id !== contactId),
      }));
   };

   changeFilter = e => {
      this.setState({ filter: e.currentTarget.value })
   }

   render() {

      const { contacts } = this.state;
      const { filter } = this.state;
      const { formSubmitHandler, changeFilter, deleteContact } = this;

      const normalizedFilter = this.state.filter.toLowerCase();
      const filterContacts = this
         .state
         .contacts
         .filter(contact => contact
            .name
            .toLowerCase()
            .includes(normalizedFilter));


      return (
         <div>

            <h1 className={s.title}> Phonebook </h1>
            <ContactForm onSubmit={formSubmitHandler} />
            {contacts.length > 0 && (
               <h2 className={s.title}> Contacts </h2>
            )}
            {contacts.length > 0 && (
               <Filter value={filter} onChange={changeFilter} />
            )}
            {contacts.length > 0 && (
               <ContactList items={filterContacts} onDeleteContact={deleteContact} />
            )}
         </div>
      );
   }
}

export default PhoneBook;