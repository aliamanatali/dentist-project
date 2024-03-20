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


// Fetch data from JSON file for home.json
fetch('home.json')
  .then(response => response.json())
  .then(data => {
      // Populate banner section title dynamically
      const bannerTitle = `<font size="7">${data.banner.title}</font><br>`;
      document.getElementById('wsite-content-title').innerHTML = bannerTitle;
      document.getElementById('schedule-button').innerText = data.banner.buttonText;

      // Populate welcome section
      document.querySelector('.container-2 h2').innerText = data.welcomeSection.title;
      document.querySelector('.container-2 h1').innerText = data.welcomeSection.subtitle;
      document.querySelector('#p1').innerText = data.welcomeSection.content;
      document.querySelector('#p2').innerText = data.welcomeSection.content2;
      document.querySelector('#p3').innerText = data.welcomeSection.content3;

      // Populate gentle dentist section
      document.querySelector('#aboutus-title').innerText = data.gentleDentistSection.title;
      document.querySelector('#aboutus-content').innerText = data.gentleDentistSection.content;

      // Populate schedule section
      document.getElementById('schedule-button1').innerText = data.scheduleSection.buttonText1;
      document.getElementById('schedule-button2').innerText = data.scheduleSection.buttonText2;

      // Populate Social Media Links
      document.querySelector('.flexI a[href=""]').href = data.socialMedia.linkedin;
      document.querySelector('.flexI a[href=""]').href = data.socialMedia.instagram;
      document.querySelector('.flexI a[href=""]').href = data.socialMedia.facebook;
      document.querySelector('.flexI a[href=""]').href = data.socialMedia.twitter;
      document.querySelector('.flexI a[href=""]').href = data.socialMedia.pinterest;

  })
  .catch(error => console.error('Error fetching home.json:', error));

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

document.getElementById('schedule-button').addEventListener('click', function () {
  const widgetContainer = document.getElementById('widget-container');

  if (!widgetContainer.innerHTML.trim()) {
      const widget = document.createElement('lookahead-widget');
      widget.setAttribute('email', 'dentalcare.delmar@gmail.com');

      const script = document.createElement('script');
      script.type = 'module';
      script.textContent = `
          import register from 'https://cdn.jsdelivr.net/gh/Lookaheadai/appointment-widget-public/dist/lookahead-widget.js';
          register();
      `;

      widgetContainer.appendChild(widget);
      widgetContainer.appendChild(script);
  }
});

function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Event listener for the schedule button
document.getElementById('schedule-button').addEventListener('click', function() {
  openModal(); // Open the modal when the button is clicked
});
