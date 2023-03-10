const loadPhone = async (search) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data);
};

const displayPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerText = "";
  // display 12 phones only
  const showAll = document.getElementById("show-all");
  if (phones.length > 12) {
    phones = phones.slice(0, 12);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //display no phones found
  const noPhone = document.getElementById("warning-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  phones.forEach((phone) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("col");
    newDiv.innerHTML = `
    <div class="card p-4">
    <img src="${phone.image}" class="card-img-top" alt="..." />
    <div class="card-body">
    <h5 class="card-title">${phone.phone_name}</h5>
    <p class="card-text">
      This is a longer card with supporting text below as a natural lead-in to
      additional content. This content is a little bit longer.</p>
      <button class="btn btn-primary" onclick="loadDetails('${phone.slug}')" data-bs-toggle="modal"
      data-bs-target="#staticBackdrop">More Details ></button>
    </div>
    </div>
  `;
    phoneContainer.appendChild(newDiv);
  });
  // loading end
  toggleSpinner(false);
};

const loadDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.data);
};

const displayDetails = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("staticBackdropLabel");
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
    <p>Brand: ${phone.brand ? phone.brand : "Not a brand"}</p>
    <p>Display size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : "No information"}</p>
    <p>storage: ${phone.mainFeatures ? phone.mainFeatures.storage : "No information"}</p>
    <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : "No information"}</p>
 `;
};

loadDetails();

const searchPhone = () => {
  // start loading
  toggleSpinner(true);
  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;
  loadPhone(searchText);
  searchField.value = "";
};

const inputField = document.getElementById("searchField");
const searchButton = document.getElementById("search-button");
inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search-button").click();
  }
});

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading === true) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

loadPhone("a");
