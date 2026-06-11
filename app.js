// ═══════════════════════════════════════════════════════════
//  LICITAQUIZ — app.js (Sem login, localStorage + Firebase RT)
// ═══════════════════════════════════════════════════════════

const _c = JSON.parse(atob("eyJhcGlLZXkiOiAiQUl6YVN5Q3Y1dGhfZUJGandseVd5WS04Y0FQZm1mZWtxZVpSanpnIiwgImF1dGhEb21haW4iOiAibGljaXRhcXVpejIuZmlyZWJhc2VhcHAuY29tIiwgImRhdGFiYXNlVVJMIjogImh0dHBzOi8vbGljaXRhcXVpejItZGVmYXVsdC1ydGRiLmZpcmViYXNlaW8uY29tIiwgInByb2plY3RJZCI6ICJsaWNpdGFxdWl6MiIsICJzdG9yYWdlQnVja2V0IjogImxpY2l0YXF1aXoyLmZpcmViYXNlc3RvcmFnZS5hcHAiLCAibWVzc2FnaW5nU2VuZGVySWQiOiAiNzY5MTgyMDg4NzQyIiwgImFwcElkIjogIjE6NzY5MTgyMDg4NzQyOndlYjpmZDYwN2ViMzE2MTYzOGU2OWRiMGU3In0="));
firebase.initializeApp(_c);
const db = firebase.database();

// ═══════════════════════════════════════════════════════════
//  BANCO DE QUESTÕES
// ═══════════════════════════════════════════════════════════
const BANCO = [
  {id:'b01',cat:'Modalidades',q:'Qual modalidade da Lei 14.133/2021 substitui a Tomada de Preços e a Concorrência da Lei 8.666/93?',opts:['Pregão','Concorrência','Diálogo Competitivo','Leilão'],c:1,ref:'Art. 28, I'},
  {id:'b02',cat:'Modalidades',q:'O Pregão na Lei 14.133/2021 se destina exclusivamente à aquisição de:',opts:['Obras de engenharia','Bens e serviços comuns','Serviços técnicos especializados','Alienação de bens imóveis'],c:1,ref:'Art. 28, II'},
  {id:'b03',cat:'Modalidades',q:'O Diálogo Competitivo é cabível quando a Administração não consegue:',opts:['Obter propostas com preço inferior ao estimado','Definir o meio técnico adequado à satisfação da necessidade','Encontrar fornecedores habilitados','Superar o limite de dispensa'],c:1,ref:'Art. 32'},
  {id:'b04',cat:'Modalidades',q:'Qual modalidade é destinada à escolha de trabalho técnico, científico ou artístico com premiação?',opts:['Leilão','Concurso','Pregão','Concorrência'],c:1,ref:'Art. 30'},
  {id:'b05',cat:'Prazos',q:'Qual o prazo mínimo de publicação do edital de Pregão Eletrônico?',opts:['3 dias úteis','8 dias úteis','5 dias úteis','10 dias úteis'],c:1,ref:'Art. 55, II'},
  {id:'b06',cat:'Prazos',q:'O prazo máximo de vigência de contratos de serviços contínuos na Lei 14.133/2021 é:',opts:['60 meses','5 anos prorrogáveis até 10 anos','12 meses renováveis','Indeterminado'],c:1,ref:'Art. 106'},
  {id:'b07',cat:'Prazos',q:'A intenção de recurso no Pregão deve ser manifestada:',opts:['Em até 3 dias úteis após a sessão','Imediatamente após declaração do vencedor','Em 5 dias corridos da adjudicação','A qualquer momento antes da homologação'],c:1,ref:'Art. 44'},
  {id:'b08',cat:'Contratos',q:'O limite geral para acréscimos ou supressões unilaterais em contratos é de:',opts:['10%','15%','25%','50%'],c:2,ref:'Art. 125'},
  {id:'b09',cat:'Contratos',q:'Em reformas de edifícios ou equipamentos, o limite de acréscimo unilateral é de:',opts:['25%','30%','40%','50%'],c:3,ref:'Art. 125'},
  {id:'b10',cat:'Contratos',q:'A garantia contratual ordinária na Lei 14.133/2021 pode ser de até:',opts:['3% do valor','5% do valor','10% do valor','15% do valor'],c:1,ref:'Art. 96'},
  {id:'b11',cat:'Dispensa',q:'Qual é o limite de dispensa de licitação para obras de baixa complexidade?',opts:['R$ 50.000','R$ 100.000','R$ 200.000','R$ 500.000'],c:1,ref:'Art. 75, I'},
  {id:'b12',cat:'Dispensa',q:'O limite de dispensa para compras e serviços comuns é de:',opts:['R$ 50.000','R$ 100.000','R$ 150.000','R$ 200.000'],c:1,ref:'Art. 75, II'},
  {id:'b13',cat:'Dispensa',q:'A inexigibilidade de licitação ocorre quando há:',opts:['Urgência de contratação','Inviabilidade de competição','Valor inferior ao limite legal','Fornecedor único no Brasil'],c:1,ref:'Art. 74'},
  {id:'b14',cat:'Habilitação',q:'No Pregão Eletrônico, a habilitação é verificada:',opts:['Antes da fase de lances','Após a fase de lances, apenas do provável vencedor','Para todos simultaneamente','Somente após a adjudicação'],c:1,ref:'Art. 17'},
  {id:'b15',cat:'Habilitação',q:'A qualificação técnico-operacional exige comprovação de experiência de, no mínimo:',opts:['25% do objeto','50% do objeto','75% do objeto','100% do objeto'],c:1,ref:'Art. 67'},
  {id:'b16',cat:'Princípios',q:'O princípio da segregação de funções determina que:',opts:['Áreas distintas façam licitações separadas','A mesma pessoa não realize e verifique sua própria tarefa','O pregoeiro não seja fiscal','O ordenador não assine contratos'],c:1,ref:'Art. 7'},
  {id:'b17',cat:'Princípios',q:'Qual princípio impõe que os atos licitatórios sejam sempre fundamentados?',opts:['Publicidade','Eficiência','Motivação','Impessoalidade'],c:2,ref:'Art. 5'},
  {id:'b18',cat:'Princípios',q:'O desenvolvimento nacional sustentável na NLLC abrange:',opts:['Apenas aspectos ambientais','Aspectos econômicos, sociais e ambientais','Preferência a fornecedores nacionais','Contratações somente locais'],c:1,ref:'Art. 11'},
  {id:'b19',cat:'Penalidades',q:'A sanção de impedimento de licitar e contratar tem duração máxima de:',opts:['1 ano','2 anos','3 anos','5 anos'],c:2,ref:'Art. 156'},
  {id:'b20',cat:'Penalidades',q:'A declaração de inidoneidade impede a empresa de licitar por:',opts:['1 a 3 anos','3 a 6 anos','5 a 10 anos','Prazo indeterminado'],c:1,ref:'Art. 156'},
  {id:'b21',cat:'Penalidades',q:'A multa por inexecução total do contrato pode chegar a:',opts:['5%','10%','20%','30%'],c:3,ref:'Art. 162'},
  {id:'b22',cat:'ME/EPP',q:'O empate ficto para ME/EPP permite preferência quando a diferença é de até:',opts:['3%','5%','8%','10%'],c:1,ref:'LC 123/2006, Art. 44'},
  {id:'b23',cat:'ME/EPP',q:'A cota reservada para ME/EPP em bens divisíveis pode ser de até:',opts:['10%','15%','25%','30%'],c:2,ref:'LC 123/2006, Art. 48'},
  {id:'b24',cat:'Agentes',q:'O agente de contratação na NLLC substituiu qual figura da Lei 8.666/93?',opts:['Fiscal do contrato','Pregoeiro e comissão permanente','Gestor de contratos','Autoridade competente'],c:1,ref:'Art. 8'},
  {id:'b25',cat:'Planejamento',q:'O Estudo Técnico Preliminar (ETP) antecede obrigatoriamente:',opts:['A publicação do edital','A elaboração do Termo de Referência','A designação do agente','A fase de habilitação'],c:1,ref:'Art. 18'},
  {id:'b26',cat:'Planejamento',q:'O Plano de Contratações Anual (PCA) deve ser elaborado com antecedência de:',opts:['30 dias','60 dias','90 dias','180 dias'],c:1,ref:'Decreto 10.947/2022'},
  {id:'b27',cat:'Execução',q:'O fiscal do contrato é responsável por:',opts:['Assinar o contrato','Acompanhar e fiscalizar a execução','Elaborar o edital','Conduzir a habilitação'],c:1,ref:'Art. 117'},
  {id:'b28',cat:'Execução',q:'A presunção de inexequibilidade em obras de engenharia ocorre abaixo de:',opts:['60%','70%','75%','80%'],c:2,ref:'Art. 59'},
  {id:'b29',cat:'Execução',q:'O recebimento definitivo de obras deve ocorrer em até quanto tempo após o provisório?',opts:['15 dias','30 dias','60 dias','90 dias'],c:3,ref:'Art. 140'},
  {id:'b30',cat:'Contratos',q:'O reequilíbrio econômico-financeiro é cabível quando ocorrem:',opts:['Aumentos de preço superiores a 5%','Fatos imprevisíveis que alteram a equação econômica','Variação cambial favorável','Decisão de majorar lucro'],c:1,ref:'Art. 124'},
];

