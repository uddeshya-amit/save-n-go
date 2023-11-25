let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

const deleteOne = (key) => {
	myLeads = myLeads.filter((e, i) => i != key);

	localStorage.setItem("myLeads", JSON.stringify(myLeads));
	render();
};

deleteBtn.addEventListener("click", () => {
	if (confirm("Do you really want to delete everything?")) {
		localStorage.clear();
		myLeads = [];
		render();
	}
});

tabBtn.addEventListener("click", function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		myLeads.push(tabs[0].url);
		localStorage.setItem("myLeads", JSON.stringify(myLeads));
		render();
	});
});

if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage;
	render();
}

inputBtn.addEventListener("click", saveInputValue);
inputEl.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		saveInputValue();
	}
});

function saveInputValue() {
	if (inputEl.value != "") {
		myLeads.push(inputEl.value);
	}

	localStorage.setItem("myLeads", JSON.stringify(myLeads));
	render();
	inputEl.value = "";
}

function render() {
	let listItems = "";
	for (let i = 0; i < myLeads.length; i++) {
		listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
                <button class="del">X</button>                 
            </li>
        `;
	}
	ulEl.innerHTML = listItems;

	document.querySelectorAll(".del").forEach((button, index) => {
		button.addEventListener("click", () => {
			deleteOne(index);
		});
	});
}

