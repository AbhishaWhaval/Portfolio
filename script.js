// Typing animation
const roles=["AI Developer","ML Engineer","Data Science Enthusiast"];
let i=0,j=0,current="",isDeleting=false;

function type(){
  current=roles[i];
  document.getElementById("typing").textContent=current.substring(0,j);

  if(!isDeleting && j<current.length) j++;
  else if(isDeleting && j>0) j--;
  else{
    isDeleting=!isDeleting;
    if(!isDeleting) i=(i+1)%roles.length;
  }

  setTimeout(type,isDeleting?50:100);
}
type();

// Scroll reveal
const reveals=document.querySelectorAll(".reveal");

window.addEventListener("scroll",()=>{
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight-100){
      el.classList.add("active");
    }
  });
});

// ✅ FIXED NAVBAR SCROLL ISSUE
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if(target){
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

// EMAILJS
(function(){
  emailjs.init("YOUR_PUBLIC_KEY");
})();

document.getElementById("contact-form").addEventListener("submit",function(e){
  e.preventDefault();

  emailjs.sendForm("service_280xjzf","YOUR_TEMPLATE_ID",this)
  .then(()=>{
    document.getElementById("status").innerText="Message Sent!";
    this.reset();
  })
  .catch(()=>{
    document.getElementById("status").innerText="Error sending message";
  });
});