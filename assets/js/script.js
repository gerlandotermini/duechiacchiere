window.addEventListener("load",e=>{const t="COOKIEHASHVALUE";let n=function(e,t){e.addEventListener("click",t,!1),e.addEventListener("touchstart",t,!1),e.addEventListener("touchend",e=>{e.preventDefault()})},l=function(e){const t=("; "+document.cookie).split("; "+e+"=");return 2===t.length?decodeURIComponent(t.pop().split(";").shift()):""};if(window.onscroll=function(){const e=document.getElementById("backtotop");document.body.scrollTop>300||document.documentElement.scrollTop>300?(e.style.opacity=1,e.style.cursor="pointer"):(e.style.opacity=0,e.style.cursor="initial")},document.body.classList.contains("single")){let e=function(e){let t=document.getElementById("restore-reply-link");null!==t&&(t.classList.remove("visually-hidden"),t.removeAttribute("id"))},t=function(t){e(),t.currentTarget.setAttribute("id","restore-reply-link"),t.currentTarget.classList.add("visually-hidden")};document.querySelectorAll(".comment-reply-link").forEach(e=>{n(e,t)});const l=document.getElementById("cancel-comment-reply-link");null!==l&&n(l,e)}void 0!==t&&(null!==document.getElementById("author")&&(document.getElementById("author").value=l("comment_author_"+t)),null!==document.getElementById("email")&&(document.getElementById("email").value=l("comment_author_email_"+t)),null!==document.getElementById("url")&&(document.getElementById("url").value=l("comment_author_url_"+t)));const o=document.getElementById("mobile-nav-button"),c=document.getElementById("menu-overlay");let s=0,a=function(e,t){const n=document.getElementById("primary-menu");if(e.preventDefault(),null===n||null===c||null===o)return!1;"close"==t||o.classList.contains("active")?(n.classList.remove("active"),c.classList.remove("active"),o.classList.remove("active"),document.body.style.overflowY="visible",document.body.style.paddingRight=0):"open"!=t&&o.classList.contains("active")||(n.classList.add("active"),c.classList.add("active"),o.classList.add("active"),s=document.documentElement.clientWidth,document.body.style.overflowY="hidden",document.body.style.paddingRight=document.documentElement.clientWidth-s+"px")};n(o,function(e){a(e,"toggle")}),n(c,function(e){a(e,"close")}),n(document.getElementById("mobile-search-button"),function(e){a(e,"close"),document.getElementById("search-field").focus(),document.getElementById("search-field").closest(".widget").scrollIntoView()}),document.querySelectorAll("#primary-menu .menu-item-has-children").forEach(e=>{e.querySelector("a").insertAdjacentHTML("afterend",'<a class="open-submenu" href="javascript:;"><span class="visually-hidden">entra in questa stanza</span></a>'),e.querySelector(".sub-menu").insertAdjacentHTML("afterbegin",'<li class="menu-item"><a class="close-submenu" href="javascript:;">esci dalla stanza</a></li>'),n(e.querySelector(".open-submenu"),function(t){t.preventDefault(),e.classList.add("active")}),n(e.querySelector(".close-submenu"),function(t){t.preventDefault(),e.classList.remove("active")})}),document.querySelectorAll("a").forEach(e=>{e.getAttribute("href")&&e.hostname!==location.hostname&&(e.target="_blank",e.rel="noopener noreferrer")})});