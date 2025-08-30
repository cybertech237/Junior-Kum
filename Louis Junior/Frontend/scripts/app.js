document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality for About section
    const tabLinks = document.getElementsByClassName('tab-links');
    const tabContents = document.getElementsByClassName('tab-contents');

    function openTab(tabName, event) {
        for (let tabLink of tabLinks) {
            tabLink.classList.remove('active-link');
        }
        for (let tabContent of tabContents) {
            tabContent.classList.remove('active-tab');
        }
        event.currentTarget.classList.add('active-link');
        document.getElementById(tabName).classList.add('active-tab');
    }

    // Add click event to all tab links
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].addEventListener('click', function (event) {
            const tabName = this.textContent.toLowerCase();
            openTab(tabName, event);
        });
    }


    // Form validation
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    // Use querySelector to avoid duplicate IDs for email
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const textAreaError = document.getElementById('text-area');
    const successMessage = document.getElementById('successMessage');
    const submitButton = contactForm.querySelector('.btn2[type="submit"]');

    function resetErrors() {
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        textAreaError.style.display = 'none';
        nameInput.classList.remove('error-field');
        emailInput.classList.remove('error-field');
        messageInput.classList.remove('error-field');
    }

    function validateContactForm() {
        let isValid = true;
        resetErrors();

        // Validate name
        if (!nameInput.value.trim()) {
            nameError.style.display = 'block';
            nameInput.classList.add('error-field');
            // ...existing code...
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            emailError.style.display = 'block';
            emailInput.classList.add('error-field');
            isValid = false;
        }

        // Validate message
        if (!messageInput.value.trim()) {
            textAreaError.style.display = 'block';
            messageInput.classList.add('error-field');
            isValid = false;
        }

        return isValid;
    }

    // Initially hide error messages and success message
    resetErrors();
    successMessage.style.display = 'none';

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateContactForm()) {
            submitButton.disabled = true;
            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        contactForm.style.display = 'none';
                        successMessage.style.display = 'block';
                        document.getElementById('formError').style.display = 'none';
                        setTimeout(function () {
                            contactForm.reset();
                            contactForm.style.display = 'block';
                            successMessage.style.display = 'none';
                            submitButton.disabled = false;
                            resetErrors();
                        }, 5000);
                    } else if (data.errors) {
                        // Show backend validation errors
                        let errorMsg = Object.values(data.errors).join('<br>');
                        document.getElementById('formError').innerHTML = errorMsg;
                        document.getElementById('formError').style.display = 'block';
                        submitButton.disabled = false;
                    } else {
                        document.getElementById('formError').innerHTML = 'An error occurred. Please try again.';
                        document.getElementById('formError').style.display = 'block';
                        submitButton.disabled = false;
                    }
                })
                .catch(() => {
                    document.getElementById('formError').innerHTML = 'Server error. Please try again later.';
                    document.getElementById('formError').style.display = 'block';
                    submitButton.disabled = false;
                });
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // GSAP animation
    const titles = [
        "Web Developer",
        "UI/UX Designer",
        "App Developer"
    ];

    const career = document.getElementById("career");
    let currentIndex = 0;

    // Initial pop-in animation
    gsap.from(career, {
        duration: 1,
        scale: 0,
        rotationY: 180,
        opacity: 0,
        ease: "back.out(1.7)",
        delay: 0.5
    });

    function cycleTitles() {
        const nextIndex = (currentIndex + 1) % titles.length;
        const nextTitle = titles[nextIndex];

        gsap.timeline()
            .to(career, {
                duration: 0.4,
                scale: 0.8,
                y: -10,
                color: "#ec4899",
                ease: "power2.in",
                onComplete: () => {
                    career.textContent = nextTitle;
                }
            })
            .to(career, {
                duration: 0.6,
                scale: 1.2,
                y: 0,
                color: "#4f46e5",
                rotationY: 360,
                ease: "elastic.out(1, 0.5)"
            })
            .to(career, {
                duration: 0.3,
                scale: 1,
                ease: "power1.out"
            });

        currentIndex = nextIndex;
        setTimeout(cycleTitles, 3000);
    }

    // Start cycling after initial animation
    setTimeout(cycleTitles, 2000);
});