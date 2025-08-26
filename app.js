(function(){
  const burger=document.querySelector(".gold-burger");
  const menu=document.getElementById("gold-menu");
  if(burger&&menu){
    burger.addEventListener("click",()=>{const o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",o)});
    document.addEventListener("click",e=>{if(!menu.contains(e.target)&&!burger.contains(e.target)){menu.classList.remove("open");burger.setAttribute("aria-expanded","false")}});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"){menu.classList.remove("open");burger.setAttribute("aria-expanded","false")}});
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click",e=>{
      const id=a.getAttribute("href");
      if(id&&id.length>1){
        const t=document.querySelector(id);
        if(t){
          e.preventDefault();
          t.scrollIntoView({behavior:"smooth",block:"start"});
          if(menu&&menu.classList.contains("open")){menu.classList.remove("open");if(burger)burger.setAttribute("aria-expanded","false")}
        }
      }
    });
  });

  const sections=[...document.querySelectorAll("section[id]")];
  const navLinks=[...document.querySelectorAll(".navbar-nav .nav-link")];
  const byId=id=>navLinks.find(l=>l.getAttribute("href")===`#${id}`);
  if(sections.length&&navLinks.length){
    const io=new IntersectionObserver(es=>{
      es.forEach(en=>{
        if(en.isIntersecting){
          navLinks.forEach(l=>l.classList.remove("active"));
          const link=byId(en.target.id);
          if(link)link.classList.add("active");
        }
      });
    },{rootMargin:"-35% 0px -55% 0px",threshold:0});
    sections.forEach(s=>io.observe(s));
  }

  const revealables=[...document.querySelectorAll(".reveal")];
  if(revealables.length){
    const io2=new IntersectionObserver(es=>{
      es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io2.unobserve(e.target)}});
    },{threshold:0.15});
    revealables.forEach(el=>io2.observe(el));
  }

  const phraseEl=document.querySelector('#hero-title2 span#web-dev');
  const phrases=['Web Developer','Web Designer'];
  let pi=0;
  if(phraseEl){
    phraseEl.textContent=phrases[0];
    setInterval(()=>{pi=(pi+1)%phrases.length;phraseEl.textContent=phrases[pi];},2600);
  }

  const btn=document.createElement("button");
  btn.textContent="↑";
  btn.setAttribute("aria-label","Back to top");
  Object.assign(btn.style,{position:"fixed",right:"18px",bottom:"18px",opacity:"0",transform:"translateY(8px)",transition:".25s",zIndex:"20"});
  document.body.appendChild(btn);
  let shown=false;
  window.addEventListener("scroll",()=>{
    const s=window.scrollY>400;
    if(s!==shown){shown=s;btn.style.opacity=s?"1":"0";btn.style.transform=s?"translateY(0)":"translateY(8px)";}
  });
  btn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

  const mailLink=document.querySelector('a[href^="mailto:"], .copy-email');
  if(mailLink&&navigator.clipboard){
    mailLink.addEventListener("click",e=>{e.preventDefault();navigator.clipboard.writeText("you@example.com")});
  }

  const heroImg=document.querySelector(".hero-img");
  let ticking=false;
  if(heroImg){
    window.addEventListener("scroll",()=>{
      if(!ticking){
        window.requestAnimationFrame(()=>{const y=window.scrollY*0.08;heroImg.style.transform=`translateY(${y}px)`;ticking=false});
        ticking=true;
      }
    });
  }

  const tsp=document.getElementById("tsparticles");if(tsp){tsp.style.pointerEvents="none";}

  const form=document.getElementById("contact-form");
  if(form){
    const nameI=form.querySelector("#name");
    const emailI=form.querySelector("#email");
    const subjectI=form.querySelector("#subject");
    const budgetI=form.querySelector("#budget");
    const messageI=form.querySelector("#message");
    const agreeI=form.querySelector("#agree");
    const successEl=document.getElementById("form-success");
    const errorEl=document.getElementById("form-error");
    const submitBtn=form.querySelector('button[type="submit"]');
    const toggleSubmit=()=>{if(submitBtn){submitBtn.disabled=!!(agreeI&&!agreeI.checked);}};
    if(agreeI){toggleSubmit();agreeI.addEventListener("change",toggleSubmit);}
    if(messageI){
      let counter=document.getElementById("message-counter");
      if(!counter){counter=document.createElement("small");counter.id="message-counter";counter.style.display="block";counter.style.textAlign="right";counter.style.opacity="0.7";messageI.insertAdjacentElement("afterend",counter);}
      const updateCount=()=>{counter.textContent=(messageI.value||"").length+" chars";};
      messageI.addEventListener("input",updateCount);
      updateCount();
    }
    const show=el=>{if(el){el.classList.remove("d-none")}};
    const hide=el=>{if(el){el.classList.add("d-none")}};
    form.addEventListener("submit",async e=>{
      e.preventDefault();
      hide(successEl);hide(errorEl);
      if(!form.checkValidity()){form.classList.add("was-validated");return;}
      form.classList.add("was-validated");
      if(submitBtn){submitBtn.disabled=true;submitBtn.dataset.originalText=submitBtn.innerText;submitBtn.innerText="Sending...";}
      try{
        let ok=true;
        const action=form.getAttribute("action");
        const method=(form.getAttribute("method")||"").toUpperCase();
        if(action&&action!=="#"&&method==="POST"){
          const fd=new FormData(form);
          const res=await fetch(action,{method:"POST",body:fd});
          ok=res.ok;
        }else{
          await new Promise(r=>setTimeout(r,600));
          ok=true;
        }
        if(ok){
          show(successEl);
          form.reset();
          form.classList.remove("was-validated");
          toggleSubmit();
          if(messageI){messageI.dispatchEvent(new Event("input"))}
        }else{
          show(errorEl);
        }
      }catch(_){
        show(errorEl);
      }finally{
        if(submitBtn){submitBtn.disabled=false;if(submitBtn.dataset.originalText){submitBtn.innerText=submitBtn.dataset.originalText;delete submitBtn.dataset.originalText;}}
      }
    });
  }
})();
