// KUSUMEK FC website
// Change these settings before publishing. The admin panel is a browser-only demo,
// not a secure multi-user content management system.
const CLUB_EMAIL = "fckusumek@gmail.com"; // Example: "kusumekfc@gmail.com"
const ADMIN_PASSWORD = "kusumek2026"; // Change this before sharing the site.

const starterData = {
  players: [
    {id:1,name:"Team Captain",position:"Midfielder",number:8},
    {id:2,name:"First Team Player",position:"Goalkeeper",number:1},
    {id:3,name:"First Team Player",position:"Defender",number:4},
    {id:4,name:"First Team Player",position:"Forward",number:9}
  ],
  subs: [
    {id:1,name:"Substitute Player",position:"Goalkeeper",number:12},
    {id:2,name:"Substitute Player",position:"Defender",number:14},
    {id:3,name:"Substitute Player",position:"Midfielder",number:16},
    {id:4,name:"Substitute Player",position:"Forward",number:18}
  ],
  fixtures: [
    {id:1,opponent:"Community XI",date:"2026-12-06",venue:"Litein",status:"upcoming"},
    {id:2,opponent:"Township United",date:"2026-11-01",venue:"Away",status:"played",homeScore:2,awayScore:1}
  ],
  news: [
    {id:1,title:"A new chapter for KUSUMEK FC",category:"Club update",body:"Welcome to the official home of KUSUMEK FC. This is where our players, supporters and community can follow the club's journey. Update this story with your own club announcement."},
    {id:2,title:"Football brings our community together",category:"Community",body:"From the training ground to match day, our strength comes from the people who stand together behind the badge. Add your latest community news here."},
    {id:3,title:"The work continues on the pitch",category:"Team news",body:"Every training session is a chance to improve. Keep an eye on this space for team updates, match reports and announcements."}
  ]
};
const readData = key => {
  try { const saved = localStorage.getItem("kusumek_" + key); return saved ? JSON.parse(saved) : starterData[key]; }
  catch { return starterData[key]; }
};
let data = {players:readData("players"),subs:readData("subs"),fixtures:readData("fixtures"),news:readData("news")};
const save = key => localStorage.setItem("kusumek_" + key, JSON.stringify(data[key]));
const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const dateParts = value => {
  const d = new Date(value + "T12:00:00");
  return {day:d.toLocaleDateString("en-KE",{day:"2-digit"}),month:d.toLocaleDateString("en-KE",{month:"short"}).toUpperCase(),full:d.toLocaleDateString("en-KE",{day:"numeric",month:"short",year:"numeric"})};
};
function renderPlayers(){
  document.getElementById("squadGrid").innerHTML = data.players.map(p=>`<article class="player-card"><div class="player-portrait"><span class="player-number">${esc(p.number)}</span><span class="player-silhouette">♟</span></div><div class="player-info"><small>${esc(p.position)}</small><h3>${esc(p.name)}</h3></div></article>`).join("") || '<p class="empty-state">Squad profiles will be announced soon.</p>';
}
function renderSubs(){
  document.getElementById("subsList").innerHTML = data.subs.map(p=>`<div class="sub-item"><span class="sub-number">${esc(p.number)}</span><div><strong>${esc(p.name)}</strong><small>${esc(p.position)}</small></div></div>`).join("") || '<p class="empty-state">Substitutes will be announced soon.</p>';
}
function renderFixtures(){
  const upcoming=data.fixtures.filter(f=>f.status==="upcoming").sort((a,b)=>a.date.localeCompare(b.date));
  const played=data.fixtures.filter(f=>f.status==="played").sort((a,b)=>b.date.localeCompare(a.date));
  const card=f=>{const d=dateParts(f.date);return `<article class="match-card"><div class="match-date"><strong>${d.day}</strong><small>${d.month}</small></div><div class="match-info"><strong>KUSUMEK FC <span style="color:#e33b32">vs</span> ${esc(f.opponent)}</strong><small>${esc(f.venue)} · ${d.full}</small></div>${f.status==="played"?`<div class="match-score">${esc(f.homeScore)} - ${esc(f.awayScore)}</div>`:'<div class="match-tag">UPCOMING</div>'}</article>`};
  document.getElementById("upcomingList").innerHTML=upcoming.length?upcoming.map(card).join(""):'<p class="empty-state">No upcoming fixtures announced yet.</p>';
  document.getElementById("resultsList").innerHTML=played.length?played.map(card).join(""):'<p class="empty-state">Match results will appear here.</p>';
}
function renderNews(){
  document.getElementById("newsGrid").innerHTML=data.news.slice(0,3).map((n,i)=>`<article class="news-card"><div class="news-image">${["⚽","🤝","🏆"][i%3]}</div><div class="news-body"><small>${esc(n.category)}</small><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p></div></article>`).join("") || '<p class="empty-state">Club news coming soon.</p>';
}
function renderAll(){renderPlayers();renderSubs();renderFixtures();renderNews();renderManageLists();}
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("clubEmail").textContent=CLUB_EMAIL || "Add your club email in script.js";
const menuToggle=document.getElementById("menuToggle"), nav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));


