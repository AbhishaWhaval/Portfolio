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
    if(!isDeleting)i=(i+1)%roles.length;
  }

  setTimeout(type,isDeleting?50:100);
}
type();

// NAVBAR SCROLL FIX
document.querySelectorAll('nav a').forEach(anchor=>{
  anchor.addEventListener('click',function(e){
    e.preventDefault();

    const target=document.querySelector(this.getAttribute('href'));
    const offset=90;

    const pos=target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({top:pos,behavior:"smooth"});
  });
});

// 🔥 PARTICLE FIXED VERSION
window.addEventListener("load",()=>{

  const canvas=document.getElementById("particles");
  const ctx=canvas.getContext("2d");

  function resizeCanvas(){
    const rect=canvas.getBoundingClientRect();
    canvas.width=rect.width;
    canvas.height=rect.height;
  }

  resizeCanvas();
  window.addEventListener("resize",resizeCanvas);

  let particles=[];

  for(let i=0;i<60;i++){
    particles.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      dx:(Math.random()-0.5),
      dy:(Math.random()-0.5)
    });
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
      p.x+=p.dx;
      p.y+=p.dy;

      if(p.x<0||p.x>canvas.width)p.dx*=-1;
      if(p.y<0||p.y>canvas.height)p.dy*=-1;

      ctx.beginPath();
      ctx.arc(p.x,p.y,2,0,Math.PI*2);
      ctx.fillStyle="#9333ea";
      ctx.fill();
    });

    for(let i=0;i<particles.length;i++){
      for(let j=i;j<particles.length;j++){
        let dx=particles[i].x-particles[j].x;
        let dy=particles[i].y-particles[j].y;
        let dist=Math.sqrt(dx*dx+dy*dy);

        if(dist<100){
          ctx.strokeStyle="rgba(147,51,234,0.2)";
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
});