const AVATARES = ['👨‍⚖️','👩‍⚖️','📚','⚖️','🏛️','📋','🔍','💼','🎓','📜','🖊️','🏅'];
const ANS_COLS = [{bg:'var(--c-ans-a)',l:'A'},{bg:'var(--c-ans-b)',l:'B'},{bg:'var(--c-ans-c)',l:'C'},{bg:'var(--c-ans-d)',l:'D'}];
const CAT_ICONS = {Modalidades:'📋',Prazos:'⏱️',Contratos:'📄',Dispensa:'✅','Habilitação':'🔍','Princípios':'⚖️',Penalidades:'⚠️','ME/EPP':'🏪',Agentes:'👤',Planejamento:'📊',Execução:'🔧'};

// ═══════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════
const APP = {
  quizzes: [],
  editQuiz: null, editQIdx: 0,
  gamePin: null, gameQuiz: null, gameQIdx: 0,
  gamePlayers: {}, gameResponses: {},
  gameTimer: null, gameTimeLeft: 0,
  gameListeners: [], lastReport: null,
  playerInfo: null, playerScore: 0, playerResponses: [],
  playerTimer: null, playerAnswered: false,
  studyCats: [], studyQs: [], studyQIdx: 0,
  studyScore: 0, studyCorrect: 0,
  studyTimer: null, studyAnswered: false,
  bancoFilter: 'Todos', selAvatar: null,
};

// ═══════════════════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════════════════
const $ = id => document.getElementById(id);

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = $('screen-' + id); if (el) el.classList.add('active');
  const nav = {
    dash:'dash',edit:'dash',lobby:'dash','host-q':'dash','host-res':'dash',podium:'dash',relatorio:'dash',
    join:'aluno',nick:'aluno',wait:'aluno','player-q':'aluno',feedback:'aluno',pplayer:'aluno',
    study:'estudo','study-q':'estudo','study-final':'estudo',banco:'banco',home:'',
  };
  document.querySelectorAll('.hdr-nav-btn').forEach(b => b.classList.remove('on'));
  const nb = $('nav-' + nav[id]); if (nb) nb.classList.add('on');
  if (id === 'dash') loadDash();
  if (id === 'banco') renderBanco();
}

function toast(msg, isErr) {
  const t = $('toast'); t.textContent = msg;
  t.className = isErr ? 'err show' : 'show';
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 3200);
}

function loader(show, msg = 'Processando...') {
  $('loader-msg').textContent = msg;
  $('loader').classList.toggle('show', show);
}

function pin6() { return String(Math.floor(100000 + Math.random() * 900000)); }
function goHome() { showScreen('home'); }
function goHost() { showScreen('dash'); }
function goStudy() { renderStudyCats(); showScreen('study'); }
function togglePass(id, btn) { const i = document.getElementById(id); i.type = i.type === 'password' ? 'text' : 'password'; btn.textContent = i.type === 'password' ? '👁️' : '🙈'; }

