function myFunction() {
  var leftMenu = document.querySelector('.lefft');
  leftMenu.classList.toggle('show');
  
  var x = document.getElementById("myTopnav");
  var menuIcon = document.getElementById("menuIcon");
  var closeIcon = document.getElementById("closeIcon");
  
  if (x.className === "topnav") {
      x.className += " responsive";
      menuIcon.style.display = "none"; // Hide the hamburger menu icon
      closeIcon.style.display = "inline-block"; // Show the close icon
  } else {
      x.className = "topnav";
      menuIcon.style.display = "inline-block"; // Show the hamburger menu icon
      closeIcon.style.display = "none"; // Hide the close icon
  }
}



// Function to fetch and handle JSON data
function fetchData() {
  // Fetch JSON data for about page
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
    .catch((error) => console.error("Error fetching JSON for about page:", error));

    fetch('data.json')
    .then(response => response.json())
    .then(data => {
  
    //Populate navbar links
    const navbarLinksContainer = document.getElementById('myTopnav');
    const navbarLinks = data.navbar.links;

    navbarLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        navbarLinksContainer.appendChild(a);
    });

    // Populate navbar icons with links
    const navbarIconsContainer = document.querySelector('.lefft');
    const navbarIcons = data.navbar.icons;

    const iconLinks = navbarIconsContainer.querySelectorAll('a');
    navbarIcons.forEach((icon, index) => {
        if (iconLinks[index]) {
            iconLinks[index].href = icon.url;
        }
    });
  
          // Populate footer
          const aboutUsIntroduction = document.querySelector('.footer-item:first-child p');
          aboutUsIntroduction.textContent = data.footer.aboutUsIntroduction;
  
          const contactInfo = document.querySelectorAll('.footer-item:last-child p');
          contactInfo[0].textContent = `Email: ${data.footer.contact.email}`;
          contactInfo[1].textContent = `Phone: ${data.footer.contact.phone}`;
      })
      .catch(error => console.error('Error fetching data.json:', error));  
    }

// Call fetchData function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", fetchData);
