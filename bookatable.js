document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("tableBookingForm");
    const successDiv = document.getElementById('tableBookingSuccess');

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Clear previous success or error messages
        successDiv.innerHTML = '';

        // Validate form fields
        const name = document.getElementById("tbName").value.trim();
        const email = document.getElementById("tbEmail").value.trim();
        const date = document.getElementById("tbDateInput").value.trim();
        const time = document.getElementById("tbTimeInput").value.trim();
        const person = document.getElementById("tbPerson").value.trim();

        let isValid = true;

        clearErrors();

        if (!name) {
            showError("tbName", "Please enter your name");
            isValid = false;
        }

        if (!email || !validateEmail(email)) {
            showError("tbEmail", "Please enter a valid email");
            isValid = false;
        }

        if (!date) {
            showError("tbDateInput", "Please select a date");
            isValid = false;
        }

        if (!time) {
            showError("tbTimeInput", "Please select a time");
            isValid = false;
        }

        if (person === "Person") {
            showError("tbPerson", "Please select number of persons");
            isValid = false;
        }

        if (isValid) {
            sendBookingForm(name, email, date, time, person);
        }
    });

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const helpBlock = field.nextElementSibling;
        helpBlock.textContent = message;
        helpBlock.classList.add("text-danger");
    }

    function clearErrors() {
        const helpBlocks = document.querySelectorAll("#tableBookingForm .help-block");
        helpBlocks.forEach(block => block.textContent = '');
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }

    function sendBookingForm(name, email, date, time, person) {
        const xhr = new XMLHttpRequest();
        const url = 'https://formspree.io/f/xldrrqng';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    showBookingSuccess();
                    form.reset();
                } else {
                    showBookingErrorResponse();
                }
            }
        };

        const formData = JSON.stringify({ name, email, date, time, person });
        xhr.send(formData);
    }

    function showBookingSuccess() {
        successDiv.innerHTML = "<div class='alert alert-success' id='bookatablealert'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>Your table has been booked successfully!</strong></div>";
    }

    function showBookingErrorResponse() {
        successDiv.innerHTML = "<div class='alert alert-danger' id='formerror'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>Sorry, there was an error booking your table. Please try again later!</strong></div>";
    }

    // Clear validation messages when focusing on any input field
    document.querySelectorAll("#tableBookingForm input, #tableBookingForm select").forEach(element => {
        element.addEventListener('focus', clearErrors);
    });
});