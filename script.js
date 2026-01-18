// Pantalla de carga
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if(loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 2000);
});

function toggleServiceDetails(serviceID) {
            const details = document.getElementById('service-details-${serviceID}');
            const allDetails = document.querySelectorAll('service-details');

            allDetails.forEach(detail => {
                if (detail.id !== 'service-details-${serviceID}' && detail.classList.contains('active')) {
                    detail.classList.remove('active');
                }
            });
            details.classList.toggle('active');
        }

        // Navegación suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Cambio de header al hacer scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if(window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });

        // Menú móvil
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Cerrar menú al hacer clic en un enlace (en móviles)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if(window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });

        /* ===== SHOWCASE SECTION EFFECTS ===== */
        
        // Add parallax effect on showcase cards
        const showcaseCards = document.querySelectorAll('.showcase-card');
        
        showcaseCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // Intersection Observer for entrance animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        showcaseCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });

        // Add glow effect following mouse on showcase section
        const showcase = document.querySelector('.showcase');
        if (showcase) {
            showcase.addEventListener('mousemove', (e) => {
                const glow = showcase.querySelector('.showcase-grid');
                if (glow) {
                    const rect = showcase.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Optional: Add mouse position as CSS variable for advanced effects
                    showcase.style.setProperty('--mouse-x', `${x}px`);
                    showcase.style.setProperty('--mouse-y', `${y}px`);
                }
            });
        }