document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.currentTarget;
  const fd = new FormData(form);

  const feedback = document.getElementById("formFeedback");

  // Check whether the club email is configured
  if (!CLUB_EMAIL) {
    feedback.textContent = "The club email has not been configured.";
    return;
  }

  // Get the form details
  const name = fd.get("name");
  const email = fd.get("email");
  const phone = fd.get("phone");
  const subjectChoice = fd.get("subject");
  const message = fd.get("message");

  // Prepare the email subject
  const subject = `KUSUMEK FC website: ${subjectChoice}`;

  // Prepare the email body
  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone Number: ${phone}\n\n` +
    `Message:\n${message}`;

  // Create the email link
  const mailto =
    `mailto:${CLUB_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  // Display feedback
  feedback.textContent =
    "Opening your email application. Please press Send to submit your message.";

  // Open the visitor's email application
  window.location.href = mailto;

});

const modal=document.getElementById("adminModal");
const openModal=()=>{modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";setTimeout(()=>{const pw=document.getElementById("adminPassword");if(pw&&!document.getElementById("adminLogin").hidden)pw.focus();},50);};
const closeModal=()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";};
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("open"))closeModal();});
document.getElementById("adminOpen").addEventListener("click",openModal);
document.getElementById("adminClose").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
document.getElementById("loginForm").addEventListener("submit",e=>{
  e.preventDefault();const pass=document.getElementById("adminPassword").value;
  if(pass===ADMIN_PASSWORD){document.getElementById("adminLogin").hidden=true;document.getElementById("adminDashboard").hidden=false;document.getElementById("loginError").textContent="";renderManageLists();}
  else document.getElementById("loginError").textContent="Incorrect password. Please try again.";
});
document.getElementById("logoutBtn").addEventListener("click",()=>{document.getElementById("adminDashboard").hidden=true;document.getElementById("adminLogin").hidden=false;document.getElementById("adminPassword").value="";});
document.querySelectorAll(".admin-tabs button").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".admin-tabs button").forEach(b=>b.classList.toggle("active",b===btn));
  ["players","subs","fixtures","news"].forEach(k=>document.getElementById("admin"+k[0].toUpperCase()+k.slice(1)).hidden=k!==btn.dataset.tab);
}));
function renderManageLists(){
  const list=(id,items,label,remove)=>{const el=document.getElementById(id);if(!el)return;el.innerHTML=items.map(x=>`<div class="manage-row"><span>${esc(label(x))}</span><button class="delete-btn" data-remove="${x.id}" data-kind="${id}">DELETE</button></div>`).join("")||'<p class="form-feedback">Nothing added yet.</p>';};
  list("managePlayers",data.players,p=>`${p.number} · ${p.name} — ${p.position}`);
  list("manageSubs",data.subs,p=>`${p.number} · ${p.name} — ${p.position}`);
  list("manageFixtures",data.fixtures,f=>`${f.date} · KUSUMEK vs ${f.opponent} (${f.status})`);
  list("manageNews",data.news,n=>n.title);
  document.querySelectorAll("[data-remove]").forEach(btn=>btn.addEventListener("click",()=>{
    const kind=btn.dataset.kind==="managePlayers"?"players":btn.dataset.kind==="manageSubs"?"subs":btn.dataset.kind==="manageFixtures"?"fixtures":"news";
    data[kind]=data[kind].filter(x=>String(x.id)!==btn.dataset.remove);save(kind);renderAll();
  }));
}
document.getElementById("playerForm").addEventListener("submit",e=>{
  e.preventDefault();const f=new FormData(e.currentTarget);data.players.push({id:Date.now(),name:f.get("name"),position:f.get("position"),number:Number(f.get("number"))});save("players");e.currentTarget.reset();renderAll();
});
document.getElementById("subForm").addEventListener("submit",e=>{
  e.preventDefault();const f=new FormData(e.currentTarget);data.subs.push({id:Date.now(),name:f.get("name"),position:f.get("position"),number:Number(f.get("number"))});save("subs");e.currentTarget.reset();renderAll();
});
document.getElementById("fixtureForm").addEventListener("submit",e=>{
  e.preventDefault();const f=new FormData(e.currentTarget);const item={id:Date.now(),opponent:f.get("opponent"),date:f.get("date"),venue:f.get("venue"),status:f.get("status")};
  if(item.status==="played"){item.homeScore=Number(f.get("homeScore")||0);item.awayScore=Number(f.get("awayScore")||0);}
  data.fixtures.push(item);save("fixtures");e.currentTarget.reset();renderAll();
});
document.getElementById("newsForm").addEventListener("submit",e=>{
  e.preventDefault();const f=new FormData(e.currentTarget);data.news.unshift({id:Date.now(),title:f.get("title"),category:f.get("category"),body:f.get("body")});save("news");e.currentTarget.reset();renderAll();
});
renderAll();


