function toggleMenu() {
  var dropdownMenu = document.getElementById("myDropdown");
  var menuIcon = document.querySelector('.navbarIcons .fa');

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

// Fetch data from JSON file
fetch('home.json')
  .then(response => response.json())
  .then(data => {
    // Populate banner section
    // document.getElementById('banner-title').innerText = data.banner.title;

    // // Populate navigation
    // const navLinks = data.navigation.map(item => `<a href="${item.link}">${item.label}</a>`);
    // document.getElementById('myTopnav').innerHTML = navLinks.join('');

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

     // Populate navbar links
     document.getElementById('home-icon').href = data.navbarLinks.home;
     document.getElementById('calendar-icon').href = data.navbarLinks.calendar;
     document.getElementById('call-icon').href = data.navbarLinks.call;

    // Populate footer
    document.querySelector('.footer-item:first-child p').innerText = data.footer.about;
    document.querySelector('.footer-item:last-child p:first-child').innerText = `Email: ${data.footer.contact.email}`;
    document.querySelector('.footer-item:last-child p:last-child').innerText = `Phone: ${data.footer.contact.phone}`;
  })
  .catch(error => console.error('Error fetching data:', error));

document.getElementById('schedule-button').addEventListener('click', function() {
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
