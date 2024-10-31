// Initialize ScrollReveal
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: false
});

// Apply reveal animations
sr.reveal('.hero-content', {});
sr.reveal('.card', { interval: 200 });
sr.reveal('.section-title', {
    origin: 'top'
});

// Handle contact form submission
document.querySelector('.contact-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Update button state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        alert('Failed to send message. Please try again.');
        console.error('Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
});

// Update active navigation state
const updateActiveNav = () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

// Call on page load
updateActiveNav();

// Smooth scroll handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});