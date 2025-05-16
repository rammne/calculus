// DOM Elements
const drawerToggle = document.getElementById('drawer-toggle');
const drawer = document.getElementById('drawer');
const drawerClose = document.getElementById('drawer-close');
const drawerBackdrop = document.getElementById('drawer-backdrop');
const drawerLinks = document.querySelectorAll('.drawer-link');
const homeLink = document.getElementById('home-link');
const aboutLink = document.getElementById('about-link');
const homeContent = document.getElementById('content');
const aboutContent = document.getElementById('about');
const heroSection = document.getElementById('home');

// Toggle drawer
function toggleDrawer() {
    drawer.classList.toggle('open');
    drawerBackdrop.classList.toggle('open');
}

// Close drawer
function closeDrawer() {
    drawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
}

// Event listeners
drawerToggle.addEventListener('click', toggleDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerBackdrop.addEventListener('click', closeDrawer);

// Close drawer when clicking on a link
drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeDrawer();
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Handle navigation between Home and About
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    homeContent.style.display = 'block';
    aboutContent.style.display = 'none';
    heroSection.style.display = 'flex';
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    homeContent.style.display = 'none';
    heroSection.style.display = 'none';
    aboutContent.style.display = 'block';
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Handle smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#home' || this.getAttribute('href') === '#about') {
            return; // Let the specific handlers above handle these
        }
        
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Make sure we're in the home view
            homeContent.style.display = 'block';
            aboutContent.style.display = 'none';
            heroSection.style.display = 'flex';
            
            // Scroll to the target section
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to currently visible section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    // Don't check sections if we're in the about view
    if (aboutContent.style.display === 'block') {
        return;
    }
    
    // Get all content sections
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');
            
            // Update drawer links
            drawerLinks.forEach(link => {
                const href = link.getAttribute('href').substring(1);
                if (href === sectionId) {
                    link.style.backgroundColor = 'var(--light-bg)';
                    link.style.color = 'var(--primary-color)';
                    link.style.fontWeight = 'bold';
                } else {
                    link.style.backgroundColor = '';
                    link.style.color = '';
                    link.style.fontWeight = '';
                }
            });
        }
    });
});

// Initialize - make sure home content is showing on page load
window.addEventListener('DOMContentLoaded', () => {
    homeContent.style.display = 'block';
    aboutContent.style.display = 'none';
    heroSection.style.display = 'flex';
});

// The drawer functionality is already handled by the event listeners at the top of this file

// Handle section visibility animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the section is visible
        if (entry.isIntersecting) {
            // Make section title visible if it's not already
            const sectionTitle = entry.target.querySelector('.section-title');
            if (sectionTitle && !sectionTitle.style.opacity) {
                sectionTitle.style.opacity = "1";
            }
            
            // Make section content visible
            const sectionContent = entry.target.querySelector('.section-content');
            if (sectionContent) {
                sectionContent.classList.add('visible');
            }
            
            // Observe each element with .fun-fact, .formula, or .example class
            const animatedElements = entry.target.querySelectorAll('.fun-fact, .formula, .example');
            let delay = 0.1;
            animatedElements.forEach(element => {
                element.style.opacity = "0";
                element.style.transform = "translateY(20px)";
                element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                element.style.transitionDelay = `${delay}s`;
                
                setTimeout(() => {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                }, delay * 1000);
                
                delay += 0.15; // Increment delay for each element
            });
        }
    });
}, { threshold: 0.1 }); // When at least 10% of the section is visible

// Observe all sections
document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === "#about") {
            const aboutSection = document.getElementById('about');
            aboutSection.style.display = 'block';
            document.querySelectorAll('.content-section').forEach(section => {
                if (section.id !== 'about') {
                    section.style.display = 'none';
                }
            });
            document.getElementById('home-link').classList.remove('active');
            document.getElementById('about-link').classList.add('active');
        } else {
            document.getElementById('about').style.display = 'none';
            document.querySelectorAll('.content-section').forEach(section => {
                if (section.id !== 'about') {
                    section.style.display = 'block';
                }
            });
            
            if (targetId !== "#home") {
                const targetElement = document.querySelector(targetId);
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            
            document.getElementById('home-link').classList.add('active');
            document.getElementById('about-link').classList.remove('active');
        }
    });
});