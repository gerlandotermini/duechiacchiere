window.addEventListener("DOMContentLoaded",e=>{let l=(e,t)=>{e.addEventListener("click",t,!1),e.addEventListener("touchstart",t,{passive:!0}),e.addEventListener("touchend",e=>{e.preventDefault()})};var t=e=>{e=("; "+document.cookie).split("; "+e+"=");return 2===e.length?decodeURIComponent(e.pop().split(";").shift()):""};const n=document.getElementById("backtotop");if(window.onscroll=()=>{600<document.body.scrollTop||600<document.documentElement.scrollTop?n.classList.add("active"):n.classList.remove("active")},document.body.classList.contains("single")){let n=()=>{var e=document.getElementById("restore-reply-button");null!==e&&(e.classList.remove("visually-hidden"),e.removeAttribute("id"))},t=e=>{e.preventDefault(),n(),e.currentTarget.setAttribute("id","restore-reply-button"),e.currentTarget.classList.add("visually-hidden");var t=document.getElementById("reply-title");t.hasAttribute("data-original-title")||t.setAttribute("data-original-title",t.textContent),t.textContent=e.currentTarget.getAttribute("data-replyto"),document.getElementById("comment_parent").value=e.currentTarget.getAttribute("data-commentid"),e.currentTarget.closest("li").appendChild(document.getElementById("comment-form").parentElement),document.getElementById("cancel-comment-reply").style.display="block",document.getElementById("comment").focus()};document.querySelectorAll(".comment-reply-link").forEach(e=>{l(e,t)});var a=document.getElementById("cancel-comment-reply");null!==a&&l(a,e=>{e.preventDefault(),n(),document.getElementById("cancel-comment-reply").style.display="none";e=document.getElementById("reply-title");e.textContent=e.getAttribute("data-original-title"),document.getElementById("comment_parent").value=0,document.getElementById("comments").appendChild(document.getElementById("comment-form").parentElement),document.getElementById("comment").focus()}),document.getElementById("comment-form").addEventListener("submit",e=>{e.preventDefault();let t=!0;e.target.querySelectorAll("[required]").forEach(e=>{t=t&&""!=e.value.trim()}),(t=e.target.querySelector("#email")&&null==e.target.querySelector("#email").value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)?!1:t)?e.target.submit():(document.getElementById("comment-submit").classList.add("shake"),setTimeout(()=>{document.getElementById("comment-submit").classList.remove("shake")},500))})}void 0!==duechiacchiere.COOKIEHASH&&(null!==document.getElementById("author")&&(document.getElementById("author").value=t("comment_author_"+duechiacchiere.COOKIEHASH)),null!==document.getElementById("email")&&(document.getElementById("email").value=t("comment_author_email_"+duechiacchiere.COOKIEHASH)),null!==document.getElementById("url"))&&(document.getElementById("url").value=t("comment_author_url_"+duechiacchiere.COOKIEHASH));const o=document.getElementById("mobile-nav-button"),r=document.getElementById("mobile-search-button"),c=document.getElementById("menu-overlay");let s=0,d=(e,t)=>{"touchstart"!=e.type&&e.preventDefault();var n=document.getElementById("primary-menu");if(null===n||null===c||null===o)return!1;"close"==t||o.classList.contains("active")?(n.classList.remove("active"),o.classList.remove("active"),u(e,"hide")):"open"!=t&&o.classList.contains("active")||(i(e,"close",!0),n.classList.add("active"),o.classList.add("active"),u(e,"show"))},i=(e,t,n)=>{n||d(e,"close"),"close"==t||r.classList.contains("active")?(r.classList.remove("active"),u(e,"hide"),n?document.getElementById("search-form").style.zIndex="initial":setTimeout(()=>{r.classList.contains("active")||(document.getElementById("search-form").style.zIndex="initial")},1010)):"open"!=t&&r.classList.contains("active")||(r.classList.add("active"),document.getElementById("search-form").style.zIndex="475",document.getElementById("search-field").focus(),document.getElementById("search-field").closest(".widget").scrollIntoView(),u(e,"show"))},u=(e,t)=>{"hide"==t?(c.classList.remove("active"),document.body.style.paddingRight=0):(c.classList.add("active"),s=document.documentElement.clientWidth,document.body.style.paddingRight=document.documentElement.clientWidth-s+"px")};l(o,e=>{d(e,"toggle")}),l(r,e=>{i(e,"toggle",!1)}),l(c,e=>{u(e,"hide"),d(e,"close"),i(e,"close",!1)}),document.querySelectorAll("#primary-menu .menu-item-has-children").forEach(n=>{var e=n.childNodes[0].textContent;let t="il ",a="dal";if(-1!=["a","e","i","o","u"].indexOf(e.charAt(0))?(t="l'",a+="l'"):"a"==e.slice(-1)?(t="la ",a+="la "):a+=" ",n.querySelector("a").setAttribute("aria-expanded","false"),n.querySelector("a").insertAdjacentHTML("afterend",'<a class="svg open-submenu" href="#" aria-expanded="false" aria-haspopup="true"><span class="visually-hidden"> apri il sottomenu per '+t+e+"</span></a>"),0===parseInt(window.getComputedStyle(document.body,"::before").getPropertyValue("padding"))&&n.querySelector(".sub-menu").insertAdjacentHTML("afterbegin",'<li class="menu-item"><a class="svg close-submenu" href="#">esci '+a+e+"</a></li>"),n.addEventListener("mouseover",e=>{n.querySelectorAll(":scope > a").forEach(e=>{e.setAttribute("aria-expanded","true")})}),n.addEventListener("mouseout",e=>{n.querySelectorAll(":scope > a").forEach(e=>{e.setAttribute("aria-expanded","false")})}),l(n.querySelector(".open-submenu"),e=>{"touchstart"!=e.type&&e.preventDefault(),n.classList.add("active"),n.querySelectorAll(":scope > a").forEach(e=>{e.setAttribute("aria-expanded","true")})}),n.querySelectorAll(".close-submenu").forEach(e=>{l(e,e=>{"touchstart"!=e.type&&e.preventDefault(),n.classList.remove("active"),n.querySelectorAll(":scope > a").forEach(e=>{e.setAttribute("aria-expanded","false")}),1===parseInt(window.getComputedStyle(document.body,":before").getPropertyValue("padding"))&&n.querySelector("a").focus()})}),1===parseInt(window.getComputedStyle(document.body,"::before").getPropertyValue("padding"))){let t=!1;n.querySelector(".sub-menu").addEventListener("focusout",e=>{setTimeout(()=>{t=!1,((t,n)=>{var a=[];if(t.parentNode){let e=t.parentNode.firstChild;for(;e;)1!==e.nodeType||e===t||n&&!e.classList.contains(n)||a.push(e),e=e.nextSibling}return a})(e.target.parentElement).forEach(e=>{t=t||document.activeElement.parentElement===e}),t||(n.classList.remove("active"),n.querySelectorAll(":scope > a").forEach(e=>{e.setAttribute("aria-expanded","false")}))},10)})}}),document.body.addEventListener("keyup",e=>{"Escape"==e.key&&document.querySelectorAll(".menu-item-has-children").forEach(e=>{e.classList.remove("active"),e.querySelector(".open-submenu").setAttribute("aria-expanded","false")})}),document.querySelectorAll("#main-wrapper a").forEach(e=>{var t;e.getAttribute("href")&&-1==e.hostname.indexOf(location.hostname.replace("www.",""))&&(e.target="_blank",e.querySelector(".visually-hidden")||e.insertAdjacentHTML("beforeend",'<span class="visually-hidden"> (apre una nuova finestra)</span>'),(t=(e.getAttribute("rel")||"").split(" ")).includes("noopener")||t.push("noopener"),e.setAttribute("rel",t.join(" ").trim()))});a=new Date,t=document.querySelector("#widget-back-in-time ul");t&&t.insertAdjacentHTML("beforeend",'<li><a href="/?day='+String(a.getDate())+"&amp;monthnum="+String(a.getMonth()+1)+'&amp;year=0" rel="nofollow">Oggi nel passato</a></li>')});