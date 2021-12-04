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
		if (items === "" || items === null) {
			saveItems([{ todo: itemName, status: 0 }]);
		} else {
			items.push({ todo: itemName, status: 0 });
			saveItems(items);
		}
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
		if (items !== null) {
			for (let i = 0; i < items.length; i++) {
				let status = "";
				if (items[i].status == 1) status = "checked";

				listItems.innerHTML += `<li data-itemindex="${i}"> <span class="todo ${status}">${items[i].todo}</span><span class="icons"><i class="fas fa-edit edit"></i> <i class="fas fa-trash delete"></i></span></li>`;
			}
			addListeners(items.length);
		}
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

		let itemEdit = document.querySelector(
			'ul.list-items li[data-itemindex="' + i + '"] .edit'
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
			items.splice(i, 1);
			saveItems(items);
			fetchItems();
		});

		itemEdit.addEventListener("click", () => {
			let items = JSON.parse(localStorage.getItem("todo-items"));
			let element = document.querySelector(
				'ul.list-items li[data-itemindex="' + i + '"] .todo'
			);
			// let element = itemEdit.parentElement.parentElement.firstChild;
			const input = document.createElement("input");
			input.setAttribute("value", element.innerHTML);
			element.replaceWith(input);
			input.selectionStart = input.selectionEnd = input.value.length;

			const save = () => {
				const previous = document.createElement(
					element.tagName.toLowerCase()
				);
				previous.textContent = input.value;
				input.replaceWith(previous);
				items[i].todo = input.value;
				saveItems(items);
				fetchItems();
			};

			input.addEventListener("blur", save, { once: true });
			input.addEventListener("keypress", (e) => {
				if (e.key === "Enter") save();
			});
			input.focus();
		});
	}
};

const saveItems = (item) => {
	let todo = JSON.stringify(item);
	localStorage.setItem("todo-items", todo);
};

fetchItems();
