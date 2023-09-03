import { useState, useGetAPI, useSetEvent } from "../hooks";
import {
  getElement,
  createTableRowElement,
  sanitizedText,
  getButtonElement,
} from "../HTMLElement";

const renderUserElement = (data: User, i: number): void => {
  const row = createTableRowElement();
  row.setAttribute("id", `user${i}`);
  row.innerHTML = sanitizedText(`
    <tr id="user${i}">
    <td id="id${i}">${data.id}</td>
    <td id="name${i}">${data.name}</td>
    <td id="username${i}">${data.username}</td>
    <td id="address${i}">${data.address.city} ${data.address.suite} ${data.address.street}</td>
    <td id="phone${i}">${data.phone}</td>
    <td id="company${i}">${data.company.name}</td>
    </tr>
  `);
  getElement("userTable")!.appendChild(row);
};

const updateUserElement = (data: User, i: number): void => {
  getElement(`id${i}`)!.textContent = String(data.id);
  getElement(`name${i}`)!.textContent = data.name;
  getElement(`username${i}`)!.textContent = data.username;
  getElement(
    `address${i}`
  )!.textContent = `${data.address.city} ${data.address.suite} ${data.address.street}`;
  getElement(`phone${i}`)!.textContent = data.phone;
  getElement(`company${i}`)!.textContent = data.company.name;
};

const [users, setUsers] = useState<User[]>([], (data: User[]) => {
  data.map((item: User, i: number): void => {
    if (getElement(`user${i}`) === null) {
      renderUserElement(item, i);
    } else {
      updateUserElement(item, i);
    }
  });
});

useGetAPI<User[]>("https://jsonplaceholder.typicode.com/users")
  .then((data: User[]): void => setUsers(data))
  .catch((e: Error): void => console.log(e.message));

useSetEvent("click", getButtonElement("reverse-button")!, () => {
  setUsers(users().reverse());
});
