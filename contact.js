document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const successDiv = document.getElementById('success');

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Clear previous success or error messages
        successDiv.innerHTML = '';

        // Validate form fields
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        let isValid = true;

        clearErrors();

        if (!name) {
            showError("name", "Please enter your name");
            isValid = false;
        }

        if (!email || !validateEmail(email)) {
            showError("email", "Please enter a valid email");
            isValid = false;
        }

        if (!subject) {
            showError("subject", "Please enter a subject");
            isValid = false;
        }

        if (!message || message.length < 5) {
            showError("message", "Please enter a message with at least 5 characters");
            isValid = false;
        }

        if (isValid) {
            sendForm(name, email, subject, message);
        }
    });

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const helpBlock = field.nextElementSibling;
        helpBlock.textContent = message;
        helpBlock.classList.add("text-danger");
    }

    function clearErrors() {
        const helpBlocks = document.querySelectorAll(".help-block");
        helpBlocks.forEach(block => block.textContent = '');
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }

    function sendForm(name, email, subject, message) {
        fetch('https://formspree.io/f/xldrrqng', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, subject, message })
        })
            .then(response => {
                if (response.ok) {
                    showSuccess();
                    form.reset();
                } else {
                    showErrorResponse();
                }
            })
            .catch(() => showErrorResponse());
    }

    function showSuccess() {
        successDiv.innerHTML = "<div class='alert alert-success' id='bookatablealert'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>Your message has been sent. </strong></div>";
    }

    function showErrorResponse() {
        successDiv.innerHTML = "<div class='alert alert-danger' id='formerror'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>Sorry, it seems that my mail server is not responding. Please try again later!</strong></div>";
    }

    // Clear validation messages when focusing on any input field
    document.querySelectorAll("#contactForm input, #contactForm textarea").forEach(element => {
        element.addEventListener('focus', clearErrors);
    });
});
