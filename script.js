document.addEventListener('DOMContentLoaded', () => {
    const landingSection = document.getElementById('landing');
    const semestersSection = document.getElementById('semesters');
    const enterBtn = document.getElementById('enterBtn');
    const backBtn = document.getElementById('backBtn');

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Create additional floating particles
    createFloatingParticles();

    // Mouse move parallax effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Parallax effect for blobs
        const blobs = document.querySelectorAll('.blob');
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.05;
            const x = (mouseX - window.innerWidth / 2) * speed;
            const y = (mouseY - window.innerHeight / 2) * speed;
            
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Enter button - transition to semesters section
    enterBtn.addEventListener('click', () => {
        transitionToSection(semestersSection, landingSection);
        playTransitionSound();
    });

    // Back button - transition to landing section
    backBtn.addEventListener('click', () => {
        transitionToSection(landingSection, semestersSection);
        playTransitionSound();
    });

    // Function to handle section transitions
    function transitionToSection(showSection, hideSection) {
        // Remove active class from current section
        hideSection.classList.remove('active');
        
        // Add active class to new section after a brief delay
        setTimeout(() => {
            showSection.classList.add('active');
        }, 100);

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Enhanced hover effects for semester cards
    const semesterCards = document.querySelectorAll('.semester-card');
    
    semesterCards.forEach((card, index) => {
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-10px)';
            
            // Add ripple effect
            createRipple(this);
        });

        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });

        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.05)
                translateY(-10px)
            `;
        });

        // Reset tilt on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });

        // Stagger animation on page load
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Create ripple effect on cards
    function createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)';
        ripple.style.borderRadius = '2rem';
        ripple.style.pointerEvents = 'none';
        ripple.style.opacity = '0';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple animation to stylesheet dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            0% {
                opacity: 0;
                transform: scale(0);
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Create floating particles
    function createFloatingParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            const startX = Math.random() * 100;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
                border-radius: 50%;
                left: ${startX}%;
                bottom: -10px;
                animation: floatUp ${duration}s ${delay}s linear infinite;
                pointer-events: none;
            `;
            
            particlesContainer.appendChild(particle);
        }

        // Add float animation
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(floatStyle);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Press 'Escape' to go back to landing
        if (e.key === 'Escape' && semestersSection.classList.contains('active')) {
            transitionToSection(landingSection, semestersSection);
        }
        
        // Press 'Enter' on landing to go to semesters
        if (e.key === 'Enter' && landingSection.classList.contains('active')) {
            transitionToSection(semestersSection, landingSection);
        }
    });

    // Add subtle sound effect for transitions (optional - uses Web Audio API)
    function playTransitionSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            // Silently fail if Web Audio API is not supported
            console.log('Audio API not supported');
        }
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all semester cards
    semesterCards.forEach(card => {
        observer.observe(card);
    });

    // Add loading animation on page load
    window.addEventListener('load', () => {
        landingSection.style.opacity = '1';
        
        // Animate elements sequentially
        setTimeout(() => {
            const iconWrapper = document.querySelector('.icon-wrapper');
            if (iconWrapper) {
                iconWrapper.style.animation = 'fadeInScale 0.8s ease forwards';
            }
        }, 100);

        setTimeout(() => {
            const mainTitle = document.querySelector('.main-title');
            if (mainTitle) {
                mainTitle.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        }, 300);

        setTimeout(() => {
            const taglineSection = document.querySelector('.tagline-section');
            if (taglineSection) {
                taglineSection.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        }, 500);

        setTimeout(() => {
            const ctaButton = document.querySelector('.cta-button');
            if (ctaButton) {
                ctaButton.style.animation = 'fadeInScale 0.8s ease forwards';
            }
        }, 700);
    });

    // Add entrance animations
    const entranceStyle = document.createElement('style');
    entranceStyle.textContent = `
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(entranceStyle);

    // Add smooth scroll reveal for semester cards when section becomes active
    const revealCards = () => {
        if (semestersSection.classList.contains('active')) {
            semesterCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.8s ease forwards`;
                    card.style.opacity = '1';
                }, index * 100);
            });
        }
    };

    // Call reveal when entering semesters section
    enterBtn.addEventListener('click', () => {
        setTimeout(revealCards, 500);
    });

    // Prevent default behavior on card clicks to ensure smooth navigation
    semesterCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Add a small delay for visual feedback
            e.preventDefault();
            const href = card.getAttribute('href');
            
            // Add click animation
            card.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                window.open(href, '_blank');
                card.style.transform = '';
            }, 150);
        });
    });

    // Add easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
            konamiCode = [];
        }
    });

    function activateEasterEgg() {
        // Create confetti effect
        const colors = ['#a855f7', '#ec4899', '#3b82f6', '#fbbf24', '#10b981'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: 50%;
                left: 50%;
                opacity: 1;
                pointer-events: none;
                z-index: 9999;
                border-radius: 50%;
            `;
            
            document.body.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 10 + 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let x = 0;
            let y = 0;
            let opacity = 1;
            
            const animate = () => {
                x += vx;
                y += vy + 2; // gravity
                opacity -= 0.01;
                
                confetti.style.transform = `translate(${x}px, ${y}px)`;
                confetti.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
        
        console.log('🎉 Easter egg activated! You found the secret!');
    }

    // Performance optimization: Debounce mouse move events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add visibility change handler to pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const blobs = document.querySelectorAll('.blob');
        if (document.hidden) {
            blobs.forEach(blob => {
                blob.style.animationPlayState = 'paused';
            });
        } else {
            blobs.forEach(blob => {
                blob.style.animationPlayState = 'running';
            });
        }
    });

    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && landingSection.classList.contains('active')) {
                // Swipe left - go to semesters
                transitionToSection(semestersSection, landingSection);
            } else if (diff < 0 && semestersSection.classList.contains('active')) {
                // Swipe right - go back to landing
                transitionToSection(landingSection, semestersSection);
            }
        }
    }

    console.log('🚀 NoteVerse initialized successfully!');
    console.log('💡 Tip: Try using arrow keys or swiping to navigate!');
    console.log('🎮 Easter egg: Try the Konami code...');
});