window.addEventListener("DOMContentLoaded",e=>{const t="COOKIEHASHVALUE";let n=(e,t)=>{e.addEventListener("click",t,!1),e.addEventListener("touchstart",t,{passive:!0}),e.addEventListener("touchend",e=>{e.preventDefault()})},l=e=>{const t=("; "+document.cookie).split("; "+e+"=");return 2===t.length?decodeURIComponent(t.pop().split(";").shift()):""};if(window.onscroll=(()=>{const e=document.getElementById("backtotop");document.body.scrollTop>900||document.documentElement.scrollTop>900?e.style.opacity=1:e.style.opacity=0}),document.body.classList.contains("single")){let e=()=>{let e=document.getElementById("restore-reply-button");null!==e&&(e.classList.remove("visually-hidden"),e.removeAttribute("id"))},t=t=>{t.preventDefault(),e(),t.currentTarget.setAttribute("id","restore-reply-button"),t.currentTarget.classList.add("visually-hidden");const n=document.getElementById("reply-title");n.hasAttribute("data-original-title")||n.setAttribute("data-original-title",n.textContent),n.textContent=t.currentTarget.getAttribute("data-replyto"),document.getElementById("comment_parent").value=t.currentTarget.getAttribute("data-commentid"),t.currentTarget.closest("li").appendChild(document.getElementById("comment-form").parentElement),document.getElementById("cancel-comment-reply").style.display="block",document.getElementById("comment").focus()},l=t=>{t.preventDefault(),e(),document.getElementById("cancel-comment-reply").style.display="none";const n=document.getElementById("reply-title");n.textContent=n.getAttribute("data-original-title"),document.getElementById("comment_parent").value=0,document.getElementById("comments").appendChild(document.getElementById("comment-form").parentElement),document.getElementById("comment").focus()};document.querySelectorAll(".comment-reply-link").forEach(e=>{n(e,t)});const o=document.getElementById("cancel-comment-reply");null!==o&&n(o,l),document.getElementById("comment-form").addEventListener("submit",e=>{e.preventDefault();let t=!0;e.target.querySelectorAll("[required]").forEach(e=>{t=t&&""!=e.value.trim()}),e.target.querySelector("#email")&&null==e.target.querySelector("#email").value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)&&(t=!1),t?e.target.submit():(document.getElementById("comment-submit").classList.add("shake"),setTimeout(()=>{document.getElementById("comment-submit").classList.remove("shake")},500))})}void 0!==t&&(null!==document.getElementById("author")&&(document.getElementById("author").value=l("comment_author_"+t)),null!==document.getElementById("email")&&(document.getElementById("email").value=l("comment_author_email_"+t)),null!==document.getElementById("url")&&(document.getElementById("url").value=l("comment_author_url_"+t)));const o=document.getElementById("mobile-nav-button"),a=document.getElementById("menu-overlay");let c=0,r=(e,t)=>{const n=document.getElementById("primary-menu");if("touchstart"!=e.type&&e.preventDefault(),null===n||null===a||null===o)return!1;"close"==t||o.classList.contains("active")?(n.classList.remove("active"),a.classList.remove("active"),o.classList.remove("active"),document.body.style.overflowY="visible",document.body.style.paddingRight=0):"open"!=t&&o.classList.contains("active")||(n.classList.add("active"),a.classList.add("active"),o.classList.add("active"),c=document.documentElement.clientWidth,document.body.style.overflowY="hidden",document.body.style.paddingRight=document.documentElement.clientWidth-c+"px")};n(o,e=>{r(e,"toggle")}),n(a,e=>{r(e,"close")}),n(document.getElementById("mobile-search-button"),e=>{r(e,"close"),document.getElementById("search-field").focus(),document.getElementById("search-field").closest(".widget").scrollIntoView()}),document.querySelectorAll("#primary-menu .menu-item-has-children").forEach(e=>{let t=e.childNodes[0].textContent,l="il ",o="dal";if(-1!=["a","e","i","o","u"].indexOf(t.charAt(0))?(l="l'",o+="l'"):"a"==t.slice(-1)?(l="la ",o+="la "):o+=" ",e.querySelector("a").insertAdjacentHTML("afterend",'<a class="open-submenu svg icon-chevron-right" href="#" aria-expanded="false"><span class="visually-hidden"> apri il sottomenu per '+l+t+"</span></a>"),e.querySelector(".sub-menu").insertAdjacentHTML("afterbegin",'<li class="menu-item"><a class="close-submenu" href="#"><span class="svg icon-chevron-left"></span> esci '+o+t+"</a></li>"),n(e.querySelector(".open-submenu"),t=>{"touchstart"!=t.type&&t.preventDefault(),e.classList.add("active"),e.querySelector(".open-submenu").setAttribute("aria-expanded","true")}),e.querySelectorAll(".close-submenu").forEach(t=>{n(t,t=>{"touchstart"!=t.type&&t.preventDefault(),e.classList.remove("active"),e.querySelector(".open-submenu").setAttribute("aria-expanded","false"),"1px"===window.getComputedStyle(document.body,":before").getPropertyValue("padding")&&e.querySelector("a").focus()})}),"1px"===window.getComputedStyle(document.body,":before").getPropertyValue("padding")){let t=!1;e.querySelector(".sub-menu").addEventListener("focusout",n=>{setTimeout(()=>{t=!1,((e,t)=>{let n=[];if(!e.parentNode)return n;let l=e.parentNode.firstChild;for(;l;)1!==l.nodeType||l===e||t&&!l.classList.contains(t)||n.push(l),l=l.nextSibling;return n})(n.target.parentElement).forEach(e=>{t=t||document.activeElement.parentElement===e}),t||(e.classList.remove("active"),e.querySelector(".open-submenu").setAttribute("aria-expanded","false"))},10)})}}),document.body.addEventListener("keyup",e=>{"Escape"==e.key&&document.querySelectorAll(".menu-item-has-children").forEach(e=>{e.classList.remove("active"),e.querySelector(".open-submenu").setAttribute("aria-expanded","false")})}),document.querySelectorAll("a").forEach(e=>{if(e.getAttribute("href")&&-1==e.hostname.indexOf(location.hostname)){e.target="_blank",e.querySelector(".visually-hidden")||e.insertAdjacentHTML("beforeend",'<span class="visually-hidden"> (apri link in una nuova finestra)</span>');let t=(e.getAttribute("rel")||"").split(" ");t.includes("noopener")||t.push("noopener"),e.setAttribute("rel",t.join(" ").trim())}})});