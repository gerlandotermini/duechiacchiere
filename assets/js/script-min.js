const e={COOKIEHASH:"COOKIEHASHVALUE"};let t=function(e){let t=[];if(!e.parentNode)return t;let n=e.parentNode.firstChild;for(;n;)1===n.nodeType&&n!==e&&t.push(n),n=n.nextSibling;return t};document.querySelectorAll("#header-container ul.menu > .menu-item > a").forEach(e=>{e.addEventListener("focus",function(){this.parentElement.classList.add("focus"),this.setAttribute("aria-expanded","true"),t(this.parentElement).forEach(e=>{e.classList.remove("focus"),e.firstChild.setAttribute("aria-expanded","false")})})});let n=document.getElementById("primary-menu");const o=document.querySelectorAll("#primary-menu .menu-item-has-children"),r='<a class="open-submenu" href="javascript:;"><span class="visually-hidden">visualizza menu per questa stanza</span></a>',c='<li class="menu-item"><a class="close-submenu" href="javascript:;">chiudi stanza</a></li>',a=document.getElementById("mobile-nav-button");o.forEach(e=>{e.querySelector("a").insertAdjacentHTML("afterend",r),e.querySelector(".sub-menu").insertAdjacentHTML("afterbegin",c),e.querySelector(".open-submenu").addEventListener("click",function(t){t.preventDefault(),e.classList.add("active")}),e.querySelector(".close-submenu").addEventListener("click",function(t){t.preventDefault(),e.classList.remove("active")})}),a.addEventListener("click",function(e){e.preventDefault(),n.classList.toggle("active"),a.classList.toggle("active")}),form_container=document.querySelector("#respond"),document.querySelectorAll(".comment-reply-link").forEach(e=>{e.addEventListener("click",function(e){e.preventDefault(),comment_container=this.closest(".comment-body"),form_container.querySelector("#reply-title").classList.add("visually-hidden"),form_container.querySelector("#comment_parent").setAttribute("value",comment_container.getAttribute("id").replace(/\D/g,"")),comment_container.append(form_container),form_container.querySelector("#comment").focus()})}),document.querySelectorAll("a").forEach(e=>{e.getAttribute("href")&&e.hostname!==location.hostname&&(e.target="_blank",e.rel="noopener noreferrer")}),window.onscroll=function(){document.body.scrollTop>300||document.documentElement.scrollTop>300?(document.getElementById("backtotop").style.opacity=1,document.getElementById("backtotop").style.cursor="pointer"):(document.getElementById("backtotop").style.opacity=0,document.getElementById("backtotop").style.cursor="initial")};let l=function(e){const t=("; "+document.cookie).split("; "+e+"=");return 2===t.length?decodeURIComponent(t.pop().split(";").shift()):""};void 0!==e.COOKIEHASH&&null!=document.querySelector("#commentform #author")&&(document.querySelector("#commentform #author").value=l("comment_author_"+e.COOKIEHASH),document.querySelector("#commentform #email").value=l("comment_author_email_"+e.COOKIEHASH),document.querySelector("#commentform #url").value=l("comment_author_url_"+e.COOKIEHASH));