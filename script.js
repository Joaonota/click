        document.addEventListener('DOMContentLoaded', function() {
            
            // Preloader
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 800);

            // Navbar Scroll Effect
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Back to Top Button
            const btnTop = document.getElementById('btnTop');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    btnTop.classList.add('show');
                } else {
                    btnTop.classList.remove('show');
                }
            });

            // Active Nav Links on Scroll
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (scrollY >= (sectionTop - sectionHeight / 3)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                });
            });

            // Scroll Reveal Animation
            const reveals = document.querySelectorAll('.reveal');
            const revealOptions = {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px"
            };

            const revealObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                });
            }, revealOptions);

            reveals.forEach(reveal => {
                revealObserver.observe(reveal);
            });

            // Number Counter Animation
            const counters = document.querySelectorAll('.stats-number');
            const counterObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        const finalVal = parseInt(target.getAttribute('data-target'));
                        const isMillion = target.innerText.includes('M');
                        let count = 0;
                        const duration = 2000;
                        const increment = finalVal / (duration / 16); // 60fps

                        const updateCounter = () => {
                            count += increment;
                            if (count < finalVal) {
                                target.innerText = '+' + Math.ceil(count) + (isMillion ? 'M' : '');
                                requestAnimationFrame(updateCounter);
                            } else {
                                target.innerText = '+' + finalVal + (isMillion ? 'M' : '');
                            }
                        };
                        updateCounter();
                        observer.unobserve(target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        });

        // Lenis Smooth Scroll Initialization
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        // Custom Cursor Logic
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursor-follower');
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Follower delay animation
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Cursor hover effect on interactive elements
        const hoverElements = document.querySelectorAll('a, button, .btn, .portfolio-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
                follower.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
                follower.classList.remove('hovered');
            });
        });

        // Vanilla Tilt 3D Effect Initialization
        VanillaTilt.init(document.querySelectorAll(".service-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });

        VanillaTilt.init(document.querySelectorAll(".pricing-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.02
        });
        
        VanillaTilt.init(document.querySelectorAll(".contact-box"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
        });

        VanillaTilt.init(document.querySelectorAll(".gallery-item"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.03
        });

        VanillaTilt.init(document.querySelectorAll(".team-card"), {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02
        });
