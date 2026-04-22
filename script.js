const roles=["AI Developer","ML Engineer","Data Science Enthusiast"];
let i=0,j=0,current="",isDeleting=false;

function type(){
current=roles[i];
document.getElementById("typing").textContent=current.substring(0,j);

if(!isDeleting && j<current.length) j++;
else if(isDeleting && j>0) j--;
else{isDeleting=!isDeleting;if(!isDeleting)i=(i+1)%roles.length;}

setTimeout(type,isDeleting?50:100);
}
type();

const reveals=document.querySelectorAll(".reveal");
window.addEventListener("scroll",()=>{
reveals.forEach(el=>{
if(el.getBoundingClientRect().top<window.innerHeight-100){
el.classList.add("active");
}});
});

// EMAILJS
(function(){emailjs.init("YOUR_PUBLIC_KEY");})();

document.getElementById("contact-form").addEventListener("submit",function(e){
e.preventDefault();
emailjs.sendForm("service_280xjzf","YOUR_TEMPLATE_ID",this)
.then(()=>{document.getElementById("status").innerText="Message Sent!";this.reset();})
.catch(()=>{document.getElementById("status").innerText="Error sending message";});
});