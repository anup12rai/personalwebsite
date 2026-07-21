/* ============ BOOT SEQUENCE ============ */
function hideBoot(){
  const boot=document.getElementById('boot');
  if(boot) boot.classList.add('hide');
}
window.addEventListener('load',()=>{ setTimeout(hideBoot,900); });
// Fail-safe: hide it regardless, in case the load event is delayed (slow/blocked fonts, etc.)
setTimeout(hideBoot,2500);

/* ============ NAV: scrolled state, scrollspy, mobile menu ============ */
const header=document.getElementById('site-header');
const navLinks=document.querySelectorAll('[data-nav]');
const sections=document.querySelectorAll('section[id]');
const menuBtn=document.getElementById('menu-btn');
const mobileMenu=document.getElementById('mobile-menu');

menuBtn.addEventListener('click',()=>{
  menuBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  menuBtn.classList.remove('open');mobileMenu.classList.remove('open');
}));

window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled', window.scrollY>40);
},{passive:true});

const spy=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const id=e.target.getAttribute('id');
      navLinks.forEach(l=>{
        l.classList.toggle('active', l.getAttribute('href')==='#'+id);
      });
    }
  });
},{rootMargin:'-45% 0px -50% 0px'});
sections.forEach(s=>spy.observe(s));

/* ============ REVEAL ON SCROLL ============ */
const revealObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in-view');
      revealObserver.unobserve(e.target);
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* ============ SKILL BAR FILL ============ */
const skillObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const bars=e.target.querySelectorAll('.skill-bar-fill');
      bars.forEach(b=>{b.style.width=b.dataset.level+'%';});
      skillObserver.unobserve(e.target);
    }
  });
},{threshold:0.3});
document.querySelectorAll('.skill-card').forEach(c=>skillObserver.observe(c));

/* ============ CURSOR GLOW ON GLASS CARDS ============ */
document.querySelectorAll('.glow-card').forEach(card=>{
  card.addEventListener('mousemove',(e)=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',(e.clientX-r.left)+'px');
    card.style.setProperty('--my',(e.clientY-r.top)+'px');
  });
});

