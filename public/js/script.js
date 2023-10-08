
function ShowDiv(dividShow, dividHide) {
	document.getElementById(dividShow).classList.remove('d-none');
	document.getElementById(dividShow).classList.add('d-block');
	document.getElementById(dividShow + "Btn").classList.add('d-none');
	document.getElementById(dividShow + "Btn").classList.remove('d-block');


	document.getElementById(dividHide).classList.remove('d-block');
	document.getElementById(dividHide).classList.add('d-none');
	document.getElementById(dividHide + "Btn").classList.add('d-block');
	document.getElementById(dividHide + "Btn").classList.remove('d-none');

}

function fetchMagazines() {
	fetch('http://localhost:3030/magazine')
		.then(response => response.json())
		.then(data => {
			if (Array.isArray(data.data) && data.data.length === 0) {
				document.getElementById('jsonToHtmlTable').innerHTML =
					"<p>No data available. Add some magazines to show here.</p>";
			} else {
				const jsonToHtmlTableElement = jsonToHtmlTable(data);
				document.getElementById('jsonToHtmlTable').innerHTML = "";
				document.getElementById('jsonToHtmlTable').appendChild(jsonToHtmlTableElement);
			}
		})
		.catch(error => {
			console.error(error);
		});
}

function fetchMagazineLogs() {
	fetch('http://localhost:3030/magazine_log')
		.then(response => response.json())
		.then(data => {
			if (Array.isArray(data.data) && data.data.length === 0) {
				document.getElementById('logTable').innerHTML =
					"<p>No data available.</p>";
			} else {
				const jsonToHtmlTableElement = LogTableHtml(data);
				document.getElementById('logTable').innerHTML = "";
				document.getElementById('logTable').appendChild(jsonToHtmlTableElement);
			}
		})
		.catch(error => {
			console.error(error);
		});
}

function DeleteMagazine(id) {
	fetch('http://localhost:3030/magazine/delete/' + id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(response => response.json())
		.then(data => {
			fetchMagazines();
		})
		.catch(error => {
			console.error(error);
		});
}

function SubsUnsub(id, is_subscribed) {
	fetch('http://localhost:3030/magazine/' + id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			is_subscribed: is_subscribed
		})
	})
		.then(response => response.json())
		.then(data => {
			// add log for the subscription
			const datetoday = formatDate();
			const response = fetch('http://localhost:3030/magazine_log', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					magazine_id: id,
					log_date: datetoday,
					action_status: is_subscribed ? "Subscribed" : "Cancelled Subscription"
				})
			});
			fetchMagazines();
			setTimeout(function() {
			fetchMagazineLogs();
			},1000);
		})
		.catch(error => {
			console.error(error);
		});
}

// function UpdateMagazine(id) {
// 	fetch('http://localhost:3030/magazine/' + id, {
// 			method: 'PUT',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		})
// 		.then(response => response.json())
// 		.then(data => {
// 			fetchMagazines();
// 		})
// 		.catch(error => {
// 			console.error(error);
// 		});
// }

function formatDate() {
	const now = new Date();
	const day = String(now.getDate()).padStart(2, '0');
	const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
	const year = now.getFullYear();
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');

	return `${day}-${month}-${year} ${hours}:${minutes}`;
}

