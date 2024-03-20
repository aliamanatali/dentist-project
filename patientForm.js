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
  

// Fetch JSON data
fetch('patientForm.json')
    .then(response => response.json())
    .then(data => {
        // Populate introduction
        const introduction = data["AboutUs"]["Introduction"];
        const introParagraph = document.createElement('p');
        introParagraph.textContent = introduction;
        document.querySelector('.patientForm').insertBefore(introParagraph, document.querySelector('.mainPF'));

        // Populate forms
        const formsList = document.querySelector('.mainPF');
        for (const category in data["Forms"]) {
            if (data["Forms"].hasOwnProperty(category)) {
                const forms = data["Forms"][category];

                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'newPatientForms';
                const categoryHeading = document.createElement('h4');
                categoryHeading.textContent = category;
                categoryDiv.appendChild(categoryHeading);

                forms.forEach(form => {
                    const formName = form.name;
                    const formUrl = form.url;

                    const formParagraph = document.createElement('p');
                    formParagraph.textContent = formName;

                    const formLink = document.createElement('a');
                    formLink.textContent = 'Download File';
                    formLink.href = formUrl;
                    formLink.setAttribute('download', '');

                    categoryDiv.appendChild(formParagraph);
                    categoryDiv.appendChild(formLink);
                });

                formsList.appendChild(categoryDiv);
            }
        }
  })
    .catch(error => console.error('Error fetching JSON:', error));

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
      