// assets/js/bank-mentor.js 
(function(){ // run after DOM ready function init(){ if(document.getElementById('simple-bm-menu')) { console.log('[BankMentor] already added'); return; }

console.log('[BankMentor] initializing');

// Simple CSS
var css = `
#simple-bm-menu{position:fixed;left:16px;bottom:110px;z-index:2147483700;font-family:Arial,Helvetica,sans-serif;max-width:220px}
#simple-bm-menu button{display:block;width:100%;margin:6px 0;padding:8px;border-radius:8px;border:0;cursor:pointer}
#simple-bm-menu .opt{background:#fff;border:1px solid #e6e9f6;color:#111}
#simple-bm-menu .send{background:#667eea;color:#fff}
#simple-bm-menu .save{background:#00a86b;color:#fff}
.question-block{background:#fff;border-radius:8px;border:1px solid #eaeefb;padding:10px;margin:8px 0;max-width:520px;box-shadow:0 6px 14px rgba(102,126,234,0.04)}
.question-block h4{font-size:14px;margin:0 0 8px}
.question-block .options ul{padding-left:18px;margin:6px 0}
`;
var s = document.createElement('style'); s.id='simple-bm-style'; s.appendChild(document.createTextNode(css)); document.head.appendChild(s);

// Menu container
var menu = document.createElement('div'); menu.id='simple-bm-menu';
menu.innerHTML = '<button id="bm-toggle" class="send">☰ Bank Mentor</button><div id="bm-list" style="display:block"></div>';
document.body.appendChild(menu);

// Options list
var opts = [
  {label:'🧩 Reasoning', text:"Give me 5 reasoning questions (moderate)."},
  {label:'➗ Quantitative Aptitude', text:"Give me 5 quant questions (moderate)."},
  {label:'📝 English Language', text:"Give me 5 English questions (RC / error detection)."},
  {label:'🌐 General Awareness', text:"Give me 5 banking + current affairs MCQs."},
  {label:'💻 Computer Knowledge', text:"Give me 5 computer knowledge MCQs."},
  {label:'📚 Study Plan', text:"Create a personalized 60-day study plan for SBI Clerk Prelims."},
  {label:'🧪 Mock Test', text:"Start a sectional mock test: Reasoning, 15 questions, 12 minutes."},
  {label:'❓ Doubt Resolver', text:"I have a doubt: [paste your question here] — please explain step-by-step."}
];

var list = document.getElementById('bm-list');
opts.forEach(function(o){
  var b = document.createElement('button'); b.className='opt'; b.type='button'; b.dataset.txt=o.text; b.innerText=o.label;
  b.addEventListener('click', function(){
    // copy to clipboard
    try{ navigator.clipboard.writeText(this.dataset.txt); }catch(e){ console.warn('clipboard failed', e); }
    // open chat bubble if present
    var host = document.querySelector('[data-relevanceai-share-id]') || document.querySelector('.relevanceai-bubble, .relevanceai-chat-bubble, .relevanceai-widget');
    if(host) try{ host.click(); }catch(e){}
    alert('Preset message copied to clipboard. Paste into chat input and send.');
  });
  list.appendChild(b);
});

// Save as PDF: open printable window with accessible chat text
var saveBtn = document.createElement('button'); saveBtn.className='save'; saveBtn.innerText='💾 Save Chat as PDF';
saveBtn.addEventListener('click', function(){
  var selectors = ['[data-relevanceai-share-id] .message', '.relevanceai-widget .message', '.relevanceai-chat .message', '.message'];
  var texts = [];
  selectors.forEach(function(sel){
    document.querySelectorAll(sel).forEach(function(m){ var t = m.innerText || m.textContent || ''; if(t.trim()) texts.push(t.trim()); });
  });
  if(texts.length===0){
    var last = document.querySelector('.message:last-of-type');
    if(last) texts.push((last.innerText||last.textContent||'').trim());
  }
  var content = texts.join('\n\n----------------\n\n') || 'No chat text accessible. If the chat is inside a cross-origin iframe, automatic export is blocked. Open chat, select messages and print manually.';
  var w = window.open('', '_blank');
  if(!w){ alert('Pop-up blocked. Please allow pop-ups to save as PDF.'); return; }
  var html = '<html><head><title>Chat Export</title><meta name="viewport" content="width=device-width,initial-scale=1"/></head><body style="font-family:Arial,Helvetica,sans-serif;padding:16px"><pre style="white-space:pre-wrap;font-size:13px">'+
    content.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</pre><p><em>Use browser Print → Save as PDF</em></p></body></html>';
  w.document.open(); w.document.write(html); w.document.close();
});
list.appendChild(saveBtn);

console.log('[BankMentor] Simple menu added');
alert('Bank Mentor menu added (bottom-left). Click a subject to copy a preset message and open the chat. Use Save Chat as PDF to print.');
}

if(document.readyState === 'complete' || document.readyState === 'interactive') init(); else window.addEventListener('DOMContentLoaded', init); })();
