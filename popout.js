document.querySelector(".new-item input").addEventListener("focus", () => {
	let item = document.querySelector(".new-item input");
	item.placeholder = "I want to...";
	item.classList.remove("empty-input");
});

document.querySelector(".new-item input").addEventListener("blur", () => {
	let item = document.querySelector(".new-item input");
	item.placeholder = "click to add";
	item.classList.remove("empty-input");
});

document.querySelector(".new-item input").addEventListener("keypress", (e) => {
	if (e.key === "Enter") document.querySelector(".new-item button").click();
});

document.querySelector(".new-item button").addEventListener("click", () => {
	let item = document.querySelector(".new-item input");
	let itemName = item.value.trim();
	if (itemName != "" && itemName != " ") {
		let items = JSON.parse(localStorage.getItem("todo-items"));
		items.push({ todo: itemName, status: 0 });
		saveItems(items);
		item.value = "";
		fetchItems();
	} else {
		item.placeholder = "You didn't enter anything...";
		item.classList.toggle("empty-input");
	}
});

const fetchItems = () => {
	const listItems = document.querySelector("ul.list-items");
	listItems.innerHTML = "";

	try {
		let items = JSON.parse(localStorage.getItem("todo-items"));
		for (let i = 0; i < items.length; i++) {
			let status = "";
			if (items[i].status == 1) status = 'class="checked"';

			listItems.innerHTML += `<li data-itemindex="${i}"> <span ${status}>${items[i].todo}</span><span> <i class="fas fa-trash delete"></i></span></li>`;
		}
		addListeners(items.length);
	} catch (error) {
		console.log(error);
	}
};

const addListeners = (lenght) => {
	for (let i = 0; i < lenght; i++) {
		let itemTodo = document.querySelector(
			'ul.list-items li[data-itemindex="' + i + '"] span'
		);

		let itemDelete = document.querySelector(
			'ul.list-items li[data-itemindex="' + i + '"] .delete'
		);

		itemTodo.addEventListener("click", () => {
			let items = JSON.parse(localStorage.getItem("todo-items"));
			itemTodo.classList.toggle("checked");
			if (items[i].status === 1) items[i].status = 0;
			else items[i].status = 1;
			saveItems(items);
		});

		itemDelete.addEventListener("click", () => {
			let items = JSON.parse(localStorage.getItem("todo-items"));
			console.log(items);
			items.splice(i, 1);
			saveItems(items);
			fetchItems();
		});
	}
};

const saveItems = (item) => {
	let todo = JSON.stringify(item);
	localStorage.setItem("todo-items", todo);
};

fetchItems();