// ═══════════════════════════════════════════════════════════
//  QUIZZES — localStorage
// ═══════════════════════════════════════════════════════════
function saveQuizzesToStorage() {
  localStorage.setItem('lq_quizzes', JSON.stringify(APP.quizzes));
}

function loadQuizzesFromStorage() {
  try {
    const data = localStorage.getItem('lq_quizzes');
    APP.quizzes = data ? JSON.parse(data) : [];
  } catch(e) { APP.quizzes = []; }
}

function loadDash() {
  loadQuizzesFromStorage();
  renderQuizGrid();
}

function renderQuizGrid() {
  const g = $('quiz-grid'); if (!g) return;
  if (!APP.quizzes.length) {
    g.innerHTML = '<div style="color:var(--c-muted);text-align:center;padding:40px;grid-column:1/-1;">Nenhum quiz ainda. Crie o primeiro! 👆</div>';
    return;
  }
  g.innerHTML = APP.quizzes.map(q => `
    <div class="qcard">
      <div class="qcard-thumb" style="background:${q.color || '#0F2040'}">
        <span>${q.icon || '📋'}</span>
        <span class="qcard-cnt">${(q.questions || []).length}Q</span>
      </div>
      <div class="qcard-body">
        <div class="qcard-title">${q.title}</div>
        <div class="qcard-desc">${q.description || 'Sem descrição'}</div>
        <div class="qcard-btns">
          <button class="btn btn-gold btn-sm" onclick="hostGame('${q.id}')">▶ Jogar</button>
          <button class="btn btn-ghost btn-sm" onclick="editQuizById('${q.id}')">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deleteQuiz('${q.id}')">🗑️</button>
        </div>
      </div>
    </div>`).join('');
}

function createQuiz() {
  const id = 'q_' + Date.now();
  const quiz = { id, title: 'Novo Quiz — Lei 14.133/2021', description: '', icon: '📋', color: '#0F2040', questions: [] };
  APP.quizzes.unshift(quiz);
  saveQuizzesToStorage();
  editQuizById(id);
}

function deleteQuiz(id) {
  if (!confirm('Excluir este quiz?')) return;
  APP.quizzes = APP.quizzes.filter(q => q.id !== id);
  saveQuizzesToStorage();
  renderQuizGrid();
  toast('Quiz excluído.');
}

function editQuizById(id) {
  const quiz = APP.quizzes.find(q => q.id === id);
  if (!quiz) return;
  APP.editQuiz = JSON.parse(JSON.stringify(quiz));
  APP.editQIdx = 0;
  $('edit-quiz-title').value = quiz.title;
  renderEditSidebar();
  if (quiz.questions.length) renderEditMain(0);
  else $('edit-main').innerHTML = '<div style="flex:1;display:flex;align-items:center;justify-content:center;color:var(--c-muted);">Adicione uma pergunta para começar</div>';
  showScreen('edit');
}

function renderEditSidebar() {
  const list = $('edit-qlist'); if (!list) return;
  list.innerHTML = (APP.editQuiz.questions || []).map((q, i) => `
    <div class="edit-qitem ${i === APP.editQIdx ? 'active' : ''}" onclick="selectQ(${i})">
      <div class="edit-qitem-lbl">PERGUNTA ${i + 1}</div>
      <div class="edit-qitem-text">${q.text || '(sem texto)'}</div>
    </div>`).join('');
}

function selectQ(i) { syncCurrentQ(); APP.editQIdx = i; renderEditSidebar(); renderEditMain(i); }

function syncCurrentQ() {
  const q = APP.editQuiz.questions[APP.editQIdx]; if (!q) return;
  const ta = $('qedit-text'); if (ta) q.text = ta.value;
  const ts = $('qedit-time'); if (ts) q.time_limit = parseInt(ts.value) || 20;
  document.querySelectorAll('.opt-inp').forEach((el, j) => { if (q.opts[j]) q.opts[j].text = el.value; });
}

function renderEditMain(i) {
  const q = APP.editQuiz.questions[i]; if (!q) return;
  while (q.opts.length < 4) q.opts.push({ text: '', is_correct: false });
  const timeOpts = [10,15,20,30,45,60].map(t => '<option value="'+t+'" '+((q.time_limit||20)===t?'selected':'')+'>'+t+'s</option>').join('');
  const optRows = q.opts.map((o, j) =>
    '<div class="opt-row">' +
    '<div class="opt-letter" style="background:'+ANS_COLS[j].bg+'">'+ANS_COLS[j].l+'</div>' +
    '<input type="text" class="opt-inp" placeholder="Alternativa '+(j+1)+'" value="'+(o.text||'')+'">' +
    '<button class="opt-check '+(o.is_correct?'on':'')+'" onclick="toggleCorrect('+j+')">✓</button>' +
    '</div>'
  ).join('');
  $('edit-main').innerHTML =
    '<div><div class="lbl">TEXTO DA PERGUNTA</div>' +
    '<textarea class="inp" id="qedit-text" placeholder="Digite a pergunta...">'+(q.text||'')+'</textarea></div>' +
    '<div><div class="lbl">ALTERNATIVAS — marque a correta (✓)</div>' +
    '<div class="opts-grid">'+optRows+'</div></div>' +
    '<div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;">' +
    '<div><div class="lbl">TEMPO</div>' +
    '<select class="inp" id="qedit-time" style="width:120px;">'+timeOpts+'</select></div>' +
    '<button class="btn btn-outline btn-sm" onclick="aiSuggestQ()">✨ Sugerir com IA</button>' +
    '<button class="btn btn-danger btn-sm" onclick="removeQ('+i+')">🗑️ Remover</button>' +
    '</div>';
}

function toggleCorrect(j) {
  const q = APP.editQuiz.questions[APP.editQIdx];
  q.opts.forEach((o, k) => o.is_correct = (k === j));
  document.querySelectorAll('.opt-check').forEach((b, k) => b.classList.toggle('on', k === j));
}

function addQuestion() {
  syncCurrentQ();
  APP.editQuiz.questions.push({ text: '', time_limit: 20, opts: [{text:'',is_correct:true},{text:'',is_correct:false},{text:'',is_correct:false},{text:'',is_correct:false}] });
  APP.editQIdx = APP.editQuiz.questions.length - 1;
  renderEditSidebar(); renderEditMain(APP.editQIdx);
}

