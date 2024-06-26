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
    // Fetch JSON data for ourServices
    fetch('ourServices.json')
        .then(response => response.json())
        .then(data => {
            const proceduresIntro = data["Procedures"]["Introduction"];
            const contactInfo = data["Procedures"]["ContactInfo"];
            const servicesList = document.getElementById('servicesList');

            // Display Procedures introduction
            const introParagraph = document.createElement('p');
            introParagraph.textContent = proceduresIntro;
            servicesList.appendChild(introParagraph);

            // Display contact information
            const contactParagraph = document.createElement('p');
            contactParagraph.textContent = contactInfo;
            servicesList.appendChild(contactParagraph);

            // Display Services
            for (const category in data["Services"]) {
                if (data["Services"].hasOwnProperty(category)) {
                    const services = data["Services"][category];

                    // Add <br> before <ul>
                    const brrr = document.createElement('br');
                    servicesList.appendChild(brrr);
                    
                    // Create heading for category
                    const heading = document.createElement('h4');
                    heading.textContent = category.toUpperCase();
                    servicesList.appendChild(heading);
                    
                    // Add <hr> before <ul>
                    const hr = document.createElement('hr');
                    servicesList.appendChild(hr);
                    
                    // Add <br> before <ul>
                    const brr = document.createElement('br');
                    servicesList.appendChild(brr);


                    // Iterate over services in category
                    services.forEach(service => {
                        const li = document.createElement('li');
                        const link = document.createElement('a');
                        link.textContent = service.name;
                        link.href = service.link;
                        link.style.color = "black"; // Set color to black
                        link.style.textDecoration = "none"; // Remove text decoration
                        li.appendChild(link);
                        servicesList.appendChild(li);
                    });

                }
            }
        })
        .catch(error => console.error('Error fetching JSON for ourServices:', error));

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