// Function to convert JSON data to an HTML table with buttons for delete and change status
function jsonToHtmlTable(data) {
	const table = document.createElement('table');
	table.classList.add('table', 'table-bordered');
	const headers = Object.keys(data.data[0]).filter(header => header !== 'id' && header !== 'is_deleted');
	const headerRow = document.createElement('tr');
	headers.forEach(headerText => {
		const th = document.createElement('th');
		var headerlabel = headerText.replace("_", " ");
		if (headerText === 'is_subscribed')
			headerlabel = " ";
		else if (headerText === 'monthly_price') {
			th.classList.add('px-4');
			th.classList.add('text-end');

		}
		th.textContent = headerlabel;
		headerRow.appendChild(th);
	});
	// Add an empty header cell for the 'Actions' column
	const actionsHeader = document.createElement('th');
	actionsHeader.textContent = ' ';
	headerRow.appendChild(actionsHeader);
	table.appendChild(headerRow);

	// Create table rows with buttons
	data.data.forEach(item => {
		const row = document.createElement('tr');
		headers.forEach(header => {
			const cell = document.createElement('td');
			var valuelabel = item[header];
			if (header === 'is_subscribed') {
				valuelabel = item[header] ? "subscribed" : " ";
				cell.classList.add('subscribed');
			} else if (header === 'monthly_price') {
				cell.classList.add('text-end');
				cell.classList.add('px-4');
				valuelabel = parseFloat(valuelabel).toLocaleString() + " AED";
			}

			cell.textContent = valuelabel;
			row.appendChild(cell);
		});

		// Create cell for the 'Actions' column
		const actionsCell = document.createElement('td');
		const divwrapper = document.createElement('div');
		divwrapper.classList.add('divwrapper');

		// Create buttons for edit, delete, and change status
		// const editButton = document.createElement('button');
		// editButton.textContent = 'Edit';
		// editButton.classList.add('btn', 'btn-sm', 'btn-info');
		// editButton.addEventListener('click', () => {
		// 	OpenPopUp(item);
		// });

		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
		deleteButton.addEventListener('click', () => {
			if (confirm('Are you sure you want to delete this record?'))
				DeleteMagazine(item.id);
			else
				return false;
		});

		const changeStatusButton = document.createElement('button');
		changeStatusButton.classList.add('btn', 'btn-sm');
		var is_subscribed = false;
		if (item.is_subscribed) {
			changeStatusButton.classList.add('btn-warning');
			changeStatusButton.textContent = 'Cancel';
			is_subscribed = false;
		} else {
			changeStatusButton.classList.add('btn-success');
			changeStatusButton.textContent = 'Subscribe';
			is_subscribed = true;
		}
		changeStatusButton.addEventListener('click', () => {
			SubsUnsub(item.id, is_subscribed);
		});

		divwrapper.appendChild(changeStatusButton);
		//divwrapper.appendChild(editButton);
		divwrapper.appendChild(deleteButton);
		actionsCell.appendChild(divwrapper);
		row.appendChild(actionsCell);

		table.appendChild(row);
	});

	return table;
}

function LogTableHtml(data) {
	const table = document.createElement('table');
	table.classList.add('table', 'table-bordered');

	// Create table rows with buttons
	data.data.forEach(item => {
		const row = document.createElement('tr');
		const cell = document.createElement('td');
		sentence = "<div>You <b>" + item["action_status"] + "</b> to '" + item["magazine_title"] + "' on <em><nobr>" +
			item["log_date"] + "</nobr></em></div>";
		cell.innerHTML = sentence;
		row.appendChild(cell);

		table.appendChild(row);
	});

	return table;
}


window.addEventListener('load', function () {
	fetchMagazines();
	fetchMagazineLogs();
});



document.getElementById('FormAddNew').addEventListener('submit', async (event) => {
	event.preventDefault();
	const formElement = event.target;
	const formData = new FormData(formElement);
	const formDataObject = {};
	formData.forEach((value, key) => {
		formDataObject[key] = value;
	});
	console.log("formDataObject " + formData);
	const formDataJSON = JSON.stringify(formDataObject);
	console.log("formDataJSON " + formDataJSON);
	const messageElement = document.getElementById('message');
	try {
		const response = await fetch('http://localhost:3030/magazine', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: formDataJSON
		});

		if (response.ok) {
			const data = await response.json();
			messageElement.classList.add('alert-success');
			messageElement.classList.remove('alert-danger');
			messageElement.textContent = "Magazine Added Successfully.";
			fetchMagazines();
		} else {
			const data = await response.json();
			messageElement.classList.add('alert-danger');
			messageElement.classList.remove('alert-success');
			messageElement.textContent = data.message;
		}
	} catch (error) {
		messageElement.classList.add('alert-danger');
		messageElement.classList.remove('alert-success');
		messageElement.textContent = "An error occurred: " + error;
	}
});