function removeQ(i) {
  if (APP.editQuiz.questions.length <= 1) { toast('Mínimo 1 pergunta', true); return; }
  if (!confirm('Remover?')) return;
  APP.editQuiz.questions.splice(i, 1);
  APP.editQIdx = Math.max(0, i - 1);
  renderEditSidebar(); renderEditMain(APP.editQIdx);
}

function saveQuiz() {
  syncCurrentQ();
  const title = $('edit-quiz-title').value.trim();
  if (!title) { toast('Adicione um título', true); return false; }
  APP.editQuiz.title = title;
  const idx = APP.quizzes.findIndex(q => q.id === APP.editQuiz.id);
  if (idx >= 0) APP.quizzes[idx] = JSON.parse(JSON.stringify(APP.editQuiz));
  saveQuizzesToStorage();
  toast('Quiz salvo!');
  return true;
}

function saveAndBack() { if (saveQuiz()) showScreen('dash'); }
function saveAndPlay() { if (saveQuiz()) hostGame(APP.editQuiz.id); }

// ═══════════════════════════════════════════════════════════
//  IA
// ═══════════════════════════════════════════════════════════
async function callClaude(prompt) {
  const r = await fetch('/.netlify/functions/claude', {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({prompt}),
  });
  const d = await r.json(); if (d.error) throw new Error(d.error); return d.text;
}
function setAI(msg, sub) { $('ai-msg').textContent = msg; $('ai-sub').textContent = sub; }

async function aiSuggestQ() {
  syncCurrentQ(); const idx = APP.editQIdx;
  setAI('Gerando pergunta...', 'Consultando Lei 14.133/2021'); showScreen('ai');
  try {
    const r = await callClaude('Gere UMA pergunta de multipla escolha sobre licitacoes (Lei 14.133/2021). APENAS JSON sem markdown: {"text":"PERGUNTA","time_limit":20,"opts":[{"text":"CORRETA","is_correct":true},{"text":"ERRADA","is_correct":false},{"text":"ERRADA","is_correct":false},{"text":"ERRADA","is_correct":false}]}');
    const p = JSON.parse(r.replace(/```json|```/g,'').trim());
    APP.editQuiz.questions[idx] = {...APP.editQuiz.questions[idx], ...p};
    showScreen('edit'); renderEditSidebar(); renderEditMain(idx); toast('Pergunta gerada!');
  } catch(e) { showScreen('edit'); toast('Erro ao gerar', true); }
}

async function doGenerateAIQs() {
  syncCurrentQ(); setAI('Gerando 5 perguntas...','Aguarde...'); showScreen('ai');
  try {
    const r = await callClaude('Crie 5 perguntas de multipla escolha sobre licitacoes (Lei 14.133/2021). APENAS JSON: {"qs":[{"text":"PERGUNTA","time_limit":20,"opts":[{"text":"A","is_correct":true},{"text":"B","is_correct":false},{"text":"C","is_correct":false},{"text":"D","is_correct":false}]}]}');
    const p = JSON.parse(r.replace(/```json|```/g,'').trim());
    p.qs.forEach(q => APP.editQuiz.questions.push({...q}));
    showScreen('edit'); renderEditSidebar(); renderEditMain(APP.editQIdx);
    toast(p.qs.length + ' perguntas adicionadas!');
  } catch(e) { showScreen('edit'); toast('Erro ao gerar', true); }
}

async function doGenerateAIQuiz() {
  setAI('Gerando quiz completo...','Criando questões técnicas'); showScreen('ai');
  try {
    const r = await callClaude('Crie um quiz de 6 perguntas sobre licitacoes (Lei 14.133/2021). APENAS JSON: {"title":"TITULO","description":"DESCRICAO","icon":"EMOJI","qs":[{"text":"PERGUNTA","time_limit":20,"opts":[{"text":"CORRETA","is_correct":true},{"text":"ERRADA","is_correct":false},{"text":"ERRADA","is_correct":false},{"text":"ERRADA","is_correct":false}]}]}');
    const p = JSON.parse(r.replace(/```json|```/g,'').trim());
    const id = 'q_' + Date.now();
    const quiz = {id, title:p.title, description:p.description, icon:p.icon||'✨', color:'#0F2040', questions:p.qs.map(q=>({...q}))};
    APP.quizzes.unshift(quiz); saveQuizzesToStorage();
    showScreen('dash'); renderQuizGrid(); toast('Quiz gerado pela IA! ✨');
  } catch(e) { showScreen('dash'); toast('Erro ao gerar', true); }
}

// ═══════════════════════════════════════════════════════════
//  HOST GAME — Firebase Realtime
// ═══════════════════════════════════════════════════════════
function clearGameListeners() { APP.gameListeners.forEach(r => r.off()); APP.gameListeners = []; }

function hostGame(quizId) {
  const quiz = APP.quizzes.find(q => q.id === quizId);
  if (!quiz || !quiz.questions.length) { toast('Adicione perguntas antes de jogar', true); return; }
  const gamePin = pin6();
  db.ref('sessions/' + gamePin).set({
    quiz_id: quizId, pin: gamePin, status: 'lobby',
    current_question_index: 0, quiz_title: quiz.title,
    total_questions: quiz.questions.length,
  });
  APP.gamePin = gamePin; APP.gameQuiz = quiz;
  APP.gameQIdx = 0; APP.gamePlayers = {}; APP.gameResponses = {};
  clearGameListeners();
  const pRef = db.ref('sessions/' + gamePin + '/players');
  pRef.on('value', snap => { APP.gamePlayers = snap.val() || {}; renderLobbyPlayers(); });
  APP.gameListeners.push(pRef);
  const rRef = db.ref('sessions/' + gamePin + '/responses');
  rRef.on('value', snap => { APP.gameResponses = snap.val() || {}; updateRespCount(); autoAdvance(); });
  APP.gameListeners.push(rRef);
  const joinUrl = window.location.origin + window.location.pathname + '?pin=' + gamePin;
  $('lobby-pin').textContent = gamePin;
  $('lobby-hint-pin').textContent = gamePin;
  $('lobby-quiz-name').textContent = quiz.title;
  $('lobby-quiz-meta').textContent = quiz.questions.length + ' perguntas';
  $('lobby-qr').src = 'https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=' + encodeURIComponent(joinUrl);
  $('lobby-chips').innerHTML = '<span style="color:var(--c-muted);font-size:13px;">Aguardando alunos...</span>';
  $('lobby-cnt-lbl').textContent = 'PARTICIPANTES — 0';
  showScreen('lobby');
}

