// ==========================
// TYPING ANIMATION
// ==========================
const roles = ["AI Developer","ML Engineer","Data Science Enthusiast"];
let i = 0, j = 0, current = "", isDeleting = false;

function type() {
  current = roles[i];
  document.getElementById("typing").textContent = current.substring(0, j);

  if (!isDeleting && j < current.length) j++;
  else if (isDeleting && j > 0) j--;
  else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % roles.length;
  }

  setTimeout(type, isDeleting ? 50 : 100);
}
type();


// ==========================
// SCROLL REVEAL
// ==========================
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});


// ==========================
// NAVBAR SMOOTH SCROLL FIX
// ==========================
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      const offset = 90;

      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});


// ==========================
// PARTICLE ANIMATION (FIXED FOR GITHUB)
// ==========================
window.addEventListener("load", () => {

  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let particles = [];

  function initParticles() {
    particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5),
        dy: (Math.random() - 0.5)
      });
    }
  }

  initParticles();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#9333ea";
      ctx.fill();
    });

    // CONNECT LINES
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.strokeStyle = "rgba(147,51,234,0.2)";
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  // MOUSE INTERACTION
  document.addEventListener("mousemove", (e) => {
    particles.forEach(p => {
      let dx = e.clientX - p.x;
      let dy = e.clientY - p.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        p.x += dx * 0.01;
        p.y += dy * 0.01;
      }
    });
  });

});


// ==========================
// EMAILJS
// ==========================
(function(){
  emailjs.init("3UfvpCARhpoKdhOIk");
})();

document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();

  emailjs.sendForm("service_280xjzf","template_jg4s4ip",this)
  .then(()=>{
    document.getElementById("status").innerText="Message Sent!";
    this.reset();
  })
  .catch(()=>{
    document.getElementById("status").innerText="Error sending message";
  });
});