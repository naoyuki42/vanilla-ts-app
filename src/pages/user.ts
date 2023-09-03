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
  const address = `${data.address.city} ${data.address.suite} ${data.address.street}`;
  row.innerHTML = `
    <td id="id${i}">${sanitizedText(String(data.id))}</td>
    <td id="name${i}">${sanitizedText(data.name)}</td>
    <td id="username${i}">${sanitizedText(data.username)}</td>
    <td id="address${i}">${sanitizedText(address)}</td>
    <td id="phone${i}">${sanitizedText(data.phone)}</td>
    <td id="company${i}">${sanitizedText(data.company.name)}</td>
    <td>
      <button id="remove-button${i}" type="button">削除</button>
    </td>
  `;
  getElement("userTable")!.appendChild(row);
};
const removeUserRowElement = (i: number): void => {
  getElement(`user${i}`)?.remove();
};

const [users, setUsers] = useState<User[]>([], (data: User[]): void => {
  data.map((item: User, i: number): void => {
    removeUserRowElement(i + 1);
    renderUserElement(item, i + 1);
    useSetEvent(
      "click",
      getButtonElement(`remove-button${i + 1}`)!,
      (event) => {
        const target = event.currentTarget! as HTMLElement;
        const elementId = target.getAttribute("id")!;
        const removedId = Number(elementId.replace("remove-button", ""));
        removeUserRowElement(removedId);
      }
    );
  });
});

useGetAPI<User[]>("https://jsonplaceholder.typicode.com/users")
  .then((data: User[]): void => setUsers(data))
  .catch((e: Error): void => console.log(e.message));

useSetEvent("click", getButtonElement("reverse-button")!, () => {
  setUsers(users().reverse());
});
