const users = document.querySelector(".users-container");
let index = 0;

// Función Asincrona que permite hacer un request
// a la api de RandomUser para obtener información

async function fetchUser() {
	let response = await fetch("https://randomuser.me/api/");
	let { results } = await response.json();
	addUser(results[0]);
}

// Genera el componente html con sus clases de estilo 
// de cada usuario para ser mostrado

function createDOMElement(data) {
	const id = index;
    const info = document.createElement("div");
	info.className = "info";

    const email_tag = document.createElement('h5');
    email_tag.innerText = "Email";

    const name_tag = document.createElement('h5');
    name_tag.innerText = "Nombre";

	const user = document.createElement("div");
	user.className = "user";
	user.id = id;

	const img = document.createElement("img");
	img.src = data.picture.large;

	const name = document.createElement("h2");
	name.innerText = data.name.title + " " + data.name.first;

	const email = document.createElement("h3");
	email.innerText = data.email;

	const delete_btn = document.createElement("button");
	delete_btn.className = "delete-button";
	delete_btn.innerText = "Eliminar";
	delete_btn.onclick = () => deleteUser(id);

    const id_indicator = document.createElement("h3");
    id_indicator.innerText = id;
    id_indicator.className = "indicator";

    info.append(name_tag, name, email_tag, email);

	user.append(id_indicator, img, info, delete_btn);
	return user;
}

// Agrega al usuario obtenido desde la función
// fetchUser y lo agrega a un array

function addUser(data) {
	let domElement = createDOMElement(data);
	users.appendChild(domElement);
	index++;
}

// Elimina un componente de usuario del DOM meidante un index

function deleteUser(i) {
	users.children.namedItem(i).remove();
}

// Elimina todos los componentes de usuarios creados

function deleteAll() {
	while (users.firstChild) {
		users.removeChild(users.lastChild);
	}
	index = 0;
}
