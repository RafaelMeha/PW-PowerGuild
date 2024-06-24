window.onload = async function() {
    const form = document.getElementById('form');

    try {
        const response = await fetch('/api/contact');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const contactsData = await response.json();

        contactsData.forEach(contactsData => {
            const contact = new Contact(
                contactsData.id,
                contactsData.first_name,
                contactsData.last_name,
                contactsData.email,
                contactsData.subject,
                contactsData.message,
                contactsData.fk_user_id
            );
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function sendForm() {
    let firstName = document.getElementById('first_name').value;
    let lastName = document.getElementById('last_name').value;
    let email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;

    if(firstName != "" && lastName != "" && email != "" && subject != "" && message != "") {
        const contactData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            subject: subject,
            message: message
        };
    
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log('Success:', result);
            form.reset()
            alert("Email was send successfully! :D")
        } catch (error) {
            console.error('Error submitting form:', error);
            alert("There was an error sending the email! :c")

        }
    }
}
