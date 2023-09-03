import { useState, useGetAPI, useSetEvent } from "../hooks";
import {
  getElement,
  createTableRowElement,
  sanitizedText,
  getButtonElement,
} from "../HTMLElement";

const renderUserElement = (data: User, i: number): void => {
  const row = getElement(`user${i}`)!;
  const address = `${data.address.city} ${data.address.suite} ${data.address.street}`;
  row.innerHTML = `
    <td id="id${i}">${sanitizedText(String(data.id))}</td>
    <td id="name${i}">${sanitizedText(data.name)}</td>
    <td id="username${i}">${sanitizedText(data.username)}</td>
    <td id="address${i}">${sanitizedText(address)}</td>
    <td id="phone${i}">${sanitizedText(data.phone)}</td>
    <td id="company${i}">${sanitizedText(data.company.name)}</td>
  `;
};

const [users, setUsers] = useState<User[]>([], (data: User[]): void => {
  data.map((item: User, i: number): void => {
    const userRow = getElement(`user${i}`);
    if (userRow === null) {
      const row = createTableRowElement();
      row.setAttribute("id", `user${i}`);
      getElement("userTable")!.appendChild(row);
    }
    renderUserElement(item, i);
  });
});

useGetAPI<User[]>("https://jsonplaceholder.typicode.com/users")
  .then((data: User[]): void => setUsers(data))
  .catch((e: Error): void => console.log(e.message));

useSetEvent("click", getButtonElement("reverse-button")!, () => {
  setUsers(users().reverse());
});