function renderLobbyPlayers() {
  const chips = $('lobby-chips'); if (!chips) return;
  const players = Object.values(APP.gamePlayers);
  chips.innerHTML = players.length
    ? players.map(p => '<div class="player-chip">' + (p.avatar||'🎓') + ' ' + p.nickname + '</div>').join('')
    : '<span style="color:var(--c-muted);font-size:13px;">Aguardando alunos...</span>';
  $('lobby-cnt-lbl').textContent = 'PARTICIPANTES — ' + players.length;
}

function copyPin() { navigator.clipboard && navigator.clipboard.writeText(APP.gamePin||''); toast('Código copiado!'); }
function sharePin() {
  const url = window.location.origin + window.location.pathname + '?pin=' + (APP.gamePin||'');
  if (navigator.share) navigator.share({title:'LicitaQuiz', text:'Entre com o código '+APP.gamePin, url}).catch(()=>{});
  else { navigator.clipboard && navigator.clipboard.writeText(url); toast('Link copiado!'); }
}

function cancelLobby() {
  clearGameListeners();
  if (APP.gamePin) db.ref('sessions/' + APP.gamePin).remove();
  APP.gamePin = null; showScreen('dash');
}

function startGame() {
  if (!Object.keys(APP.gamePlayers).length && !confirm('Nenhum aluno entrou. Iniciar mesmo assim?')) return;
  APP.gameQIdx = 0; APP.gameResponses = {};
  db.ref('sessions/' + APP.gamePin).update({status:'active', current_question_index:0, question_started_at:Date.now()});
  showHostQuestion(0);
}

function showHostQuestion(idx) {
  APP.gameQIdx = idx; APP.gameResponses = {};
  const q = APP.gameQuiz.questions[idx];
  $('host-q-text').textContent = q.text;
  $('host-q-prog').textContent = 'Pergunta ' + (idx+1) + ' de ' + APP.gameQuiz.questions.length;
  $('host-q-bar').style.width = ((idx+1)/APP.gameQuiz.questions.length*100) + '%';
  $('host-resp-n').textContent = '0';
  $('host-ans-grid').innerHTML = q.opts.map((o,i) =>
    '<div class="ans-btn ans-'+'abcd'[i]+'">' +
    '<div class="ans-letter">'+ANS_COLS[i].l+'</div>' +
    '<div class="ans-text">'+(o.text||o)+'</div></div>'
  ).join('');
  APP.gameTimeLeft = q.time_limit || 20;
  const orb = $('host-timer'); orb.textContent = APP.gameTimeLeft; orb.classList.remove('danger');
  clearInterval(APP.gameTimer);
  APP.gameTimer = setInterval(() => {
    APP.gameTimeLeft--;
    orb.textContent = APP.gameTimeLeft; orb.classList.toggle('danger', APP.gameTimeLeft <= 5);
    if (APP.gameTimeLeft <= 0) { clearInterval(APP.gameTimer); showHostResults(); }
  }, 1000);
  showScreen('host-q');
}

function updateRespCount() { const el = $('host-resp-n'); if (el) el.textContent = Object.keys(APP.gameResponses).length; }
function autoAdvance() {
  const np = Object.keys(APP.gamePlayers).length, nr = Object.keys(APP.gameResponses).length;
  if (np > 0 && nr >= np) { clearInterval(APP.gameTimer); showHostResults(); }
}
function forceResults() { clearInterval(APP.gameTimer); showHostResults(); }

function showHostResults() {
  clearInterval(APP.gameTimer);
  db.ref('sessions/' + APP.gamePin).update({status:'results'});
  const q = APP.gameQuiz.questions[APP.gameQIdx];
  $('res-q-text').textContent = q.text;
  const responses = Object.values(APP.gameResponses);
  $('res-count').textContent = responses.length + ' respostas recebidas';
  const correctIdx = q.opts.findIndex(o => o.is_correct);
  const counts = q.opts.map((_, i) => responses.filter(r => r.opt_index === i).length);
  const maxC = Math.max(...counts, 1);
  $('res-chart').innerHTML = q.opts.map((o, i) =>
    '<div class="bar-col">' +
    '<div class="bar-body" style="height:'+Math.max(8,counts[i]/maxC*86)+'%;background:'+(i===correctIdx?'var(--c-green2)':ANS_COLS[i].bg)+'">'+counts[i]+'</div>' +
    '<div class="bar-lbl">'+ANS_COLS[i].l+'</div></div>'
  ).join('');
  $('res-opts').innerHTML = q.opts.map((o, i) =>
    '<div class="opt-rv '+(o.is_correct?'ok':'no')+'">' +
    '<div class="opt-rv-ltr" style="background:'+(o.is_correct?'rgba(23,122,71,0.4)':ANS_COLS[i].bg+'66')+'">'+ANS_COLS[i].l+'</div>' +
    '<div class="opt-rv-txt">'+(o.text||o)+'</div>' +
    (o.is_correct?'<div class="opt-rv-tag">✓ CORRETA</div>':'') +
    '</div>'
  ).join('');
  $('next-q-btn').textContent = APP.gameQIdx >= APP.gameQuiz.questions.length - 1 ? '🏆 Ver Pódio' : 'Próxima →';
  showScreen('host-res');
}

function nextQuestion() {
  if (APP.gameQIdx >= APP.gameQuiz.questions.length - 1) { showHostPodium(); return; }
  const nextIdx = APP.gameQIdx + 1;
  db.ref('sessions/' + APP.gamePin).update({status:'active', current_question_index:nextIdx, question_started_at:Date.now()});
  showHostQuestion(nextIdx);
}

