renderHeader();

const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const root = document.querySelector("#root");
const editModal = document.querySelector("#editModal");
let todos = [];
let todo;

// sayfa sayısı
let current_page = 1;

//her sayfada ne kadar satır bulunacağı
let rows = 15;

const renderTodos = (page = 1) => {
	root.innerHTML = "";
	// todoları listele
	const table = document.createElement("table");
	table.setAttribute("class", "table table-hover");

	const thead = document.createElement("thead");
	thead.innerHTML = `
    <tr>
      <th scope="col" id="id-sorting"><button id="id-button1">&uArr;</button> <button id="id-button2">&dArr;</button>id</th>
      <th scope="col">Başlık</th>
      <th scope="col" id="userid-sorting">
	  <button id="userid-button1">&uArr;</button> <button id="userid-button2">&dArr;</button>Kullanıcı Id</th>
      <th scope="col" id="title-sorting"><button id="title-button1">&uArr;</button> <button id="title-button2">&dArr;</button>Durum</th>
      <th scope="col"></th>
    </tr>
  `;
	table.appendChild(thead);

	const tbody = document.createElement("tbody");
	const renderItem = (item) => {
		const tr = document.createElement("tr");
		tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.userId}</td>
      <td>${item.completed ? "Tamamlandı" : "Yapılacak"}</td>
      <td>
        <button class="btn btn-xs btn-danger remove" data-id=${item.id
			}>Sil</button>
        <button class="btn btn-xs btn-warning edit" data-id=${item.id
			}>Düzenle</button>
      </td>
    `;
		tbody.appendChild(tr);
	};
	// todos.slice(0, 15).forEach((item) => {
	// 	renderItem(item);
	// });

	// şu anki sayfanın 1 eksiği örneği 1. sayfaysa 0
	page--;

	// 10*0 = 0;
	let start = rows * page;
	console.log({ start });
	let end = start + rows;
	// 0 + 10 = 10;
	console.log({ end });
	// 0. index ve 10.index arası gösterilecek.
	// hangi seçili sayfadaysak ona göre render ediliyor.
	let paginatedItems = todos.slice(start, end);
	paginatedItems.forEach((item) => {
		renderItem(item);
	});

	table.appendChild(tbody);
	root.append(table);

	document.querySelectorAll(".remove").forEach((button) => {
		button.addEventListener("click", (e) => {
			const id = Number(e.currentTarget.getAttribute("data-id"));
			if (confirm("kaydı silmek istediğinize emin misiniz?")) {
				todos = todos.filter((x) => x.id !== id);
				renderTodos(current_page);
			}
		});
	});

	document.querySelectorAll(".edit").forEach((button) => {
		button.addEventListener("click", (e) => {
			const id = Number(e.currentTarget.getAttribute("data-id"));
			todo = todos.find((todo) => todo.id == id);
			editModal.querySelector("#title").value = todo.title;
			editModal.querySelector("#completed").checked = todo.completed;
			editModal.style.display = "block";
			editModal.classList.add("show");
		});
	});
	//id için sıralama
	//sondaki eleman başa gelir sıralanır
	document.querySelector('#id-button2').addEventListener('click', () => {

		todos.sort((a, b) => b.id - a.id);
		// sıralama yapılacak tekrar o sayfada render edilecek.
		renderTodos(current_page);
		console.log(todos)
	});
	//ters çevirir
	document.querySelector('#id-button1').addEventListener('click', () => {

		todos.sort((a, b) => a.id - b.id);
		// sıralama yapılacak tekrar o sayfada render edilecek.
		renderTodos(current_page);
		console.log(todos)
	});

	//Durum için sıralama

	document.querySelector('#title-button1').addEventListener('click', () => {
		// başlığa tıklandığında sıralama yapılacak.
		todos.sort((a, b) => {
			// küçük ve büyük harf farkını engellemek için
			const nameA = a.title.toUpperCase(); // ignore upper and lowercase
			const nameB = b.title.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return 1;
			}
			if (nameA > nameB) {
				return -1;
			}
			// names must be equal
			return 0;
		});
		// sıralama yapılacak tekrar o sayfada render edilecek.
		renderTodos(current_page);
	});
	document.querySelector('#title-button2').addEventListener('click', () => {
		// başlığa tıklandığında sıralama yapılacak.
		todos.sort((a, b) => {
			// küçük ve büyük harf farkını engellemek için
			const nameA = a.title.toUpperCase(); // ignore upper and lowercase
			const nameB = b.title.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			// names must be equal
			return 0;
		});
		// sıralama yapılacak tekrar o sayfada render edilecek.
		renderTodos(current_page);
	});

	//userid için sıralama
	document.querySelector('#userid-button1').addEventListener('click', () => {

		todos.sort((a, b) => a.userId - b.userId);
		// sıralama yapılacak tekrar o sayfada render edilecek.
		renderTodos(current_page);
		console.log(todos)
	});
	//userid sondaki eleman başa gelir sıralanır
	document.querySelector('#userid-button2').addEventListener('click', () => {

		todos.sort((a, b) => b.userId - a.userId);
		// sıralama yapılacak tekrar o sayfada render edilecek.
		renderTodos(current_page);
		console.log(todos)
	});

};
//Pagination
document.querySelectorAll('.page-link').forEach((btn) => {
	// pagination butonları içinde döndürülerek, her elemente click eklendi, tıklandığında kaçıncı sayfadaysa oraya göre render edilecek.
	btn.addEventListener('click', () => {
		let data_id = btn.getAttribute('data-id');
		// kaçıncı buton olduğu attribute olarak alında.
		current_page = Number(data_id);
		renderTodos(current_page);
	});
});

editModal.querySelector("#save").addEventListener("click", () => {
	todo.title = editModal.querySelector("#title").value;
	todo.completed = editModal.querySelector("#completed").checked;
	const index = todos.findIndex((t) => t.id == todo.id);
	todos[index] = todo;
	renderTodos();
	editModal.style.display = "none";
	editModal.classList.remove("show");
});

editModal.querySelectorAll(".close").forEach((button) => {
	button.addEventListener("click", () => {
		editModal.style.display = "none";
		editModal.classList.remove("show");
	});
});

fetch(todosUrl)
	.then((resp) => resp.json())
	.then((data = []) => {
		todos = data;
		renderTodos();
	})
	.catch((error) => {
		errorLogger(error);
	});

	// sıralama ödevi algoritması
	// table thead kısmındaki sıralama yapılacak kolonlara event listener eklenecek.
	// event listener hangi kolon için tıklanıyorsa
	// sort metodu kullanılarak sıralama yapılacak
	// sıralanmış todos'todus içerisine atılacak
	// renderTodos metodu çalıştırılacak.