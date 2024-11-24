const updateClockTime = () => {
  const clockTimeElements = document.getElementsByClassName("clockTime");

  for (item of clockTimeElements) {
    const curr_date = new Date();
    item.innerText = curr_date.getHours() + ":" + curr_date.getMinutes();
  }
};

updateClockTime();
setInterval(updateClockTime, 60000);

const apiUrl = "https://randomuser.me/api?results=10";

let contactList = [];

const slider = document.getElementById("slider");

const searchInputField = document.getElementById("search");

slider.addEventListener("change", (e) => {
  const { value } = e.target;

  if (value < 70) {
    slider.value = 0;
  } else {
    displayAppScreen();
  }
});

searchInputField.addEventListener("keyup", (e) => {
  const filteredContactList = contactList.filter((item) => {
    const fullName =
      item.name.first.toLowerCase() + " " + item.name.last.toLowerCase();

    return fullName.includes(e.target.value.toLowerCase());
  });

  displayContactList(filteredContactList);
});

const displayScreen = (screenName) => {
  const screens = document.getElementsByClassName("screen");

  for (screen of screens) {
    screen.style.display = "none";
  }

  const mainScreen = document.getElementById(screenName);
  mainScreen.style.display = "block";
};

const displayAppScreen = () => {
  displayScreen("appScreen");
};

const displayContactList = (userList) => {
  const userNumber = userList.length;
  const userCountElement = document.getElementById("userCount");

  userCountElement.innerHTML = userNumber;

  const contactAccordian = document.getElementById("contactAccordions");
  contactAccordian.innerHTML = "";

  userList.map((item, index) => {
    const accItem = `
           <div class="accordion-item">
          <h2 class="accordion-header" id="heading">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
              <img src="${item.picture.thumbnail}" alt="" width="50px" height="50px" class="rounded-circle">
              <div class="ms-2">
                <div class="fw-bolder">${item.name.first} ${item.name.last}</div>
                <small>${item.location.street.number}${item.location.street.name}</small>
              </div>
            </button>
          </h2>
          <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#contactAccordions">
            <div class="accordion-body d-flex justify-content-center flex-column align-items-center">
              <img src="${item.picture.large}" alt="" width="100px" height="100px" class="rounded-circle">
              <div class="d-flex flex-column">
                <div><i class="bi bi-person-circle"></i><span>${item.name.first} ${item.name.last}</span></div>
                <a href="tel:${item.cell}">
                <div>
                <i class="bi bi-phone-fill"></i><span>${item.cell}</span></div>
                </a>
                <a href="mailto:${item.email}">
                <div><i class="bi bi-envelope"></i><span>${item.email}</span></div>
                </a>
                
                <div><i class="bi bi-globe-asia-australia"></i><span>${item.location.city}, ${item.location.country}</span></div>
              </div>
            </div>
          </div>
        </div>`;
    contactAccordian.innerHTML += accItem;
  });
};

const displayContactListScreen = async () => {
  displayScreen("contactListScreen");

  //before fetchiong data
  //1.show spinner
  //2.hide contact list

  const showSpinner = document.getElementById("spinner");
  const contactListHide = document.getElementById("contactAccordions");
  showSpinner.style.display = "block";
  contactListHide.style.display = "none";

  //fetch contact data
  const response = await fetch(apiUrl);
  // console.log(response);
  const data = await response.json();
  // console.log(1000000, data);
  contactList = data.results;

  showSpinner.style.display = "none";
  contactListHide.style.display = "block";

  //populate contact list
  displayContactList(contactList);
};

const displayLockScreen = () => {
  slider.value = 0;
  displayScreen("lockScreen");
};