function showHostPodium() {
  clearGameListeners();
  db.ref('sessions/' + APP.gamePin).update({status:'finished'});
  db.ref('sessions/' + APP.gamePin + '/players').once('value', snap => {
    const players = snap.val() ? Object.values(snap.val()).sort((a,b)=>(b.score||0)-(a.score||0)) : [];
    $('podium-quiz-name').textContent = APP.gameQuiz.title;
    const pc=['r1','r2','r3'], pp=['p1','p2','p3'];
    $('rank-list').innerHTML = players.length
      ? players.map((p,i) =>
          '<div class="rank-row '+(pc[i]||'')+'" style="animation-delay:'+(i*60)+'ms">' +
          '<div class="rank-pos '+(pp[i]||'')+'">'+(i+1)+'º</div>' +
          '<div class="rank-av">'+(p.avatar||'🎓')+'</div>' +
          '<div class="rank-name">'+p.nickname+'</div>' +
          '<div class="rank-score">'+(p.score||0)+' pts</div></div>'
        ).join('')
      : '<div style="color:var(--c-muted);text-align:center;padding:20px;">Nenhum participante.</div>';
    APP.lastReport = {quizTitle:APP.gameQuiz.title, date:new Date().toLocaleDateString('pt-BR'), totalQ:APP.gameQuiz.questions.length, players};
    showScreen('podium');
  });
}

