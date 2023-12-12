import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("models/contacts", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => { };

const removeContact = async (contactId) => { };

const addContact = async (body) => { };

const updateContact = async (contactId, body) => { };


export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
