function toggleMenu() {
  var dropdownMenu = document.getElementById("myDropdown");
  var menuIcon = document.querySelector(".navbarIcons .fa");

  if (dropdownMenu.style.display === "none") {
    dropdownMenu.style.display = "block";
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    dropdownMenu.style.display = "none";
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
}
// Fetch JSON data
fetch('about.json')
  .then((response) => {
    console.log("response", response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const introduction = data["AboutUs"]["Introduction"];
    const servicesList = document.getElementById("servicesList");
    const aboutUsIntroduction = document.getElementById("aboutUsIntroduction");
    const doctorsContainer = document.querySelector(".ourdoctor");

    // Display Introduction
    aboutUsIntroduction.textContent = introduction;

    // Display Services
    for (const category in data["Procedures"]) {
      if (data["Procedures"].hasOwnProperty(category)) {
        const services = data["Procedures"][category];

        const br = document.createElement("br");
        servicesList.appendChild(br);

        const heading = document.createElement("h4");
        heading.textContent = category;
        servicesList.appendChild(heading);

        const hr = document.createElement("hr");
        servicesList.appendChild(hr);

        const br2 = document.createElement("br");
        servicesList.appendChild(br2);

        services.forEach((service) => {
          const li = document.createElement("p");
          const link = document.createElement("a");
          link.textContent = service;
          link.style.color = "black";
          link.style.textDecoration = "none";
          li.appendChild(link);
          servicesList.appendChild(li);
        });
      }
    }

    // Populate footer
    document.querySelector(".footer-item:first-child p").innerText =
      data.footer.about;
    document.getElementById("contactEmail").innerText =
      data.footer.contact.email;
    document.getElementById("contactPhone").innerText =
      data.footer.contact.phone;

    // Populate doctors information
    data.doctors.forEach((doctorData) => {
      const doctorDiv = document.createElement("div");
      doctorDiv.classList.add("doctor");

      const doctorImage = document.createElement("div");
      doctorImage.classList.add("fff");
      const doctorImg = document.createElement("img");
      doctorImg.src = doctorData.imageSrc;
      doctorImg.alt = doctorData.name;
      doctorImage.appendChild(doctorImg);
      doctorDiv.appendChild(doctorImage);

      const doctorInfo = document.createElement("div");
      const doctorName = document.createElement("h4");
      doctorName.textContent = doctorData.name;
      const doctorDescription = document.createElement("p");
      doctorDescription.textContent = doctorData.description;
      doctorInfo.appendChild(doctorName);
      doctorInfo.appendChild(doctorDescription);
      doctorDiv.appendChild(doctorInfo);

      doctorsContainer.appendChild(doctorDiv);
    });
  })
  .catch((error) => console.error("Error fetching JSON:", error));