/* Gallery lightbox */
(function(){
  const box=document.getElementById("lightbox");
  if(!box) return;
  const img=document.getElementById("lbImg"), cap=document.getElementById("lbCap");
  const items=[...document.querySelectorAll("#gallery [data-lightbox]")].filter(el=>el.querySelector("img"));
  let index=0, lastFocus=null;
  const show=i=>{
    index=(i+items.length)%items.length;
    const src=items[index].querySelector("img");
    img.src=src.currentSrc||src.src;
    img.alt=src.alt;
    cap.textContent=(index+1)+" / "+items.length;
  };
  const open=i=>{
    lastFocus=document.activeElement;
    show(i);
    box.classList.add("open");box.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
    document.getElementById("lbClose").focus();
  };
  const close=()=>{
    box.classList.remove("open");box.setAttribute("aria-hidden","true");
    document.body.style.overflow="";img.removeAttribute("src");
    if(lastFocus) lastFocus.focus();
  };
  items.forEach((el,i)=>{
    el.addEventListener("click",()=>open(i));
    if(el.tagName!=="BUTTON"){el.tabIndex=0;el.setAttribute("role","button");el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open(i);}});}
  });
  document.getElementById("lbClose").addEventListener("click",close);
  document.getElementById("lbPrev").addEventListener("click",()=>show(index-1));
  document.getElementById("lbNext").addEventListener("click",()=>show(index+1));
  box.addEventListener("click",e=>{if(e.target===box)close();});
  document.addEventListener("keydown",e=>{
    if(!box.classList.contains("open")) return;
    if(e.key==="Escape")close();
    else if(e.key==="ArrowLeft")show(index-1);
    else if(e.key==="ArrowRight")show(index+1);
  });
  let startX=null;
  box.addEventListener("touchstart",e=>{startX=e.touches[0].clientX;},{passive:true});
  box.addEventListener("touchend",e=>{if(startX===null)return;const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>50)show(index+(dx<0?1:-1));startX=null;});
})();
