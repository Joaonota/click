        document.addEventListener('DOMContentLoaded', function() {
            
            // Preloader
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 800);

            // ─── Dark / Light Mode Toggle ───────────────────────────────
            const html = document.documentElement;
            const themeToggle = document.getElementById('theme-toggle');
            const savedTheme = localStorage.getItem('click-theme') || 'dark';
            html.setAttribute('data-bs-theme', savedTheme);

            themeToggle.addEventListener('click', () => {
                const current = html.getAttribute('data-bs-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-bs-theme', next);
                localStorage.setItem('click-theme', next);
            });

            // ─── Scroll Progress Bar removed (cross-device compatibility) ───

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

            // ─── Gallery Lightbox ───────────────────────────────────────
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    const img = item.querySelector('.gallery-img');
                    const lightbox = document.createElement('div');
                    lightbox.id = 'lightbox';
                    lightbox.innerHTML = `
                        <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.92);z-index:99999;display:flex;justify-content:center;align-items:center;cursor:zoom-out;backdrop-filter:blur(8px);">
                            <img src="${img.src}" style="max-width:90%;max-height:90vh;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.8);object-fit:contain;animation:fadeIn 0.3s ease;">
                            <button onclick="this.closest('#lightbox').remove()" style="position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.15);border:none;color:#fff;width:44px;height:44px;border-radius:50%;font-size:1.2rem;cursor:pointer;backdrop-filter:blur(5px);">&times;</button>
                        </div>`;
                    lightbox.addEventListener('click', (e) => {
                        if (e.target === lightbox.querySelector('div') || e.target === lightbox) {
                            lightbox.remove();
                        }
                    });
                    document.body.appendChild(lightbox);
                });
            });

            // ─── Contact Form Feedback ──────────────────────────────────
            const contactForm = document.querySelector('#contact form');
            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const btn = contactForm.querySelector('button[type="submit"]');
                    const original = btn.innerHTML;
                    btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Mensagem Enviada!';
                    btn.disabled = true;
                    btn.style.background = '#00c853';
                    setTimeout(() => {
                        btn.innerHTML = original;
                        btn.disabled = false;
                        btn.style.background = '';
                        contactForm.reset();
                    }, 3000);
                });
            }
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

        // Custom Cursor Logic — only on pointer (mouse/trackpad) devices
        const isPointerDevice = window.matchMedia('(pointer: fine)').matches;
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursor-follower');

        if (isPointerDevice && cursor && follower) {
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
        } // end isPointerDevice

        // ─── Vanilla Tilt — desktop/mouse only ─────────────────────────
        if (window.matchMedia('(pointer: fine)').matches) {
            VanillaTilt.init(document.querySelectorAll('.service-card'), {
                max: 15, speed: 400, glare: true, 'max-glare': 0.2,
            });
            VanillaTilt.init(document.querySelectorAll('.pricing-card'), {
                max: 10, speed: 400, glare: true, 'max-glare': 0.3, scale: 1.02,
            });
            VanillaTilt.init(document.querySelectorAll('.contact-box'), {
                max: 5, speed: 400, glare: true, 'max-glare': 0.1,
            });
            VanillaTilt.init(document.querySelectorAll('.gallery-item'), {
                max: 10, speed: 400, glare: true, 'max-glare': 0.3, scale: 1.03,
            });
            VanillaTilt.init(document.querySelectorAll('.team-card'), {
                max: 8, speed: 400, glare: true, 'max-glare': 0.2, scale: 1.02,
            });
        }

        // ─── Mobile: Tap artist card to reveal overlay ─────────────────
        if (window.matchMedia('(pointer: coarse)').matches) {
            document.querySelectorAll('.artist-card').forEach(card => {
                card.addEventListener('click', () => {
                    const overlay = card.querySelector('.artist-overlay');
                    const label   = card.querySelector('.artist-label');
                    const isOpen  = card.classList.contains('tapped');
                    document.querySelectorAll('.artist-card.tapped').forEach(c => {
                        c.classList.remove('tapped');
                        c.querySelector('.artist-overlay').style.opacity = '';
                        c.querySelector('.artist-overlay').style.transform = '';
                        if (c.querySelector('.artist-label')) {
                            c.querySelector('.artist-label').style.opacity = '';
                        }
                    });
                    if (!isOpen) {
                        card.classList.add('tapped');
                        overlay.style.opacity = '1';
                        overlay.style.transform = 'translateY(0)';
                        if (label) label.style.opacity = '0';
                    }
                });
            });
        }

        // ─── Navbar: auto-close on mobile when link clicked ────────────
        document.querySelectorAll('#navbarNav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const toggler = document.querySelector('.navbar-toggler');
                const collapse = document.getElementById('navbarNav');
                if (collapse && collapse.classList.contains('show')) {
                    toggler.click();
                }
            });
        });

