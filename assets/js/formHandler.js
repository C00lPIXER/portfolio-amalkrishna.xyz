document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('main_contact_form').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission

        // Get form field values
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const subject = document.querySelector('input[name="subject"]').value;
        const message = document.querySelector('textarea[name="message"]').value;

        // Basic form validation
        if (!name || !email || !subject || !message) {
            customAlert("All fields are required.", "error");
            return;
        } else if (!validateEmail(email)) {
            customAlert("Please enter a valid email address.", "error");
            return;
        }

        // Data to be sent to the Google Apps Script web app
        const data = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        // Replace 'YOUR_WEB_APP_URL' with your Google Apps Script web app URL
        fetch('https://script.google.com/macros/s/AKfycbwPKQ7YguCkC44jPzjX-k-GL4GIJHSBJfFxzG60YHvRhn9VSbgjQivTZzP2m7XuJ7SH/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                customAlert("Message sent successfully!", "success");
                setTimeout(() => {
                    
                }, 2000);
            } else {
                customAlert("Error sending message: " + data.message, "error");
            }
        })
        .catch(error => {
            console.error("Error: ", error);
            customAlert("Error: " + error.message, "error");
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function customAlert(message, type) {
        const alertBox = document.createElement('div');
        alertBox.className = `custom-alert ${type}`;
        alertBox.innerHTML = `
            <span>${message}</span>
            <button class="close-alert">&times;</button>
        `;
        document.body.appendChild(alertBox);

        // Add event listener to close button
        alertBox.querySelector('.close-alert').addEventListener('click', () => {
            alertBox.remove();
        });

        setTimeout(() => {
            alertBox.classList.add('fade-out');
            alertBox.addEventListener('transitionend', () => {
                alertBox.remove();
            });
        }, 3000);
    }
});
