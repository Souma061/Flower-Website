const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : 'Send Message';

    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,
        subject: form.subject.value
    };

    // Disable button and show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
    }

    try {
        const response = await fetch('https://flower-website-zpf5.onrender.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('✅ Message sent successfully! We will get back to you soon.');
            form.reset();
        } else {
            alert('❌ ' + (result.message || 'Failed to send message. Please try again.'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Network error. Please check your connection and try again.');
    } finally {
        // Re-enable button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    }
});