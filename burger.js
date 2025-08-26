const burger=document.querySelector(".gold-burger");
const menu=document.getElementById("gold-menu");
burger.addEventListener("click",()=>{const o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",o)});
document.addEventListener("click",e=>{if(!menu.contains(e.target)&&!burger.contains(e.target)){menu.classList.remove("open");burger.setAttribute("aria-expanded","false")}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){menu.classList.remove("open");burger.setAttribute("aria-expanded","false")}});