/* ============ MAGNETIC PRIMARY BUTTONS ============ */
document.querySelectorAll('.btn-primary').forEach(btn=>{
  btn.addEventListener('mousemove',(e)=>{
    const r=btn.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*0.18;
    const y=(e.clientY-r.top-r.height/2)*0.18;
    btn.style.transform=`translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='translate(0,0)';});
});

/* ============ PARTICLE NETWORK BACKGROUND ============ */
(function(){
  const canvas=document.getElementById('particle-canvas');
  const ctx=canvas.getContext('2d');
  let w,h,nodes=[];
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    w=canvas.width=canvas.offsetWidth*devicePixelRatio;
    h=canvas.height=canvas.offsetHeight*devicePixelRatio;
  }
  function init(){
    resize();
    const count=Math.min(70, Math.floor((w*h)/45000));
    nodes=Array.from({length:count},()=>({
      x:Math.random()*w, y:Math.random()*h,
      vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3
    }));
  }
  function step(){
    ctx.clearRect(0,0,w,h);
    nodes.forEach(n=>{
      n.x+=n.vx; n.y+=n.vy;
      if(n.x<0||n.x>w)n.vx*=-1;
      if(n.y<0||n.y>h)n.vy*=-1;
    });
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        const maxDist=160*devicePixelRatio;
        if(dist<maxDist){
          ctx.strokeStyle=`rgba(0,229,255,${(1-dist/maxDist)*0.25})`;
          ctx.lineWidth=1;
          ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke();
        }
      }
    }
    nodes.forEach(n=>{
      ctx.fillStyle='rgba(124,92,255,0.7)';
      ctx.beginPath();ctx.arc(n.x,n.y,1.6*devicePixelRatio,0,Math.PI*2);ctx.fill();
    });
    if(!reduced) requestAnimationFrame(step);
  }
  window.addEventListener('resize',init);
  init();
  step();
})();

/* ============ PROJECT DATA + DASHBOARD ============ */
const PROJECTS=[
  {
    id:'jarvis', status:'Completed', categories:['fullstack','ai','hardware'],
    title:'JARVIS — AI Voice Assistant System',
    summary:'A production-grade, voice-controlled assistant spanning nine integrated modules — wake-word detection, speech-to-text, intent classification, automation, and direct Arduino device control.',
    tech:['Python','FastAPI','Whisper/Vosk','Arduino','WebSockets','SQLite'],
    problem:'Most voice assistant demos stop at "recognize a command." The goal here was a genuinely modular system: something that could listen, understand intent (not just keywords), decide on an action, and actually control a physical device — reliably, and end to end.',
    approach:'Built as nine discrete modules connected through a central automation engine: wake-word detection, a speech-to-text layer (Whisper/Vosk), a two-stage intent classifier, a rule-based automation engine backed by SQLite, a serial bridge for Arduino device control, a configurable TTS backend, and a FastAPI REST/WebSocket layer tying it together.',
    architecture:'Audio input → Wake-word detector → STT transcription → Intent classifier (stage 1: category, stage 2: specific action) → Automation engine (rule lookup in SQLite) → Serial bridge to Arduino (if hardware action) or TTS response (if conversational) → FastAPI WebSocket layer for live status back to any connected client.',
    challenges:'Keeping the intent classifier accurate without over-fitting to exact phrasing required a two-stage approach rather than a single flat classifier. Serial communication timing with Arduino also needed careful handling to avoid race conditions between voice input and device state updates.',
    improve:'Given more time, I would add a proper feedback loop so the classifier improves from corrected misfires, and move the rule engine from flat SQLite rules to a small graph-based structure for more complex, multi-step automations.'
  },
  {
    id:'nexus', status:'Completed', categories:['fullstack','ai'],
    title:'NEXUS — Full-Stack Home Automation Platform',
    summary:'A JARVIS-inspired home automation system with real-time multi-client state sync over WebSockets, a rule-based chatbot, and Groq LLM integration for natural-language device control.',
    tech:['FastAPI','WebSockets','Groq LLM','Canvas Animation'],
    problem:'Home automation dashboards typically break the moment two devices (or two browser tabs) try to read or change state at once. The goal was a system where every connected client sees the same live state, instantly, with natural language as a first-class input method.',
    approach:'A FastAPI backend broadcasts state changes to every connected client over WebSockets, so a toggle from one tab (or one device) reflects everywhere immediately. On top of that sits a rule-based chatbot layer, later extended with Groq LLM integration so commands could be phrased naturally instead of matching exact syntax.',
    architecture:'Client actions (UI or chat) → FastAPI WebSocket handler → central state store → broadcast to all connected clients → canvas-based animated glassmorphic UI re-renders live. A companion single-file HTML dashboard variant shares the same visual system for a lighter, dependency-free deployment.',
    challenges:'Synchronizing state across multiple simultaneous clients without conflicting writes required a clear single-source-of-truth pattern on the backend rather than letting each client manage its own local state.',
    improve:'I would add persistence for automation rules created through natural language, so a phrased instruction like "turn off the lights after 10pm" becomes a saved rule, not just a one-time action.'
  },
  {
    id:'faceconnect', status:'Completed', categories:['fullstack'],
    title:'FaceConnect — Social Authentication Platform',
    summary:'A Facebook-style social platform focused on getting authentication right: full registration/login flows, secure session management, and a fully tested set of REST API endpoints.',
    tech:['Flask','SQLite','JavaScript','REST APIs'],
    problem:'Authentication is deceptively hard to get right — sessions, password handling, and edge cases are where most student projects cut corners. The goal was to treat auth as the actual centerpiece, not an afterthought bolted onto a UI.',
    approach:'Built complete registration and login flows in Flask with SQLite for storage, careful session management, and a full REST API layer — then end-to-end tested every endpoint rather than testing manually through the UI alone.',
    architecture:'Vanilla JS frontend → Flask REST endpoints (register, login, session check, logout) → SQLite for user records and session state → server-side session validation on every protected route.',
    challenges:'Balancing security (proper session handling, avoiding common auth pitfalls) with a smooth, Facebook-familiar UX took several iterations — especially around session expiry behavior feeling natural rather than abrupt.',
    improve:'Adding rate-limiting on login attempts and moving from session cookies to a token-based approach would make this closer to production-hardened.'
  },
  {
    id:'sms', status:'Completed', categories:['fullstack'],
    title:'Student Management System',
    summary:'A real-time academic management system with live WebSocket communication, a Python/FastAPI backend, Oracle database integration, and animated SVG timer rings for live session tracking.',
    tech:['Python','FastAPI','Oracle DB','WebSockets','SVG Animation'],
    problem:'Academic management tools are usually static forms. The brief for this Master\\'s-level project was to make one that felt alive — live updates, and a UI polished enough to present as production software, not just coursework.',
    approach:'FastAPI backend connected to an Oracle database for durable academic records, with a WebSocket layer pushing live updates to every connected client. The interface uses a dark-glass aesthetic with animated SVG timer rings to visualize live session/attendance tracking in real time.',
    architecture:'Client UI → FastAPI REST endpoints (CRUD on student/session records) + WebSocket channel (live updates) → Oracle DB for persistent storage → animated SVG components reflecting live state changes without a page refresh.',
    challenges:'Oracle DB integration from a Python backend required more careful connection and transaction handling than the SQLite-based projects, particularly around concurrent writes during live sessions.',
    improve:'I would add role-based access control (admin vs. faculty vs. student views) to make the system usable by more than one type of user out of the box.'
  }
];

const grid=document.getElementById('project-grid');
function renderProjects(filter){
  grid.innerHTML='';
  PROJECTS.filter(p=>filter==='all'||p.categories.includes(filter)).forEach(p=>{
    const card=document.createElement('div');
    card.className='glass glow-card project-card reveal in-view';
    card.innerHTML=`
      <div class="project-preview">
        <svg viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice">
          <defs><linearGradient id="pg-${p.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00e5ff" stop-opacity="0.5"/><stop offset="1" stop-color="#7c5cff" stop-opacity="0.5"/></linearGradient></defs>
          <circle cx="60" cy="40" r="3" fill="url(#pg-${p.id})"/><circle cx="150" cy="70" r="3" fill="url(#pg-${p.id})"/>
          <circle cx="230" cy="30" r="3" fill="url(#pg-${p.id})"/><circle cx="100" cy="120" r="3" fill="url(#pg-${p.id})"/>
          <circle cx="260" cy="110" r="3" fill="url(#pg-${p.id})"/><circle cx="30" cy="100" r="3" fill="url(#pg-${p.id})"/>
          <line x1="60" y1="40" x2="150" y2="70" stroke="url(#pg-${p.id})" stroke-width="1"/>
          <line x1="150" y1="70" x2="230" y2="30" stroke="url(#pg-${p.id})" stroke-width="1"/>
          <line x1="150" y1="70" x2="100" y2="120" stroke="url(#pg-${p.id})" stroke-width="1"/>
          <line x1="100" y1="120" x2="260" y2="110" stroke="url(#pg-${p.id})" stroke-width="1"/>
          <line x1="60" y1="40" x2="30" y2="100" stroke="url(#pg-${p.id})" stroke-width="1"/>
        </svg>
        <div class="project-status"><span class="dot"></span>${p.status}</div>
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
        <div class="tech-tags">${p.tech.map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div>
        <button class="case-link" data-project="${p.id}">View Case Study <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      </div>`;
    grid.appendChild(card);
  });
  document.querySelectorAll('[data-project]').forEach(btn=>{
    btn.addEventListener('click',()=>openModal(btn.dataset.project));
  });
}
renderProjects('all');

document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

/* ============ MODAL ============ */
const modalOverlay=document.getElementById('modal-overlay');
const modalBody=document.getElementById('modal-body');
function openModal(id){
  const p=PROJECTS.find(x=>x.id===id);
  if(!p)return;
  modalBody.innerHTML=`
    <div class="modal-tag">${p.status} · Case Study</div>
    <h3 class="modal-title">${p.title}</h3>
    <div class="modal-section"><h4>Problem</h4><p>${p.problem}</p></div>
    <div class="modal-section"><h4>Approach</h4><p>${p.approach}</p></div>
    <div class="modal-section"><h4>Architecture</h4><p>${p.architecture}</p></div>
    <div class="modal-section"><h4>Key Challenges</h4><p>${p.challenges}</p></div>
    <div class="modal-section"><h4>What I'd Improve</h4><p>${p.improve}</p></div>
    <div class="modal-tech">${p.tech.map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div>
  `;
  modalOverlay.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  modalOverlay.classList.remove('open');
  document.body.style.overflow='';
}
document.getElementById('modal-close').addEventListener('click',closeModal);
modalOverlay.addEventListener('click',(e)=>{if(e.target===modalOverlay)closeModal();});
document.addEventListener('keydown',(e)=>{if(e.key==='Escape'){closeModal();closeAssistant();}});

/* ============ CONTACT FORM (front-end only — wire to a backend/Formspree/EmailJS to actually send) ============ */
const contactForm=document.getElementById('contact-form');
const formMsg=document.getElementById('form-msg');
contactForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const btn=contactForm.querySelector('button[type="submit"]');
  const original=btn.textContent;
  btn.textContent='Sending...';
  btn.disabled=true;
  setTimeout(()=>{
    formMsg.classList.add('show');
    contactForm.reset();
    btn.textContent=original;
    btn.disabled=false;
  },900);
});

/* ============ FLOATING AI ASSISTANT (live Claude API call) ============ */
const asstToggle=document.getElementById('assistant-toggle');
const asstPanel=document.getElementById('assistant-panel');
const asstClose=document.getElementById('assistant-close');
const asstMessages=document.getElementById('asst-messages');
const asstInput=document.getElementById('asst-input');
const asstSend=document.getElementById('asst-send');
const asstChips=document.getElementById('asst-chips');

function openAssistant(){asstPanel.classList.add('open');asstInput.focus();}
function closeAssistant(){asstPanel.classList.remove('open');}
asstToggle.addEventListener('click',()=>{
  asstPanel.classList.contains('open')?closeAssistant():openAssistant();
});
asstClose.addEventListener('click',closeAssistant);

const SYSTEM_PROMPT=`You are a friendly, concise portfolio assistant embedded on Anirudda Rai's personal website. Answer visitor questions ONLY using the information below. Keep answers short (2-4 sentences), warm, and professional. If asked something unrelated to Anirudda or his work, politely redirect to what you can help with.

ABOUT ANIRUDDA RAI:
- Software Engineer, BCA (Bachelor in Computer Application) graduate, aspiring to work at Google.
- Core languages: Python, SQL, JavaScript, Java, C, C++, HTML, CSS.
- Focus areas: AI-integrated systems, full-stack development, hardware + software automation (Arduino).
- Currently available for freelance work.

PROJECTS:
1. JARVIS - AI Voice Assistant: 9-module system with wake-word detection, speech-to-text (Whisper/Vosk), two-stage intent classification, a rule-based automation engine, Arduino serial device control, configurable TTS, and a FastAPI REST/WebSocket layer.
2. NEXUS - Home Automation Platform: FastAPI + WebSocket system with real-time multi-client state sync, a rule-based chatbot, and Groq LLM integration for natural-language device control. Includes a lighter single-file HTML companion dashboard.
3. FaceConnect - Facebook-style social auth platform built with Flask, SQLite, and vanilla JS; full registration/login flows, session management, end-to-end tested REST APIs.
4. Student Management System - Real-time academic management system, Python/FastAPI backend, Oracle DB integration, WebSocket live updates, animated SVG timer rings for session tracking.

SERVICES OFFERED: Full-stack web development, AI chatbot & assistant systems, Arduino + Python automation. Pricing is custom-quoted per project.

CONTACT: Email aniruddharai39@gmail.com · GitHub github.com/anup12rai · LinkedIn (linked on site).`;

let chatHistory=[];

function addMessage(text,sender){
  const div=document.createElement('div');
  div.className='asst-msg '+sender;
  div.textContent=text;
  asstMessages.appendChild(div);
  asstMessages.scrollTop=asstMessages.scrollHeight;
  return div;
}
function addTyping(){
  const div=document.createElement('div');
  div.className='asst-msg bot';
  div.innerHTML='<span class="typing-dot"><span></span><span></span><span></span></span>';
  asstMessages.appendChild(div);
  asstMessages.scrollTop=asstMessages.scrollHeight;
  return div;
}

async function sendToAssistant(question){
  if(!question.trim())return;
  addMessage(question,'user');
  asstChips.style.display='none';
  chatHistory.push({role:'user',content:question});
  const typingEl=addTyping();

  try{
    const response=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-6',
        max_tokens:1000,
        system:SYSTEM_PROMPT,
        messages:chatHistory
      })
    });
    const data=await response.json();
    const textBlocks=(data.content||[]).filter(b=>b.type==='text').map(b=>b.text);
    const reply=textBlocks.join('\\n').trim() || "I'm not sure how to answer that — try asking about Anirudda's projects, skills, or how to get in touch.";
    typingEl.remove();
    addMessage(reply,'bot');
    chatHistory.push({role:'assistant',content:reply});
  }catch(err){
    typingEl.remove();
    addMessage("I couldn't reach the assistant service just now — feel free to email aniruddharai39@gmail.com directly in the meantime.",'bot');
    console.error('Assistant error:',err);
  }
}

asstSend.addEventListener('click',()=>{
  const q=asstInput.value;
  asstInput.value='';
  sendToAssistant(q);
});
asstInput.addEventListener('keydown',(e)=>{
  if(e.key==='Enter'){
    const q=asstInput.value;
    asstInput.value='';
    sendToAssistant(q);
  }
});
asstChips.querySelectorAll('.asst-chip').forEach(chip=>{
  chip.addEventListener('click',()=>sendToAssistant(chip.dataset.q));
});