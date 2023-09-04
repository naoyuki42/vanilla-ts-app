import { useGetAPI } from "../hooks";
import { sanitizedText } from "../HTMLElement";

const tableRowElement = () => document.createElement("tr");
const userTableElement = () =>
  document.getElementById("userTable")! as HTMLTableElement;
const userRowElement = (i: number) =>
  document.getElementById(`user${i}`)! as HTMLTableRowElement;
const removeButtonElement = (i: number) =>
  document.getElementById(`removeButton${i}`)! as HTMLButtonElement;
const addUserButtonElement = () =>
  document.getElementById("addUserButton")! as HTMLButtonElement;
const userFormElements = () => {
  const form = document.forms.namedItem("userForm")!;
  return {
    name: form.elements.namedItem("name")! as HTMLInputElement,
    username: form.elements.namedItem("username")! as HTMLInputElement,
    address: form.elements.namedItem("address")! as HTMLInputElement,
    phone: form.elements.namedItem("phone")! as HTMLInputElement,
    company: form.elements.namedItem("company")! as HTMLInputElement,
  };
};
const userIdElements = () => {
  return Array.from(
    document.querySelectorAll(`[id ^= "id"]`)
  ) as HTMLTableRowElement[];
};

const renderUserElement = (data: User, i: number): void => {
  const row = tableRowElement();
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
      <button id="removeButton${i}" type="button">削除</button>
    </td>
  `;
  userTableElement().appendChild(row);
};

const removeUserRowEvent = (event: MouseEvent): void => {
  const target = event.currentTarget! as HTMLElement;
  const elementId = target.getAttribute("id")!;
  const removedId = Number(elementId.replace("removeButton", ""));
  userRowElement(removedId).remove();
};

useGetAPI<User[]>("https://jsonplaceholder.typicode.com/users")
  .then((data: User[]): void => {
    data.map((user: User, i: number): void => {
      renderUserElement(user, i + 1);
      removeButtonElement(i + 1).addEventListener("click", removeUserRowEvent);
    });
  })
  .catch((e: Error): void => console.log(e.message));

addUserButtonElement().addEventListener("click", () => {
  const userIds = userIdElements().map((elm) => Number(elm.textContent));
  const id = Math.max(...userIds) + 1;
  const { name, username, address, phone, company } = userFormElements();

  const user: User = {
    id: id,
    name: name.value,
    username: username.value,
    email: "",
    address: {
      street: "",
      suite: "",
      city: address.value,
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: phone.value,
    website: "",
    company: {
      name: company.value,
      catchPhrase: "",
      bs: "",
    },
  };

  renderUserElement(user, id);
  removeButtonElement(id).addEventListener("click", removeUserRowEvent);

  name.value = "";
  username.value = "";
  address.value = "";
  phone.value = "";
  company.value = "";
});
