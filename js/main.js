import '../styles/main.css';
import '../styles/animations.css';
import '../styles/components.css';

// DOM elements
const body = document.body;
const header = document.getElementById('header');
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const sections = document.querySelectorAll('section');
const revealElements = document.querySelectorAll('.reveal-content, .reveal-image, .fade-in, .slide-in-left, .slide-in-right, .scale-up');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const cursor = document.getElementById('cursor');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const scrollToTopButton = document.querySelector('.back-to-top');

// Initialize theme from localStorage or system preference
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
};

// Toggle theme
const toggleTheme = () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};

// Handle scroll events
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  
  // Header background change on scroll
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Update active nav link based on scroll position
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
  
  // Reveal animations on scroll
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight * 0.85) {
      element.classList.add('revealed');
    }
  });
};

// Toggle mobile navigation
const toggleMobileNav = () => {
  menuToggle.classList.toggle('active');
  mobileNav.classList.toggle('active');
  body.classList.toggle('no-scroll');
};

// Close mobile nav when a link is clicked
const closeMobileNavOnClick = () => {
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  });
};

// Project filtering
const filterProjects = () => {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter projects
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
};

// Custom cursor
const customCursor = () => {
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.classList.add('visible');
    });
    
    document.addEventListener('mouseout', () => {
      cursor.classList.remove('visible');
    });
    
    // Hover effect for links, buttons, and interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-item, .tool-item');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('link-hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('link-hover');
      });
    });
  }
};

// Set actual progress width values for skill bars
const setSkillProgressWidth = () => {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    const percentage = item.querySelector('.skill-percentage').textContent;
    const progressBar = item.querySelector('.skill-progress');
    
    progressBar.style.setProperty('--progress-width', percentage);
  });
};

// Animate skill progress bars on scroll
const animateSkillBars = () => {
  const skillsSection = document.getElementById('skills');
  
  window.addEventListener('scroll', () => {
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.7) {
      skillProgressBars.forEach(bar => {
        bar.classList.add('animate');
      });
    }
  });
};

// Smooth scrolling for anchor links
const smoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
};

// Form submission handling
const handleFormSubmission = () => {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // In a real application, you would send the form data to a server
      // For this demo, we'll just show a success message
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // Simple validation
      let isValid = true;
      const requiredFields = ['name', 'email', 'message'];
      
      requiredFields.forEach(field => {
        if (!formValues[field] || formValues[field].trim() === '') {
          isValid = false;
          const input = contactForm.querySelector(`[name="${field}"]`);
          input.classList.add('error');
        }
      });
      
      if (isValid) {
        contactForm.innerHTML = `
          <div class="success-message">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--color-success-500)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out! I'll get back to you as soon as possible.</p>
          </div>
        `;
      }
    });
  }
};

// Page load entry animation
const pageEntryAnimation = () => {
  body.classList.add('entry-animation');
  
  const entryElements = document.querySelectorAll('.entry-animation .logo, .entry-animation .nav-link, .entry-animation #theme-toggle, .entry-animation .menu-toggle');
  
  window.addEventListener('load', () => {
    entryElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('revealed');
      }, 100 * index);
    });
  });
};

// Initialize the application
const initApp = () => {
  initTheme();
  setSkillProgressWidth();
  handleScroll(); // Initial call to set correct states
  
  // Event listeners
  window.addEventListener('scroll', handleScroll);
  themeToggle.addEventListener('click', toggleTheme);
  menuToggle.addEventListener('click', toggleMobileNav);
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Initialize features
  closeMobileNavOnClick();
  filterProjects();
  customCursor();
  animateSkillBars();
  smoothScrolling();
  handleFormSubmission();
  pageEntryAnimation();
  
  // Prevent flash of unstyled content
  setTimeout(() => {
    document.body.classList.add('content-loaded');
  }, 100);
};

// Run the initialization
document.addEventListener('DOMContentLoaded', initApp);