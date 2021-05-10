const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
    e.preventDefault();
    const text = this.querySelector("[name= item]").value;
    const item = {
        text,
        done: false,
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem("items", JSON.stringify(items));
    this.reset();
}
function populateList(list = [], itemList) {
    itemList.innerHTML = list
        .map((item, i) => {
            return `
            <li>
            <input type="checkbox" data-index = "${i}" id = item${i} ${
                item.done ? "checked" : ""
            } >
            <label for = item${i}>${item.text}</label>
            </li>`;
        })
        .join("");
}

function checkedDone(e) {
    if (!e.target.matches("input")) return;
    const index = e.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", checkedDone);

populateList(items, itemsList);
