let menu = document.querySelector(".menu");
let closeMenu = document.querySelector(".close-menu");
let sidebar = document.querySelector(".sidebar");

menu.addEventListener("click", openMenuTab);
function openMenuTab() {
    sidebar.style.display = "flex";
}
closeMenu.addEventListener("click", closeMenuBar);
function closeMenuBar() {
    sidebar.style.display = "none";
}

/* -------- Close mobile sidebar on link click -------- */
let sidebarLinks = document.querySelectorAll(".sidebar a");
sidebarLinks.forEach(link => {
    link.addEventListener("click", closeMenuBar);
});

/* -------- Animated role text (typed.js) -------- */
document.addEventListener('DOMContentLoaded', () => {
    const typedElement = document.getElementById('typed-role');
    
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-role', {
            strings: [
                'Software Engineer.', 
                'MERN Stack Developer.', 
                'Tech Enthusiast.', 
                'Problem Solver.'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
});

/* ==========================================================
   Contact Form Submission Handler (Formspree)
========================================================== */
const contactForm = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        // Prevent the default page redirect
        e.preventDefault();
        
        // Grab the data from the form
        const data = new FormData(contactForm);
        const actionURL = contactForm.getAttribute('action');
        
        // Temporarily change button text so the user knows it's sending
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        
        try {
            // Send the data to Formspree
            const response = await fetch(actionURL, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success state
                formMsg.textContent = "Message sent successfully! I will get back to you soon.";
                formMsg.style.color = "#4ade80"; // Tailwind green
                contactForm.reset();
            } else {
                // Formspree returned an error
                formMsg.textContent = "Oops! There was a problem submitting your form.";
                formMsg.style.color = "#f87171"; // Tailwind red
            }
        } catch (error) {
            // Network error
            formMsg.textContent = "Network error. Please try again later.";
            formMsg.style.color = "#f87171";
        } finally {
            // Reset button text
            submitBtn.textContent = originalBtnText;
            
            // Clear the message after 5 seconds
            setTimeout(() => {
                formMsg.textContent = "";
            }, 5000);
        }
    });
}