import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import styles from './App.module.css'
const LOCAL_STORAGE_KEY = 'phonebookContacts';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ];
  });

  const [filter, setFilter] = useState('');

  // contacts değiştikçe localStorage'a yaz
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    const contactWithId = { ...newContact, id: nanoid() };
    setContacts((prev) => [contactWithId, ...prev]);
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <div className={styles.listname}><ContactForm onAdd={addContact} /> </div>
      <div className={styles.searchname}> <SearchBox filter={filter} onFilterChange={handleFilterChange} /></div>
      <div><ContactList contacts={filteredContacts} onDelete={deleteContact} /></div>
    </div>
  );
}
