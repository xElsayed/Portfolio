document.addEventListener('DOMContentLoaded', () => {
    // --- Live Clock ---
    function updateClock() {
        const clockElement = document.getElementById('live-clock');
        if (!clockElement) return;

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const date = now.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        clockElement.textContent = `[ ${date} // ${hours}:${minutes}:${seconds} ]`;
    }

    updateClock();
    setInterval(updateClock, 1000);

    // --- Typing Animation ---
    const typingText = document.getElementById('typing-text');

    // CONNECT TO HUBL: Check if window.typingRoles exists (from Module 1), otherwise use defaults
    const roles = window.typingRoles || [
        "Cybersecurity Analyst",
        "Incident Responder",
        "SOC Specialist",
        "Ethical Hacker",
        "Network Security Engineer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingText) return;
        const currentRole = roles[roleIndex];
        let currentText = '';

        if (isDeleting) {
            currentText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        typingText.textContent = currentText;
        typingText.classList.add('border-r-4', 'border-white');

        let typeSpeed = isDeleting ? 50 : 150;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                navLinks.forEach(link => link.classList.remove('active', 'text-cyber-primary'));
                if (navLink) {
                    navLink.classList.add('active', 'text-cyber-primary');
                }
            }
        });
    }, { threshold: 0.1 }); 

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Particle Background ---
    const canvas = document.getElementById('particle-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        const mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
        window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

        class Particle {
            constructor(x, y, dirX, dirY, size, color) {
                this.x = x; this.y = y; this.dirX = dirX; this.dirY = dirY; this.size = size; this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.dirX = -this.dirX;
                if (this.y > canvas.height || this.y < 0) this.dirY = -this.dirY;
                this.x += this.dirX;
                this.y += this.dirY;
                this.draw();
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                let dirX = (Math.random() * 0.4) - 0.2;
                let dirY = (Math.random() * 0.4) - 0.2;
                let color = 'rgba(22, 163, 74, 0.3)';
                particles.push(new Particle(x, y, dirX, dirY, size, color));
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                                 + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    if (distance < (canvas.width/7) * (canvas.height/7)) {
                        opacityValue = 1 - (distance/15000);
                        ctx.strokeStyle = `rgba(200, 216, 232, ${opacityValue * 0.1})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
                if (mouse.x) {
                    let distMouse = ((particles[a].x - mouse.x) * (particles[a].x - mouse.x)) + ((particles[a].y - mouse.y) * (particles[a].y - mouse.y));
                    if (distMouse < mouse.radius * mouse.radius) {
                        opacityValue = 1 - (distMouse / (mouse.radius * mouse.radius));
                        ctx.strokeStyle = `rgba(22, 163, 74, ${opacityValue * 0.5})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) { particles[i].update(); }
            connect();
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            mouse.radius = 150;
            init();
        });

        init();
        animate();
    }

    // --- Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            iconOpen.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
        });
        document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
            });
        });
    }

    // --- Modal Functions (Global) ---
    window.openModal = function(id) {
        const m = document.getElementById(id);
        if(m) m.classList.remove('hidden');
    };
    window.closeModal = function(id) {
        const m = document.getElementById(id);
        if(m) m.classList.add('hidden');
    };
});
