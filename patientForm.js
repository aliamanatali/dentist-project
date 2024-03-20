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

        // Populate footer
        document.querySelector('.footer-item:first-child p').innerText = data.footer.about;
        document.getElementById('contactEmail').innerText = data.footer.contact.email;
        document.getElementById('contactPhone').innerText = data.footer.contact.phone;
    })
    .catch(error => console.error('Error fetching JSON:', error));