function downloadCSV() {
  const rep = APP.lastReport; if (!rep) { toast('Jogue uma sessão primeiro', true); return; }
  let csv = 'LicitaQuiz\nQuiz:,' + rep.quizTitle + '\nData:,' + rep.date + '\n\nPos,Participante,Pontuacao\n';
  rep.players.forEach((p,i) => { csv += (i+1) + ',"' + p.nickname + '",' + (p.score||0) + '\n'; });
  const blob = new Blob(['\ufeff'+csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='LicitaQuiz_'+rep.date.replace(/\//g,'-')+'.csv'; a.click();
  URL.revokeObjectURL(url); toast('CSV baixado!');
}

function showRelatorio() {
  const rep = APP.lastReport; if (!rep) { toast('Jogue uma sessão primeiro', true); return; }
  $('rel-info').textContent = rep.quizTitle + ' • ' + rep.date + ' • ' + rep.totalQ + ' perguntas';
  const max = (rep.totalQ||1)*1000;
  const avg = rep.players.length ? Math.round(rep.players.reduce((s,p)=>s+(p.score||0),0)/rep.players.length) : 0;
  $('rel-stats').innerHTML =
    '<div class="rel-stat"><div class="rel-stat-val">'+rep.players.length+'</div><div class="rel-stat-lbl">Participantes</div></div>' +
    '<div class="rel-stat"><div class="rel-stat-val">'+rep.totalQ+'</div><div class="rel-stat-lbl">Perguntas</div></div>' +
    '<div class="rel-stat"><div class="rel-stat-val">'+(rep.players[0]&&rep.players[0].score||0)+'</div><div class="rel-stat-lbl">Melhor placar</div></div>' +
    '<div class="rel-stat"><div class="rel-stat-val">'+avg+'</div><div class="rel-stat-lbl">Media turma</div></div>';
  $('rel-tbody').innerHTML = rep.players.map((p,i) => {
    const pct = Math.round((p.score||0)/max*100);
    return '<tr><td><strong>'+(i+1)+'°</strong></td><td>'+(p.avatar||'🎓')+' '+p.nickname+'</td>' +
      '<td><strong style="color:var(--c-gold2);font-family:var(--f-mono);">'+(p.score||0)+'</strong></td>' +
      '<td>'+Math.round(pct/100*(rep.totalQ||1))+'</td>' +
      '<td style="min-width:80px;"><div class="score-bar-bg"><div class="score-bar" style="width:'+pct+'%"></div></div></td></tr>';
  }).join('');
  showScreen('relatorio');
}

// ═══════════════════════════════════════════════════════════
//  PLAYER FLOW
// ═══════════════════════════════════════════════════════════
function joinGame() {
  const pin = $('join-pin').value;
  if (pin.length < 6) { toast('Código deve ter 6 dígitos', true); return; }
  loader(true, 'Buscando sessão...');
  db.ref('sessions/' + pin).once('value', snap => {
    loader(false);
    if (!snap.exists() || snap.val().status !== 'lobby') { toast('Código inválido ou sessão não está aberta', true); return; }
    APP.gamePin = pin;
    const s = snap.val();
    // Load quiz from session
    APP.gameQuiz = { title: s.quiz_title, questions: [] };
    renderAvatarGrid(); showScreen('nick');
  });
}

function renderAvatarGrid() {
  const g = $('av-grid'); if (!g) return;
  APP.selAvatar = null;
  g.innerHTML = AVATARES.map(a => '<div class="av-btn" onclick="selAv(this,\''+a+'\')">'+a+'</div>').join('');
}
function selAv(el, av) { document.querySelectorAll('.av-btn').forEach(b=>b.classList.remove('on')); el.classList.add('on'); APP.selAvatar = av; }

function joinWithNick() {
  const name = $('nick-inp').value.trim();
  if (!name) { toast('Digite seu nome', true); return; }
  if (!APP.selAvatar) { toast('Escolha um avatar', true); return; }
  loader(true, 'Entrando...');
  const playerId = 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2,5);
  APP.playerInfo = {id:playerId, nickname:name, avatar:APP.selAvatar};
  APP.playerScore = 0; APP.playerResponses = [];
  db.ref('sessions/'+APP.gamePin+'/players/'+playerId).set({nickname:name, avatar:APP.selAvatar, score:0, joined_at:Date.now()});
  clearGameListeners();
  let lastStatus = null, lastQIdx = null;
  const sRef = db.ref('sessions/' + APP.gamePin);
  sRef.on('value', snap => {
    if (!snap.exists()) return;
    const s = snap.val();
    if (s.status === 'active' && (lastStatus !== 'active' || lastQIdx !== s.current_question_index)) {
      lastStatus = 'active'; lastQIdx = s.current_question_index;
      loadPlayerQuestion(s);
    } else if (s.status === 'results' && lastStatus !== 'results') {
      lastStatus = 'results'; showPlayerFeedback();
    } else if (s.status === 'finished' && lastStatus !== 'finished') {
      lastStatus = 'finished'; showPlayerPodiumFinal();
    }
  });
  APP.gameListeners.push(sRef);
  $('wait-profile').textContent = APP.selAvatar + ' ' + name;
  $('wait-pin').textContent = APP.gamePin;
  loader(false); showScreen('wait'); toast('Você entrou! Aguardando o instrutor...');
}

function loadPlayerQuestion(session) {
  // Get quiz questions from the host's local storage via Firebase
  db.ref('sessions/'+APP.gamePin).once('value', snap => {
    const s = snap.val();
    const idx = s.current_question_index;
    // Get question from session data
    db.ref('sessions/'+APP.gamePin+'/questions/'+idx).once('value', qSnap => {
      if (!qSnap.exists()) {
        // Questions not in DB yet, show waiting
        showScreen('wait');
        return;
      }
      const q = qSnap.val();
      showPlayerQ(q, idx, s.question_started_at, s.total_questions||1);
    });
  });
}

function showPlayerQ(q, idx, startedAt, totalQs) {
  APP.playerAnswered = false;
  $('player-q-text').textContent = q.text;
  $('player-q-prog').textContent = 'Pergunta ' + (idx+1);
  $('player-q-bar').style.width = ((idx+1)/totalQs*100) + '%';
  $('player-ans-grid').style.display = 'grid'; $('player-sent').style.display = 'none';
  $('player-ans-grid').innerHTML = q.opts.map((o,i) =>
    '<button class="player-ans ans-'+'abcd'[i]+'" onclick="playerAnswer('+i+','+o.is_correct+','+startedAt+','+(q.time_limit||20)+')">'+ANS_COLS[i].l+'</button>'
  ).join('');
  const tl = q.time_limit || 20; APP.gameTimeLeft = tl;
  clearInterval(APP.playerTimer);
  const orb = $('player-timer'); orb.classList.remove('danger'); orb.textContent = tl;
  APP.playerTimer = setInterval(() => {
    APP.gameTimeLeft--; orb.textContent = APP.gameTimeLeft; orb.classList.toggle('danger', APP.gameTimeLeft<=5);
    if (APP.gameTimeLeft<=0) { clearInterval(APP.playerTimer); if (!APP.playerAnswered) playerAnswer(-1,false,startedAt,tl); }
  }, 1000);
  showScreen('player-q');
}

function playerAnswer(optIdx, isCorrect, startedAt, timeLimit) {
  if (APP.playerAnswered) return;
  APP.playerAnswered = true; clearInterval(APP.playerTimer);
  const elapsed = Date.now() - startedAt;
  let pts = 0;
  if (isCorrect && optIdx >= 0) { const ratio = Math.min(elapsed/1000/timeLimit,1); pts = Math.round((1-ratio*0.5)*1000); }
  APP.playerScore += pts;
  APP.playerResponses.push({optIdx, isCorrect, pts});
  if (optIdx >= 0) {
    db.ref('sessions/'+APP.gamePin+'/responses/'+APP.playerInfo.id).set({opt_index:optIdx, is_correct:isCorrect, points:pts, time_ms:elapsed});
    db.ref('sessions/'+APP.gamePin+'/players/'+APP.playerInfo.id).update({score:APP.playerScore});
  }
  $('player-ans-grid').style.display = 'none'; $('player-sent').style.display = 'flex';
}

function showPlayerFeedback() {
  const last = APP.playerResponses[APP.playerResponses.length-1]; if (!last) return;
  const ok = last.isCorrect;
  $('fb-ring').textContent = ok ? '✅' : '❌';
  $('fb-ring').style.background = ok ? 'rgba(23,122,71,0.2)' : 'rgba(176,48,32,0.2)';
  $('fb-title').textContent = ok ? 'Correto! 🎉' : 'Incorreto!';
  $('fb-sub').textContent = ok ? 'Excelente resposta!' : 'Continue estudando!';
  $('fb-pts').textContent = '+' + last.pts; $('fb-total').textContent = APP.playerScore;
  showScreen('feedback');
}

function showPlayerPodiumFinal() {
  clearGameListeners();
  db.ref('sessions/'+APP.gamePin+'/players').once('value', snap => {
    const players = snap.val() ? Object.values(snap.val()).sort((a,b)=>(b.score||0)-(a.score||0)) : [];
    const rank = players.findIndex(p=>p.nickname===APP.playerInfo.nickname)+1;
    const icons = {1:'🥇',2:'🥈',3:'🥉'};
    $('pp-icon').textContent = icons[rank]||'🎓';
    $('pp-msg').textContent = rank===1?'Você Venceu! 🏆':rank<=3?'Você está no Pódio! 🎉':'Bom jogo!';
    $('pp-rank').textContent = rank>0?rank+'º':'—'; $('pp-score').textContent = APP.playerScore;
    showScreen('pplayer');
  });
}

// ═══════════════════════════════════════════════════════════
//  STUDY MODE
// ═══════════════════════════════════════════════════════════
function renderStudyCats() {
  const cats = [...new Set(BANCO.map(q=>q.cat))];
  const g = $('study-cats'); if (!g) return;
  g.innerHTML = cats.map(cat => {
    const n = BANCO.filter(q=>q.cat===cat).length, on = APP.studyCats.includes(cat);
    return '<div class="cat-card '+(on?'on':'')+'" onclick="toggleCat(\''+cat+'\',this)">'+
      '<div class="cat-icon">'+(CAT_ICONS[cat]||'📋')+'</div>'+
      '<div class="cat-name">'+cat+'</div>'+
      '<div class="cat-count">'+n+' questões</div></div>';
  }).join('');
  $('study-start-btn').disabled = APP.studyCats.length === 0;
}

function toggleCat(cat, el) {
  const i = APP.studyCats.indexOf(cat);
  if (i>=0) APP.studyCats.splice(i,1); else APP.studyCats.push(cat);
  el.classList.toggle('on'); $('study-start-btn').disabled = APP.studyCats.length === 0;
}

function startStudy() {
  const pool = BANCO.filter(q=>APP.studyCats.includes(q.cat));
  const qty = parseInt($('study-qty').value)||10;
  APP.studyQs = [...pool].sort(()=>Math.random()-0.5).slice(0,Math.min(qty,pool.length));
  APP.studyQIdx=0; APP.studyScore=0; APP.studyCorrect=0; showStudyQ(0);
}

function showStudyQ(idx) {
  APP.studyQIdx=idx; APP.studyAnswered=false;
  const q = APP.studyQs[idx];
  $('study-q-text').textContent = q.q;
  $('study-prog-lbl').textContent = 'Pergunta '+(idx+1)+' de '+APP.studyQs.length;
  $('study-prog-bar').style.width = ((idx+1)/APP.studyQs.length*100)+'%';
  $('study-score-n').textContent = APP.studyScore;
  $('study-expl').style.display='none'; $('study-next-row').style.display='none';
  $('study-ans-grid').innerHTML = q.opts.map((o,i) =>
    '<button class="ans-btn ans-'+'abcd'[i]+'" onclick="studyAnswer('+i+')">' +
    '<div class="ans-letter">'+ANS_COLS[i].l+'</div><div class="ans-text">'+o+'</div></button>'
  ).join('');
  const tl = parseInt($('study-time').value)||0;
  clearInterval(APP.studyTimer);
  const orb = $('study-timer'); orb.classList.remove('danger');
  if (tl>0) {
    let t=tl; orb.textContent=t;
    APP.studyTimer=setInterval(()=>{t--;orb.textContent=t;orb.classList.toggle('danger',t<=5);if(t<=0){clearInterval(APP.studyTimer);if(!APP.studyAnswered)studyAnswer(-1);}},1000);
  } else orb.textContent='∞';
  showScreen('study-q');
}

async function studyAnswer(idx) {
  if (APP.studyAnswered) return;
  APP.studyAnswered=true; clearInterval(APP.studyTimer);
  const q=APP.studyQs[APP.studyQIdx], ok=idx===q.c;
  if (ok) { APP.studyScore+=1000; APP.studyCorrect++; }
  $('study-score-n').textContent=APP.studyScore;
  document.querySelectorAll('#study-ans-grid .ans-btn').forEach((b,i)=>{
    if(i===q.c)b.classList.add('revealed-correct');
    else if(i===idx&&!ok)b.classList.add('revealed-wrong');
    b.onclick=null; b.style.cursor='default';
  });
  $('study-next-row').style.display='flex'; $('study-expl').style.display='block';
  $('study-expl-text').textContent='Buscando explicação...';
  try {
    const txt=await callClaude('Explique em 2-3 frases por que "'+q.opts[q.c]+'" é a resposta correta para:\n'+q.q+'\nRef: '+q.ref);
    $('study-expl-text').textContent=txt;
  } catch(e){ $('study-expl-text').textContent='Resposta correta: '+q.opts[q.c]+'. Ref.: '+q.ref+'.'; }
}

function nextStudyQ() { if(APP.studyQIdx>=APP.studyQs.length-1)showStudyFinal();else showStudyQ(APP.studyQIdx+1); }

function showStudyFinal() {
  const pct=Math.round(APP.studyCorrect/APP.studyQs.length*100);
  $('sf-icon').textContent=pct>=80?'🏆':pct>=60?'📚':'💪';
  $('sf-title').textContent=pct>=80?'Excelente domínio!':pct>=60?'Bom resultado!':'Continue praticando!';
  $('sf-stats').innerHTML=
    '<div class="stat-box"><div class="stat-val">'+APP.studyCorrect+'</div><div class="stat-lbl">Acertos</div></div>'+
    '<div class="stat-box"><div class="stat-val">'+(APP.studyQs.length-APP.studyCorrect)+'</div><div class="stat-lbl">Erros</div></div>'+
    '<div class="stat-box"><div class="stat-val">'+pct+'%</div><div class="stat-lbl">Aproveit.</div></div>'+
    '<div class="stat-box"><div class="stat-val">'+APP.studyScore+'</div><div class="stat-lbl">Pontos</div></div>';
  showScreen('study-final');
}

// ═══════════════════════════════════════════════════════════
//  BANCO
// ═══════════════════════════════════════════════════════════
function renderBanco() {
  const cats=['Todos',...new Set(BANCO.map(q=>q.cat))];
  $('banco-filters').innerHTML=cats.map(c=>'<div class="filter-pill '+(APP.bancoFilter===c?'on':'')+'" onclick="setBancoFilter(\''+c+'\')">'+c+'</div>').join('');
  const items=APP.bancoFilter==='Todos'?BANCO:BANCO.filter(q=>q.cat===APP.bancoFilter);
  $('banco-items').innerHTML=items.map(q=>
    '<div class="banco-item"><div class="banco-item-q">'+q.q+'</div>'+
    '<div class="banco-item-foot">'+
    '<span class="badge badge-gold">'+q.cat+'</span>'+
    '<span class="badge badge-teal">'+q.ref+'</span>'+
    '<span style="margin-left:auto;font-size:10px;color:var(--c-muted);">'+ANS_COLS[q.c].l+': '+q.opts[q.c]+'</span>'+
    '</div></div>'
  ).join('');
}

function setBancoFilter(cat){APP.bancoFilter=cat;renderBanco();}

async function doBancoAI(){
  setAI('Gerando novas questões...','Criando 5 questões para o banco');showScreen('ai');
  try{
    const r=await callClaude('Gere 5 questoes de multipla escolha sobre licitacoes (Lei 14.133/2021). APENAS JSON: [{"cat":"CATEGORIA","q":"PERGUNTA","opts":["A","B","C","D"],"c":0,"ref":"Art. X"}] Categorias: Modalidades,Contratos,Penalidades,Habilitacao,Planejamento. c=indice da correta (0-3).');
    const p=JSON.parse(r.replace(/```json|```/g,'').trim());
    p.forEach((q,i)=>{q.id='ai_'+Date.now()+'_'+i;BANCO.push(q);});
    showScreen('banco');renderBanco();toast(p.length+' questões adicionadas!');
  }catch(e){showScreen('banco');toast('Erro ao gerar',true);}
}

// ═══════════════════════════════════════════════════════════
//  URL PIN
// ═══════════════════════════════════════════════════════════
function checkUrlPin() {
  const p=new URLSearchParams(window.location.search).get('pin');
  if(p&&p.length===6){$('join-pin').value=p;showScreen('join');toast('PIN: '+p+' — Confirme para entrar');}
}

checkUrlPin();
