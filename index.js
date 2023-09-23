import * as contactService from "./contacts.js";
import { program } from "commander";

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contactsAll = await contactService.listContacts();
        return console.log(contactsAll);
      case "get":
        const getOneContact = await contactService.getContactById(id);
        return console.log(getOneContact);
      case "add":
        const contactAdd = await contactService.addContact({
          name,
          email,
          phone,
        });
        return console.log(contactAdd);
      case "remove":
        const deleteByIdContact = await contactService.removeContact(id);
        return console.log(deleteByIdContact);
      default:
        console.log("Unknown action");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

program
  .option("-a, --action <type>", "choose action") // метод опшн задает одну команду
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(); // program.parse(process.argv);
const options = program.opts(); // получаем комманды в виде массива объектов
invokeAction(options);
// console.log(process.argv);
// [
//   "C:\\Program Files\\nodejs\\node.exe",
//   "C:\\GitHub\\nodejs-hw-01-CLI\\index",
//   "--action",
//   "list",
// ];
