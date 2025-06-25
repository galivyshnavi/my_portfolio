document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksA = document.querySelectorAll('.nav-links a');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navLinksA.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active class in navigation
            navLinksA.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // View Resume Button
    const resumeBtn = document.getElementById('resume-btn');
    resumeBtn.addEventListener('click', function() {
        const resumeSection = document.getElementById('resume');
        
        window.scrollTo({
            top: resumeSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Update active class in navigation
        navLinksA.forEach(link => link.classList.remove('active'));
        document.querySelector('a[href="#resume"]').classList.add('active');
    });
    
    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Set active navigation based on scroll position
    window.addEventListener('scroll', setActiveNav);
    
    function setActiveNav() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksA.forEach(link => link.classList.remove('active'));
                document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }
    
    // Animate skills progress bars when they come into view
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skillItems.forEach(item => {
            const progress = item.querySelector('.progress');
            const percent = progress.style.width;
            
            // Reset width to 0 for animation
            progress.style.width = '0';
            
            // Animate to the specified width
            setTimeout(() => {
                progress.style.width = percent;
            }, 100);
        });
    }
    
    // Use Intersection Observer to trigger animation when skills section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Set home link as active by default
    if (window.location.hash === '') {
        document.querySelector('a[href="#home"]').classList.add('active');
    }
});