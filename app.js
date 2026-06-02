// ═══════════════════════════════════════════════════════════
//  LICITAQUIZ — app.js
//  Código 100% original — ILSP Soluções Ltda.
//  Substitua SUPABASE_URL e SUPABASE_KEY pelos seus valores
// ═══════════════════════════════════════════════════════════

const SUPABASE_URL = 'https://iauxfoegsxcvxjsmkiob.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhdXhmb2Vnc3hjdnhqc21raW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTc4NTQsImV4cCI6MjA5NDg5Mzg1NH0.c-vwWeTQL0goyMyySWPGrRL09-PUW-Xmny8B4A2Fkn8';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ═══════════════════════════════════════════════════════════
//  BANCO DE QUESTÕES LOCAL (30 questões)
// ═══════════════════════════════════════════════════════════
const BANCO = [
  {id:'b01',cat:'Modalidades',q:'Qual modalidade da Lei 14.133/2021 substitui a Tomada de Preços e a Concorrência da Lei 8.666/93?',opts:['Pregão','Concorrência','Diálogo Competitivo','Leilão'],c:1,ref:'Art. 28, I'},
  {id:'b02',cat:'Modalidades',q:'O Pregão na Lei 14.133/2021 se destina exclusivamente à aquisição de:',opts:['Obras de engenharia','Bens e serviços comuns','Serviços técnicos especializados','Alienação de bens imóveis'],c:1,ref:'Art. 28, II c/c Art. 6º, XLI'},
  {id:'b03',cat:'Modalidades',q:'O Diálogo Competitivo é cabível quando a Administração não consegue:',opts:['Obter propostas com preço inferior ao estimado','Definir o meio técnico adequado à satisfação da necessidade','Encontrar fornecedores habilitados','Superar o limite de dispensa'],c:1,ref:'Art. 32'},
  {id:'b04',cat:'Modalidades',q:'Qual modalidade é destinada à escolha de trabalho técnico, científico ou artístico com premiação?',opts:['Leilão','Concurso','Pregão','Concorrência'],c:1,ref:'Art. 30'},
  {id:'b05',cat:'Prazos',q:'Qual o prazo mínimo de publicação do edital de Pregão Eletrônico?',opts:['3 dias úteis','8 dias úteis','5 dias úteis','10 dias úteis'],c:1,ref:'Art. 55, II'},
  {id:'b06',cat:'Prazos',q:'O prazo máximo de vigência de contratos de serviços contínuos na Lei 14.133/2021 é:',opts:['60 meses','5 anos prorrogáveis até 10 anos','12 meses renováveis indefinidamente','Indeterminado'],c:1,ref:'Art. 106, §1º'},
  {id:'b07',cat:'Prazos',q:'A intenção de recurso no Pregão deve ser manifestada:',opts:['Em até 3 dias úteis após a sessão','Imediatamente após declaração do vencedor, com motivação','Em 5 dias corridos da adjudicação','A qualquer momento antes da homologação'],c:1,ref:'Art. 44, §1º'},
  {id:'b08',cat:'Contratos',q:'O limite geral para acréscimos ou supressões unilaterais em contratos é de:',opts:['10%','15%','25%','50%'],c:2,ref:'Art. 125, §1º'},
  {id:'b09',cat:'Contratos',q:'Em reformas de edifícios ou equipamentos, o limite de acréscimo por alteração unilateral é de:',opts:['25%','30%','40%','50%'],c:3,ref:'Art. 125, §2º'},
  {id:'b10',cat:'Contratos',q:'A garantia contratual ordinária na Lei 14.133/2021 pode ser de até:',opts:['3% do valor','5% do valor','10% do valor','15% do valor'],c:1,ref:'Art. 96, §1º'},
  {id:'b11',cat:'Dispensa',q:'Qual é o limite de dispensa de licitação para obras de baixa complexidade?',opts:['R$ 50.000','R$ 100.000','R$ 200.000','R$ 500.000'],c:1,ref:'Art. 75, I'},
  {id:'b12',cat:'Dispensa',q:'O limite de dispensa para compras e serviços comuns é de:',opts:['R$ 50.000','R$ 100.000','R$ 150.000','R$ 200.000'],c:1,ref:'Art. 75, II'},
  {id:'b13',cat:'Dispensa',q:'A inexigibilidade de licitação ocorre quando há:',opts:['Urgência de contratação','Inviabilidade de competição','Valor inferior ao limite legal','Fornecedor único no Brasil'],c:1,ref:'Art. 74'},
  {id:'b14',cat:'Habilitação',q:'No Pregão Eletrônico, a habilitação é verificada:',opts:['Antes da fase de lances','Após a fase de lances, apenas do provável vencedor','Para todos simultaneamente','Somente após a adjudicação'],c:1,ref:'Art. 17, §1º'},
  {id:'b15',cat:'Habilitação',q:'A qualificação técnico-operacional exige comprovação de experiência prévia de, no mínimo:',opts:['25% do objeto','50% do objeto','75% do objeto','100% do objeto'],c:1,ref:'Art. 67, II'},
  {id:'b16',cat:'Princípios',q:'O princípio da segregação de funções determina que:',opts:['Áreas distintas façam licitações separadas','A mesma pessoa não realize e verifique sua própria tarefa','O pregoeiro não seja fiscal','O ordenador não assine contratos'],c:1,ref:'Art. 7º'},
  {id:'b17',cat:'Princípios',q:'Qual princípio impõe que os atos administrativos licitatórios sejam sempre fundamentados?',opts:['Publicidade','Eficiência','Motivação','Impessoalidade'],c:2,ref:'Art. 5º'},
  {id:'b18',cat:'Princípios',q:'O desenvolvimento nacional sustentável na NLLC abrange:',opts:['Apenas aspectos ambientais','Aspectos econômicos, sociais e ambientais','Preferência a fornecedores nacionais','Contratações somente no âmbito local'],c:1,ref:'Art. 11, IV'},
  {id:'b19',cat:'Penalidades',q:'A sanção de impedimento de licitar e contratar tem duração máxima de:',opts:['1 ano','2 anos','3 anos','5 anos'],c:2,ref:'Art. 156, III'},
  {id:'b20',cat:'Penalidades',q:'A declaração de inidoneidade impede a empresa de licitar por:',opts:['1 a 3 anos','3 a 6 anos','5 a 10 anos','Prazo indeterminado'],c:1,ref:'Art. 156, IV'},
  {id:'b21',cat:'Penalidades',q:'A multa por inexecução total do contrato pode chegar a:',opts:['5%','10%','20%','30%'],c:3,ref:'Art. 162'},
  {id:'b22',cat:'ME/EPP',q:'O empate ficto para ME/EPP permite preferência quando a diferença de preço é de até:',opts:['3%','5%','8%','10%'],c:1,ref:'LC 123/2006, Art. 44'},
  {id:'b23',cat:'ME/EPP',q:'A cota reservada para ME/EPP em bens divisíveis pode ser de até:',opts:['10%','15%','25%','30%'],c:2,ref:'LC 123/2006, Art. 48, III'},
  {id:'b24',cat:'Agentes',q:'O agente de contratação na NLLC substituiu qual figura da Lei 8.666/93?',opts:['Fiscal do contrato','Pregoeiro e comissão permanente de licitação','Gestor de contratos','Autoridade competente'],c:1,ref:'Art. 8º'},
  {id:'b25',cat:'Planejamento',q:'O Estudo Técnico Preliminar (ETP) antecede obrigatoriamente:',opts:['A publicação do edital','A elaboração do Termo de Referência','A designação do agente de contratação','A fase de habilitação'],c:1,ref:'Art. 18, I'},
  {id:'b26',cat:'Planejamento',q:'O Plano de Contratações Anual (PCA) deve ser elaborado com antecedência de:',opts:['30 dias','60 dias','90 dias','180 dias'],c:1,ref:'Decreto 10.947/2022'},
  {id:'b27',cat:'Execução',q:'O fiscal do contrato é responsável por:',opts:['Assinar o contrato','Acompanhar e fiscalizar a execução','Elaborar o edital','Conduzir a habilitação'],c:1,ref:'Art. 117'},
  {id:'b28',cat:'Execução',q:'A presunção de inexequibilidade em obras e serviços de engenharia ocorre abaixo de:',opts:['60% do orçamento','70% do orçamento','75% do orçamento','80% do orçamento'],c:2,ref:'Art. 59, §4º'},
  {id:'b29',cat:'Execução',q:'O recebimento definitivo de obras deve ocorrer em até quanto tempo após o provisório?',opts:['15 dias','30 dias','60 dias','90 dias'],c:3,ref:'Art. 140, II, a'},
  {id:'b30',cat:'Contratos',q:'O reequilíbrio econômico-financeiro é cabível quando ocorrem:',opts:['Aumentos de preço superiores a 5%','Fatos imprevisíveis que alteram a equação econômica original','Variação cambial favorável ao contratado','Decisão da contratada de majorar lucro'],c:1,ref:'Art. 124, II, d'},
];

const AVATARES = ['👨‍⚖️','👩‍⚖️','📚','⚖️','🏛️','📋','🔍','💼','🎓','📜','🖊️','🏅'];
const ANS_COLS = [
  {bg:'var(--c-ans-a)', l:'A'},
  {bg:'var(--c-ans-b)', l:'B'},
  {bg:'var(--c-ans-c)', l:'C'},
  {bg:'var(--c-ans-d)', l:'D'},
];

// ═══════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════
const APP = {
  user: null, profile: null,
  quizzes: [],
  // edit
  editQuiz: null, editQIdx: 0,
  // host
  gameSession: null, gameQuiz: null, gameQIdx: 0,
  gamePlayers: [], gameResponses: [],
  gameTimer: null, gameTimeLeft: 0,
  realtimeSub: null, lastReport: null,
  // player
  playerInfo: null, playerScore: 0, playerResponses: [],
  playerTimer: null, playerAnswered: false,
  // study
  studyCats: [], studyQs: [], studyQIdx: 0,
  studyScore: 0, studyCorrect: 0,
  studyTimer: null, studyAnswered: false,
  // banco
  bancoFilter: 'Todos',
  selAvatar: null,
};

// ═══════════════════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════════════════
function $(id) { return document.getElementById(id); }

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = $('screen-' + id);
  if (el) el.classList.add('active');
  const navMap = {
    'dash':'dash','edit':'dash','lobby':'dash','host-q':'dash',
    'host-res':'dash','podium':'dash','relatorio':'dash',
    'join':'aluno','nick':'aluno','wait':'aluno',
    'player-q':'aluno','feedback':'aluno','pplayer':'aluno',
    'study':'estudo','study-q':'estudo','study-final':'estudo',
    'banco':'banco',
  };
  document.querySelectorAll('.hdr-nav-btn').forEach(b => b.classList.remove('on'));
  const navId = navMap[id];
  if (navId) { const nb = $('nav-' + navId); if (nb) nb.classList.add('on'); }
  if (id === 'dash') loadDash();
  if (id === 'banco') renderBanco();
}

function toast(msg, isErr) {
  const t = $('toast');
  t.textContent = msg;
  t.className = isErr ? 'err show' : 'show';
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 3200);
}

function loader(show, msg = 'Processando...') {
  $('loader-msg').textContent = msg;
  $('loader').classList.toggle('show', show);
}

function pin6() { return String(Math.floor(100000 + Math.random() * 900000)); }

function goHome() { showScreen('home'); }

async function goHost() {
  if (!APP.user) {
    const { data: { session } } = await sb.auth.getSession();
    if (session) await onSignedIn(session.user);
    else { showScreen('login'); return; }
  }
  showScreen('dash');
}

function togglePass(id, btn) {
  const inp = document.getElementById(id);
  if (inp.type === 'password') { inp.type = 'text'; btn.textContent = '🙈'; }
  else { inp.type = 'password'; btn.textContent = '👁️'; }
}

function goStudy() {
  renderStudyCats();
  showScreen('study');
}

// ═══════════════════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════════════════
async function initAuth() {
  const { data: { session } } = await sb.auth.getSession();
  if (session) await onSignedIn(session.user);
  sb.auth.onAuthStateChange(async (ev, sess) => {
    if (sess) await onSignedIn(sess.user);
    else { APP.user = null; APP.profile = null; updateHeader(); }
  });
}

async function onSignedIn(user) {
  APP.user = user;
  const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
  APP.profile = data;
  updateHeader();
}

function updateHeader() {
  const u = APP.user;
  const n = APP.profile?.full_name || u?.email?.split('@')[0] || '';
  $('hdr-user-name').textContent = u ? n : '';
  $('hdr-avatar-btn').textContent = u ? (n[0] || '?').toUpperCase() : '👤';
}

function handleAvatarClick() {
  if (APP.user) doLogout();
  else showScreen('login');
}

async function doLogin() {
  const email = $('login-email').value.trim();
  const pass = $('login-pass').value;
  if (!email || !pass) { toast('Preencha e-mail e senha', true); return; }
  loader(true, 'Entrando...');
  const { error } = await sb.auth.signInWithPassword({ email, password: pass });
  loader(false);
  if (error) { toast('E-mail ou senha incorretos', true); return; }
  showScreen('dash');
}

async function doSignup() {
  const name  = $('su-name').value.trim();
  const email = $('su-email').value.trim();
  const pass  = $('su-pass').value;
  const org   = $('su-org').value.trim();
  const oab   = $('su-oab').value.trim();
  if (!name || !email || !pass) { toast('Preencha nome, e-mail e senha', true); return; }
  if (pass.length < 6) { toast('Senha mínima: 6 caracteres', true); return; }
  loader(true, 'Criando conta...');
  const { data, error } = await sb.auth.signUp({ email, password: pass });
  if (error) { loader(false); toast(error.message, true); return; }
  await sb.from('profiles').insert({ id: data.user.id, full_name: name, email, organization: org, oab });
  loader(false);
  toast('Conta criada! Verifique seu e-mail para confirmar.');
  showScreen('login');
}

async function doLogout() {
  await sb.auth.signOut();
  APP.user = null; APP.profile = null;
  updateHeader();
  goHome();
}

// ═══════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════
async function loadDash() {
  if (!APP.user) {
    const { data: { session } } = await sb.auth.getSession();
    if (session) await onSignedIn(session.user);
    else { showScreen('login'); return; }
  }
  const { data } = await sb.from('quizzes')
    .select('*').eq('owner_id', APP.user.id).order('created_at', { ascending: false });
  APP.quizzes = data || [];
  renderQuizGrid();
}

function renderQuizGrid() {
  const g = $('quiz-grid');
  if (!g) return;
  if (!APP.quizzes.length) {
    g.innerHTML = '<div style="color:var(--c-muted);text-align:center;padding:40px;grid-column:1/-1;font-size:14px;">Nenhum quiz ainda. Crie o primeiro! 👆</div>';
    return;
  }
  g.innerHTML = APP.quizzes.map(q => `
    <div class="qcard">
      <div class="qcard-thumb" style="background:${q.color || '#0F2040'}">
        <span>${q.icon || '📋'}</span>
        <span class="qcard-cnt" id="qcnt-${q.id}">…</span>
      </div>
      <div class="qcard-body">
        <div class="qcard-title">${q.title}</div>
        <div class="qcard-desc">${q.description || 'Sem descrição'}</div>
        <div class="qcard-btns">
          <button class="btn btn-gold btn-sm" onclick="hostGame('${q.id}')">▶ Jogar</button>
          <button class="btn btn-ghost btn-sm" onclick="editQuiz('${q.id}')">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="deleteQuiz('${q.id}')">🗑️</button>
        </div>
      </div>
    </div>`).join('');
  APP.quizzes.forEach(async q => {
    const { count } = await sb.from('questions').select('*', { count: 'exact', head: true }).eq('quiz_id', q.id);
    const el = $('qcnt-' + q.id);
    if (el) el.textContent = (count || 0) + 'Q';
  });
}

async function createQuiz() {
  if (!APP.user) {
    const { data: { session } } = await sb.auth.getSession();
    if (session) await onSignedIn(session.user);
    else { toast('Faça login primeiro', true); return; }
  }
  const { data, error } = await sb.from('quizzes').insert({
    owner_id: APP.user.id, title: 'Novo Quiz — Lei 14.133/2021',
    description: '', icon: '📋', color: '#0F2040',
  }).select().single();
  if (error) { toast('Erro ao criar', true); return; }
  APP.quizzes.unshift(data);
  await editQuiz(data.id);
}

async function deleteQuiz(id) {
  if (!confirm('Excluir este quiz permanentemente?')) return;
  await sb.from('quizzes').delete().eq('id', id);
  APP.quizzes = APP.quizzes.filter(q => q.id !== id);
  renderQuizGrid();
  toast('Quiz excluído.');
}

// ═══════════════════════════════════════════════════════════
//  EDIT QUIZ
// ═══════════════════════════════════════════════════════════
async function editQuiz(id) {
  loader(true, 'Carregando quiz...');
  const { data: quiz } = await sb.from('quizzes').select('*').eq('id', id).single();
  const { data: qs }   = await sb.from('questions').select('*').eq('quiz_id', id).order('sort_order');
  const questions = [];
  for (const q of (qs || [])) {
    const { data: opts } = await sb.from('answer_options').select('*').eq('question_id', q.id).order('sort_order');
    questions.push({ ...q, opts: opts || [] });
  }
  APP.editQuiz = { ...quiz, questions };
  APP.editQIdx = 0;
  $('edit-quiz-title').value = quiz.title;
  renderEditSidebar();
  if (questions.length > 0) renderEditMain(0);
  else $('edit-main').innerHTML = '<div style="flex:1;display:flex;align-items:center;justify-content:center;color:var(--c-muted);">Adicione uma pergunta para começar</div>';
  loader(false);
  showScreen('edit');
}

function renderEditSidebar() {
  const list = $('edit-qlist');
  if (!list) return;
  const qs = APP.editQuiz.questions || [];
  list.innerHTML = qs.map((q, i) => `
    <div class="edit-qitem ${i === APP.editQIdx ? 'active' : ''}" onclick="selectQ(${i})">
      <div class="edit-qitem-lbl">PERGUNTA ${i + 1}</div>
      <div class="edit-qitem-text">${q.text || '(sem texto)'}</div>
    </div>`).join('');
}

function selectQ(i) {
  syncCurrentQ();
  APP.editQIdx = i;
  renderEditSidebar();
  renderEditMain(i);
}

function syncCurrentQ() {
  const q = APP.editQuiz.questions[APP.editQIdx];
  if (!q) return;
  const ta = $('qedit-text'); if (ta) q.text = ta.value;
  const ts = $('qedit-time'); if (ts) q.time_limit = parseInt(ts.value) || 20;
  document.querySelectorAll('.opt-inp').forEach((el, j) => { if (q.opts[j]) q.opts[j].text = el.value; });
}

function renderEditMain(i) {
  const q = APP.editQuiz.questions[i];
  if (!q) return;
  // ensure 4 opts
  while (q.opts.length < 4) q.opts.push({ text: '', is_correct: false });
  $('edit-main').innerHTML = `
    <div>
      <div class="lbl">TEXTO DA PERGUNTA</div>
      <textarea class="inp" id="qedit-text" placeholder="Digite a pergunta sobre licitações...">${q.text || ''}</textarea>
    </div>
    <div>
      <div class="lbl">ALTERNATIVAS — marque a correta (✓)</div>
      <div class="opts-grid">
        ${q.opts.map((o, j) => `
          <div class="opt-row">
            <div class="opt-letter" style="background:${ANS_COLS[j].bg}">${ANS_COLS[j].l}</div>
            <input type="text" class="opt-inp" placeholder="Alternativa ${j + 1}" value="${o.text || ''}">
            <button class="opt-check ${o.is_correct ? 'on' : ''}" onclick="toggleCorrect(${j})" title="Marcar como correta">✓</button>
          </div>`).join('')}
      </div>
    </div>
    <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;">
      <div>
        <div class="lbl">TEMPO</div>
        <select class="inp" id="qedit-time" style="width:120px;">
          ${[10,15,20,30,45,60].map(t => `<option value="${t}" ${(q.time_limit||20)===t?'selected':''}>${t}s</option>`).join('')}
        </select>
      </div>
      <button class="btn btn-outline btn-sm" onclick="aiSuggestQ()" style="margin-bottom:2px;">✨ Sugerir com IA</button>
      <button class="btn btn-danger btn-sm" onclick="removeQ(${i})" style="margin-bottom:2px;">🗑️ Remover</button>
    </div>`;
}

function toggleCorrect(j) {
  const q = APP.editQuiz.questions[APP.editQIdx];
  q.opts.forEach((o, k) => o.is_correct = (k === j));
  document.querySelectorAll('.opt-check').forEach((b, k) => b.classList.toggle('on', k === j));
}

function addQuestion() {
  syncCurrentQ();
  APP.editQuiz.questions.push({
    id: null, text: '', time_limit: 20,
    sort_order: APP.editQuiz.questions.length,
    opts: [
      { text: '', is_correct: true },
      { text: '', is_correct: false },
      { text: '', is_correct: false },
      { text: '', is_correct: false },
    ],
  });
  APP.editQIdx = APP.editQuiz.questions.length - 1;
  renderEditSidebar();
  renderEditMain(APP.editQIdx);
}

function removeQ(i) {
  if (APP.editQuiz.questions.length <= 1) { toast('Mínimo 1 pergunta', true); return; }
  if (!confirm('Remover esta pergunta?')) return;
  APP.editQuiz.questions.splice(i, 1);
  APP.editQIdx = Math.max(0, i - 1);
  renderEditSidebar();
  renderEditMain(APP.editQIdx);
}

async function saveQuiz() {
  syncCurrentQ();
  const title = $('edit-quiz-title').value.trim();
  if (!title) { toast('Adicione um título', true); return false; }
  APP.editQuiz.title = title;
  loader(true, 'Salvando...');
  await sb.from('quizzes').update({
    title, description: APP.editQuiz.description || '',
    icon: APP.editQuiz.icon || '📋', color: APP.editQuiz.color || '#0F2040',
  }).eq('id', APP.editQuiz.id);

  for (let i = 0; i < APP.editQuiz.questions.length; i++) {
    const q = APP.editQuiz.questions[i];
    let qId = q.id;
    if (!qId) {
      const { data: nq } = await sb.from('questions').insert({
        quiz_id: APP.editQuiz.id, text: q.text, time_limit: q.time_limit || 20, sort_order: i,
      }).select().single();
      qId = nq.id; q.id = qId;
    } else {
      await sb.from('questions').update({ text: q.text, time_limit: q.time_limit || 20, sort_order: i }).eq('id', qId);
      await sb.from('answer_options').delete().eq('question_id', qId);
    }
    for (let j = 0; j < q.opts.length; j++) {
      await sb.from('answer_options').insert({
        question_id: qId, text: q.opts[j].text,
        is_correct: q.opts[j].is_correct, sort_order: j,
      });
    }
  }
  loader(false);
  toast('Quiz salvo!');
  return true;
}

async function saveAndBack() { if (await saveQuiz()) showScreen('dash'); }
async function saveAndPlay() { if (await saveQuiz()) hostGame(APP.editQuiz.id); }

// ═══════════════════════════════════════════════════════════
//  IA — EDITOR
// ═══════════════════════════════════════════════════════════
async function aiSuggestQ() {
  syncCurrentQ();
  const idx = APP.editQIdx;
  setAI('Gerando pergunta...', 'Consultando Lei 14.133/2021');
  showScreen('ai');
  try {
    const r = await callClaude(
      `Gere UMA pergunta técnica de múltipla escolha sobre licitações (Lei 14.133/2021). ` +
      `Responda APENAS com JSON sem markdown:\n` +
      `{"text":"PERGUNTA","time_limit":20,"opts":[{"text":"CORRETA","is_correct":true},{"text":"ERRADA","is_correct":false},{"text":"ERRADA","is_correct":false},{"text":"ERRADA","is_correct":false}]}\n` +
      `A alternativa correta pode estar em qualquer posição. Seja tecnicamente preciso.`
    );
    const p = JSON.parse(r.replace(/```json|```/g, '').trim());
    APP.editQuiz.questions[idx] = { ...APP.editQuiz.questions[idx], ...p };
    showScreen('edit'); renderEditSidebar(); renderEditMain(idx);
    toast('Pergunta gerada com sucesso!');
  } catch (e) { showScreen('edit'); toast('Erro ao gerar pergunta', true); }
}

async function doGenerateAIQs() {
  syncCurrentQ();
  setAI('Gerando 5 perguntas...', 'Aguarde...');
  showScreen('ai');
  try {
    const r = await callClaude(
      `Crie 5 perguntas técnicas de múltipla escolha sobre licitações (Lei 14.133/2021) para capacitação de agentes públicos. ` +
      `Responda APENAS com JSON sem markdown:\n` +
      `{"qs":[{"text":"PERGUNTA","time_limit":20,"opts":[{"text":"A","is_correct":true},{"text":"B","is_correct":false},{"text":"C","is_correct":false},{"text":"D","is_correct":false}]}]}\n` +
      `Varie os temas: modalidades, contratos, penalidades, habilitação, planejamento.`
    );
    const p = JSON.parse(r.replace(/```json|```/g, '').trim());
    const newQs = p.qs.map((q, i) => ({ id: null, sort_order: APP.editQuiz.questions.length + i, ...q }));
    APP.editQuiz.questions.push(...newQs);
    showScreen('edit'); renderEditSidebar(); renderEditMain(APP.editQIdx);
    toast(`${newQs.length} perguntas adicionadas!`);
  } catch (e) { showScreen('edit'); toast('Erro ao gerar perguntas', true); }
}

async function doGenerateAIQuiz() {
  if (!APP.user) {
    const { data: { session } } = await sb.auth.getSession();
    if (session) await onSignedIn(session.user);
    else { toast('Faça login primeiro', true); return; }
  }
  setAI('Gerando quiz completo...', 'Criando questões técnicas com IA');
  showScreen('ai');
  try {
    const r = await callClaude(
      `Crie um quiz de 6 perguntas sobre licitações (Lei 14.133/2021) para capacitação de agentes públicos. ` +
      `Responda APENAS com JSON sem markdown:\n` +
      `{"title":"TÍTULO DO QUIZ","description":"DESCRIÇÃO CURTA","icon":"EMOJI","qs":[{"text":"PERGUNTA","time_limit":20,"opts":[{"text":"CORRETA","is_correct":true},{"text":"ERRADA","is_correct":false},{"text":"ERRADA","is_correct":false},{"text":"ERRADA","is_correct":false}]}]}\n` +
      `Seja técnico e preciso nas referências legais.`
    );
    const p = JSON.parse(r.replace(/```json|```/g, '').trim());
    const { data: nq } = await sb.from('quizzes').insert({
      owner_id: APP.user.id, title: p.title, description: p.description,
      icon: p.icon || '✨', color: '#0F2040',
    }).select().single();
    for (let i = 0; i < p.qs.length; i++) {
      const q = p.qs[i];
      const { data: nqq } = await sb.from('questions').insert({
        quiz_id: nq.id, text: q.text, time_limit: q.time_limit || 20, sort_order: i,
      }).select().single();
      for (let j = 0; j < q.opts.length; j++) {
        await sb.from('answer_options').insert({
          question_id: nqq.id, text: q.opts[j].text, is_correct: q.opts[j].is_correct, sort_order: j,
        });
      }
    }
    APP.quizzes.unshift(nq);
    showScreen('dash'); renderQuizGrid();
    toast('Quiz gerado pela IA! ✨');
  } catch (e) { showScreen('dash'); toast('Erro ao gerar quiz', true); }
}

// ═══════════════════════════════════════════════════════════
//  HOST GAME — Supabase Realtime
// ═══════════════════════════════════════════════════════════
async function hostGame(quizId) {
  if (!APP.user) {
    const { data: { session } } = await sb.auth.getSession();
    if (session) await onSignedIn(session.user);
    else { toast('Faça login primeiro', true); return; }
  }
  loader(true, 'Preparando sessão...');

  const { data: quiz } = await sb.from('quizzes').select('*').eq('id', quizId).single();
  const { data: qs }   = await sb.from('questions').select('*').eq('quiz_id', quizId).order('sort_order');
  const questions = [];
  for (const q of (qs || [])) {
    const { data: opts } = await sb.from('answer_options').select('*').eq('question_id', q.id).order('sort_order');
    questions.push({ ...q, opts: opts || [] });
  }
  if (!questions.length) { loader(false); toast('Adicione perguntas ao quiz antes de jogar', true); return; }

  const gamePin = pin6();
  const { data: session, error } = await sb.from('game_sessions').insert({
    quiz_id: quizId, host_id: APP.user.id, pin: gamePin,
    status: 'lobby', current_question_index: 0,
  }).select().single();
  if (error) { loader(false); toast('Erro ao criar sessão', true); return; }

  APP.gameSession = session;
  APP.gameQuiz = { ...quiz, questions };
  APP.gameQIdx = 0; APP.gamePlayers = []; APP.gameResponses = [];

  // Supabase Realtime — ouve novos jogadores e respostas
  if (APP.realtimeSub) sb.removeChannel(APP.realtimeSub);
  APP.realtimeSub = sb.channel('session:' + session.id)
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'participants',
      filter: 'session_id=eq.' + session.id,
    }, payload => {
      APP.gamePlayers.push(payload.new);
      renderLobbyPlayers();
    })
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'responses',
      filter: 'session_id=eq.' + session.id,
    }, payload => {
      APP.gameResponses.push(payload.new);
      updateRespCount();
      autoAdvance();
    })
    .subscribe();

  // Preenche tela do lobby
  const joinUrl = window.location.origin + window.location.pathname + '?pin=' + gamePin;
  $('lobby-pin').textContent = gamePin;
  $('lobby-hint-pin').textContent = gamePin;
  $('lobby-quiz-name').textContent = quiz.title;
  $('lobby-quiz-meta').textContent = questions.length + ' perguntas';
  $('lobby-qr').src = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(joinUrl)}`;
  $('lobby-chips').innerHTML = '<span style="color:var(--c-muted);font-size:13px;">Aguardando alunos...</span>';
  $('lobby-cnt-lbl').textContent = 'PARTICIPANTES — 0';
  loader(false);
  showScreen('lobby');
}

function renderLobbyPlayers() {
  const chips = $('lobby-chips'); if (!chips) return;
  if (!APP.gamePlayers.length) {
    chips.innerHTML = '<span style="color:var(--c-muted);font-size:13px;">Aguardando alunos...</span>';
  } else {
    chips.innerHTML = APP.gamePlayers.map(p =>
      `<div class="player-chip">${p.avatar || '🎓'} ${p.nickname}</div>`).join('');
  }
  $('lobby-cnt-lbl').textContent = 'PARTICIPANTES — ' + APP.gamePlayers.length;
}

function copyPin() { navigator.clipboard?.writeText(APP.gameSession?.pin || ''); toast('Código copiado!'); }

function sharePin() {
  const pin = APP.gameSession?.pin || '';
  const url = window.location.origin + window.location.pathname + '?pin=' + pin;
  const txt = `LicitaQuiz — Entre com o código ${pin} em: ${url}`;
  if (navigator.share) navigator.share({ title: 'LicitaQuiz', text: txt, url }).catch(() => {});
  else { navigator.clipboard?.writeText(txt); toast('Link copiado!'); }
}

async function cancelLobby() {
  if (APP.gameSession) await sb.from('game_sessions').update({ status: 'finished' }).eq('id', APP.gameSession.id);
  if (APP.realtimeSub) sb.removeChannel(APP.realtimeSub);
  APP.gameSession = null;
  showScreen('dash');
}

async function startGame() {
  if (!APP.gamePlayers.length) {
    if (!confirm('Nenhum aluno entrou ainda. Iniciar mesmo assim?')) return;
  }
  APP.gameQIdx = 0; APP.gameResponses = [];
  const now = Date.now();
  await sb.from('game_sessions').update({
    status: 'active', current_question_index: 0, question_started_at: now,
  }).eq('id', APP.gameSession.id);
  APP.gameSession.status = 'active';
  APP.gameSession.current_question_index = 0;
  APP.gameSession.question_started_at = now;
  showHostQuestion(0);
}

function showHostQuestion(idx) {
  APP.gameQIdx = idx; APP.gameResponses = [];
  const q = APP.gameQuiz.questions[idx];
  $('host-q-text').textContent = q.text;
  $('host-q-prog').textContent = `Pergunta ${idx + 1} de ${APP.gameQuiz.questions.length}`;
  $('host-q-bar').style.width = ((idx + 1) / APP.gameQuiz.questions.length * 100) + '%';
  $('host-resp-n').textContent = '0';
  $('host-ans-grid').innerHTML = q.opts.map((o, i) => `
    <div class="ans-btn ans-${'abcd'[i]}">
      <div class="ans-letter">${ANS_COLS[i].l}</div>
      <div class="ans-text">${o.text}</div>
    </div>`).join('');
  APP.gameTimeLeft = q.time_limit || 20;
  const orb = $('host-timer');
  orb.textContent = APP.gameTimeLeft; orb.classList.remove('danger');
  clearInterval(APP.gameTimer);
  APP.gameTimer = setInterval(() => {
    APP.gameTimeLeft--;
    orb.textContent = APP.gameTimeLeft;
    orb.classList.toggle('danger', APP.gameTimeLeft <= 5);
    if (APP.gameTimeLeft <= 0) { clearInterval(APP.gameTimer); showHostResults(); }
  }, 1000);
  showScreen('host-q');
}

function updateRespCount() {
  const el = $('host-resp-n'); if (el) el.textContent = APP.gameResponses.length;
}

function autoAdvance() {
  if (APP.gamePlayers.length > 0 && APP.gameResponses.length >= APP.gamePlayers.length) {
    clearInterval(APP.gameTimer); showHostResults();
  }
}

function forceResults() { clearInterval(APP.gameTimer); showHostResults(); }

async function showHostResults() {
  clearInterval(APP.gameTimer);
  await sb.from('game_sessions').update({ status: 'results' }).eq('id', APP.gameSession.id);
  const q = APP.gameQuiz.questions[APP.gameQIdx];
  $('res-q-text').textContent = q.text;
  $('res-count').textContent = APP.gameResponses.length + ' respostas recebidas';
  const counts = q.opts.map((_, i) =>
    APP.gameResponses.filter(r => r.answer_option_id === q.opts[i]?.id).length);
  const maxC = Math.max(...counts, 1);
  $('res-chart').innerHTML = q.opts.map((o, i) => `
    <div class="bar-col">
      <div class="bar-body" style="height:${Math.max(8, counts[i] / maxC * 86)}%;background:${o.is_correct ? 'var(--c-green2)' : ANS_COLS[i].bg}">${counts[i]}</div>
      <div class="bar-lbl">${ANS_COLS[i].l}</div>
    </div>`).join('');
  $('res-opts').innerHTML = q.opts.map((o, i) => `
    <div class="opt-rv ${o.is_correct ? 'ok' : 'no'}">
      <div class="opt-rv-ltr" style="background:${o.is_correct ? 'rgba(23,122,71,0.4)' : ANS_COLS[i].bg + '66'}">${ANS_COLS[i].l}</div>
      <div class="opt-rv-txt">${o.text}</div>
      ${o.is_correct ? '<div class="opt-rv-tag">✓ CORRETA</div>' : ''}
    </div>`).join('');
  const isLast = APP.gameQIdx >= APP.gameQuiz.questions.length - 1;
  $('next-q-btn').textContent = isLast ? '🏆 Ver Pódio' : 'Próxima →';
  showScreen('host-res');
}

async function nextQuestion() {
  if (APP.gameQIdx >= APP.gameQuiz.questions.length - 1) { showHostPodium(); return; }
  const nextIdx = APP.gameQIdx + 1;
  const now = Date.now();
  await sb.from('game_sessions').update({
    status: 'active', current_question_index: nextIdx, question_started_at: now,
  }).eq('id', APP.gameSession.id);
  APP.gameSession.current_question_index = nextIdx;
  APP.gameSession.question_started_at = now;
  showHostQuestion(nextIdx);
}

async function showHostPodium() {
  await sb.from('game_sessions').update({ status: 'finished' }).eq('id', APP.gameSession.id);
  if (APP.realtimeSub) sb.removeChannel(APP.realtimeSub);
  const { data: parts } = await sb.from('participants')
    .select('*').eq('session_id', APP.gameSession.id).order('total_score', { ascending: false });
  const sorted = parts || [];
  $('podium-quiz-name').textContent = APP.gameQuiz.title;
  const pc = ['r1','r2','r3']; const pp = ['p1','p2','p3'];
  $('rank-list').innerHTML = sorted.length
    ? sorted.map((p, i) => `
        <div class="rank-row ${pc[i] || ''}" style="animation-delay:${i * 60}ms">
          <div class="rank-pos ${pp[i] || ''}">${i + 1}º</div>
          <div class="rank-av">${p.avatar || '🎓'}</div>
          <div class="rank-name">${p.nickname}</div>
          <div class="rank-score">${p.total_score || 0} pts</div>
        </div>`).join('')
    : '<div style="color:var(--c-muted);text-align:center;padding:20px;">Nenhum participante nesta sessão.</div>';
  APP.lastReport = {
    quizTitle: APP.gameQuiz.title,
    date: new Date().toLocaleDateString('pt-BR'),
    totalQ: APP.gameQuiz.questions.length,
    players: sorted,
  };
  showScreen('podium');
}

function downloadCSV() {
  const rep = APP.lastReport;
  if (!rep) { toast('Jogue uma sessão primeiro', true); return; }
  const max = (rep.totalQ || 1) * 1000;
  let csv = `LicitaQuiz — Relatório\nQuiz:,${rep.quizTitle}\nData:,${rep.date}\nTotal Perguntas:,${rep.totalQ}\n\nPos,Participante,Pontuação,Acertos Est.,Percentual\n`;
  (rep.players || []).forEach((p, i) => {
    const pct = Math.round((p.total_score || 0) / max * 100);
    const ac  = Math.round(pct / 100 * (rep.totalQ || 1));
    csv += `${i + 1},"${p.nickname}",${p.total_score || 0},${ac},${pct}%\n`;
  });
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `LicitaQuiz_${rep.date.replace(/\//g,'-')}.csv`; a.click();
  URL.revokeObjectURL(url); toast('CSV baixado!');
}

function showRelatorio() {
  const rep = APP.lastReport;
  if (!rep) { toast('Jogue uma sessão primeiro para ver o relatório', true); return; }
  $('rel-info').textContent = `${rep.quizTitle} • ${rep.date} • ${rep.totalQ} perguntas`;
  const max = (rep.totalQ || 1) * 1000;
  const avg = rep.players.length
    ? Math.round(rep.players.reduce((s, p) => s + (p.total_score || 0), 0) / rep.players.length) : 0;
  $('rel-stats').innerHTML = `
    <div class="rel-stat"><div class="rel-stat-val">${rep.players.length}</div><div class="rel-stat-lbl">Participantes</div></div>
    <div class="rel-stat"><div class="rel-stat-val">${rep.totalQ}</div><div class="rel-stat-lbl">Perguntas</div></div>
    <div class="rel-stat"><div class="rel-stat-val">${rep.players[0]?.total_score || 0}</div><div class="rel-stat-lbl">Melhor placar</div></div>
    <div class="rel-stat"><div class="rel-stat-val">${avg}</div><div class="rel-stat-lbl">Média turma</div></div>`;
  $('rel-tbody').innerHTML = (rep.players || []).map((p, i) => {
    const pct = Math.round((p.total_score || 0) / max * 100);
    return `<tr>
      <td><strong>${i + 1}º</strong></td>
      <td>${p.avatar || '🎓'} ${p.nickname}</td>
      <td><strong style="color:var(--c-gold2);font-family:var(--f-mono);">${p.total_score || 0}</strong></td>
      <td>${Math.round(pct / 100 * (rep.totalQ || 1))}</td>
      <td style="min-width:80px;"><div class="score-bar-bg"><div class="score-bar" style="width:${pct}%"></div></div></td>
    </tr>`;
  }).join('');
  showScreen('relatorio');
}

// ═══════════════════════════════════════════════════════════
//  PLAYER FLOW — Supabase Realtime
// ═══════════════════════════════════════════════════════════
async function joinGame() {
  const pin = $('join-pin').value;
  if (pin.length < 6) { toast('Código deve ter 6 dígitos', true); return; }
  loader(true, 'Buscando sessão...');
  const { data: session } = await sb.from('game_sessions')
    .select('*').eq('pin', pin).eq('status', 'lobby').single();
  loader(false);
  if (!session) { toast('Código inválido ou sessão não está aberta', true); return; }
  APP.gameSession = session;
  renderAvatarGrid();
  showScreen('nick');
}

function renderAvatarGrid() {
  const g = $('av-grid'); if (!g) return;
  APP.selAvatar = null;
  g.innerHTML = AVATARES.map(a =>
    `<div class="av-btn" onclick="selAv(this,'${a}')">${a}</div>`).join('');
}

function selAv(el, av) {
  document.querySelectorAll('.av-btn').forEach(b => b.classList.remove('on'));
  el.classList.add('on');
  APP.selAvatar = av;
}

async function joinWithNick() {
  const name = $('nick-inp').value.trim();
  if (!name) { toast('Digite seu nome', true); return; }
  if (!APP.selAvatar) { toast('Escolha um avatar', true); return; }
  loader(true, 'Entrando na sessão...');
  const { data: part } = await sb.from('participants').insert({
    session_id: APP.gameSession.id, nickname: name, avatar: APP.selAvatar, total_score: 0,
  }).select().single();
  APP.playerInfo = { ...part };
  APP.playerScore = 0; APP.playerResponses = [];

  // Escuta mudanças na sessão
  if (APP.realtimeSub) sb.removeChannel(APP.realtimeSub);
  APP.realtimeSub = sb.channel('player:' + APP.gameSession.id)
    .on('postgres_changes', {
      event: 'UPDATE', schema: 'public', table: 'game_sessions',
      filter: 'id=eq.' + APP.gameSession.id,
    }, payload => handleSessionUpdate(payload.new))
    .subscribe();

  $('wait-profile').textContent = APP.selAvatar + ' ' + name;
  $('wait-pin').textContent = APP.gameSession.pin;
  loader(false);
  showScreen('wait');
  toast('Você entrou! Aguardando o instrutor iniciar...');
}

async function handleSessionUpdate(session) {
  const prev = APP.gameSession;
  APP.gameSession = session;
  if (session.status === 'active') {
    const idxChanged = prev.current_question_index !== session.current_question_index;
    const wasLobby   = prev.status !== 'active';
    if (wasLobby || idxChanged) await loadAndShowPlayerQ(session);
  } else if (session.status === 'results') {
    showPlayerFeedback();
  } else if (session.status === 'finished') {
    await showPlayerPodium();
  }
}

async function loadAndShowPlayerQ(session) {
  const { data: qs } = await sb.from('questions')
    .select('*').eq('quiz_id', session.quiz_id).order('sort_order');
  const currQ = qs[session.current_question_index];
  const { data: opts } = await sb.from('answer_options')
    .select('*').eq('question_id', currQ.id).order('sort_order');
  const q = { ...currQ, opts: opts || [] };

  APP.playerAnswered = false;
  $('player-q-text').textContent = q.text;
  $('player-q-prog').textContent = 'Pergunta ' + (session.current_question_index + 1);
  $('player-q-bar').style.width = ((session.current_question_index + 1) / qs.length * 100) + '%';
  $('player-ans-grid').style.display = 'grid';
  $('player-sent').style.display = 'none';

  $('player-ans-grid').innerHTML = q.opts.map((o, i) => `
    <button class="player-ans ans-${'abcd'[i]}"
      onclick="playerAnswer('${o.id}',${o.is_correct},${session.question_started_at},'${q.id}',${q.time_limit || 20},${qs.length})">
      ${ANS_COLS[i].l}
    </button>`).join('');

  const tl = q.time_limit || 0;
  APP.gameTimeLeft = tl;
  clearInterval(APP.playerTimer);
  const orb = $('player-timer');
  orb.classList.remove('danger');
  if (tl > 0) {
    orb.textContent = tl;
    APP.playerTimer = setInterval(() => {
      APP.gameTimeLeft--;
      orb.textContent = APP.gameTimeLeft;
      orb.classList.toggle('danger', APP.gameTimeLeft <= 5);
      if (APP.gameTimeLeft <= 0) {
        clearInterval(APP.playerTimer);
        if (!APP.playerAnswered) playerAnswer(null, false, session.question_started_at, q.id, tl, qs.length);
      }
    }, 1000);
  } else { orb.textContent = '∞'; }
  showScreen('player-q');
}

async function playerAnswer(optId, isCorrect, startedAt, questionId, timeLimit, totalQs) {
  if (APP.playerAnswered) return;
  APP.playerAnswered = true;
  clearInterval(APP.playerTimer);

  const elapsed = Date.now() - startedAt;
  let pts = 0;
  if (isCorrect && optId) {
    const ratio = Math.min(elapsed / 1000 / timeLimit, 1);
    pts = Math.round((1 - ratio * 0.5) * 1000);
  }
  APP.playerScore += pts;
  APP.playerResponses.push({ questionId, optId, isCorrect, pts });

  if (optId) {
    await sb.from('responses').insert({
      session_id: APP.gameSession.id, participant_id: APP.playerInfo.id,
      question_id: questionId, answer_option_id: optId,
      is_correct: isCorrect, points_earned: pts, response_time_ms: elapsed,
    });
    await sb.from('participants')
      .update({ total_score: APP.playerScore }).eq('id', APP.playerInfo.id);
  }
  $('player-ans-grid').style.display = 'none';
  $('player-sent').style.display = 'flex';
}

function showPlayerFeedback() {
  const last = APP.playerResponses[APP.playerResponses.length - 1];
  if (!last) return;
  const ok = last.isCorrect;
  $('fb-ring').textContent = ok ? '✅' : '❌';
  $('fb-ring').style.background = ok ? 'rgba(23,122,71,0.2)' : 'rgba(176,48,32,0.2)';
  $('fb-title').textContent = ok ? 'Correto! 🎉' : 'Incorreto!';
  $('fb-sub').textContent = ok ? 'Excelente resposta!' : 'Continue estudando a Lei 14.133!';
  $('fb-pts').textContent = '+' + last.pts;
  $('fb-total').textContent = APP.playerScore;
  showScreen('feedback');
}

async function showPlayerPodium() {
  const { data: parts } = await sb.from('participants')
    .select('*').eq('session_id', APP.gameSession.id).order('total_score', { ascending: false });
  const rank = (parts || []).findIndex(p => p.id === APP.playerInfo.id) + 1;
  const icons = { 1: '🥇', 2: '🥈', 3: '🥉' };
  $('pp-icon').textContent = icons[rank] || '🎓';
  $('pp-msg').textContent = rank === 1 ? 'Você Venceu! 🏆' : rank <= 3 ? 'Você está no Pódio! 🎉' : 'Bom jogo! Continue praticando!';
  $('pp-rank').textContent = rank > 0 ? rank + 'º' : '—';
  $('pp-score').textContent = APP.playerScore;
  showScreen('pplayer');
}

// ═══════════════════════════════════════════════════════════
//  STUDY MODE
// ═══════════════════════════════════════════════════════════
const CAT_ICONS = {
  Modalidades:'📋', Prazos:'⏱️', Contratos:'📄', Dispensa:'✅',
  'Habilitação':'🔍', 'Princípios':'⚖️', Penalidades:'⚠️',
  'ME/EPP':'🏪', Agentes:'👤', Planejamento:'📊', Execução:'🔧',
};

function renderStudyCats() {
  const cats = [...new Set(BANCO.map(q => q.cat))];
  const g = $('study-cats'); if (!g) return;
  g.innerHTML = cats.map(cat => {
    const n = BANCO.filter(q => q.cat === cat).length;
    const on = APP.studyCats.includes(cat);
    return `<div class="cat-card ${on ? 'on' : ''}" onclick="toggleCat('${cat}',this)">
      <div class="cat-icon">${CAT_ICONS[cat] || '📋'}</div>
      <div class="cat-name">${cat}</div>
      <div class="cat-count">${n} questões</div>
    </div>`;
  }).join('');
  $('study-start-btn').disabled = APP.studyCats.length === 0;
}

function toggleCat(cat, el) {
  const i = APP.studyCats.indexOf(cat);
  if (i >= 0) APP.studyCats.splice(i, 1); else APP.studyCats.push(cat);
  el.classList.toggle('on');
  $('study-start-btn').disabled = APP.studyCats.length === 0;
}

function startStudy() {
  const pool = BANCO.filter(q => APP.studyCats.includes(q.cat));
  const qty  = parseInt($('study-qty').value) || 10;
  APP.studyQs = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(qty, pool.length));
  APP.studyQIdx = 0; APP.studyScore = 0; APP.studyCorrect = 0;
  showStudyQ(0);
}

function showStudyQ(idx) {
  APP.studyQIdx = idx; APP.studyAnswered = false;
  const q = APP.studyQs[idx];
  $('study-q-text').textContent = q.q;
  $('study-prog-lbl').textContent = `Pergunta ${idx + 1} de ${APP.studyQs.length}`;
  $('study-prog-bar').style.width = ((idx + 1) / APP.studyQs.length * 100) + '%';
  $('study-score-n').textContent = APP.studyScore;
  $('study-expl').style.display = 'none';
  $('study-next-row').style.display = 'none';

  $('study-ans-grid').innerHTML = q.opts.map((o, i) => `
    <button class="ans-btn ans-${'abcd'[i]}" onclick="studyAnswer(${i})">
      <div class="ans-letter">${ANS_COLS[i].l}</div>
      <div class="ans-text">${o}</div>
    </button>`).join('');

  const tl = parseInt($('study-time').value) || 0;
  clearInterval(APP.studyTimer);
  const orb = $('study-timer'); orb.classList.remove('danger');
  if (tl > 0) {
    let t = tl; orb.textContent = t;
    APP.studyTimer = setInterval(() => {
      t--; orb.textContent = t; orb.classList.toggle('danger', t <= 5);
      if (t <= 0) { clearInterval(APP.studyTimer); if (!APP.studyAnswered) studyAnswer(-1); }
    }, 1000);
  } else { orb.textContent = '∞'; }
  showScreen('study-q');
}

async function studyAnswer(idx) {
  if (APP.studyAnswered) return;
  APP.studyAnswered = true;
  clearInterval(APP.studyTimer);
  const q = APP.studyQs[APP.studyQIdx];
  const ok = idx === q.c;
  if (ok) { APP.studyScore += 1000; APP.studyCorrect++; }
  $('study-score-n').textContent = APP.studyScore;

  document.querySelectorAll('#study-ans-grid .ans-btn').forEach((b, i) => {
    if (i === q.c) b.classList.add('revealed-correct');
    else if (i === idx && !ok) b.classList.add('revealed-wrong');
    b.onclick = null; b.style.cursor = 'default';
  });

  $('study-next-row').style.display = 'flex';
  $('study-expl').style.display = 'block';
  $('study-expl-text').textContent = 'Buscando explicação da IA...';

  try {
    const txt = await callClaude(
      `Explique em 2 a 3 frases diretas por que a resposta correta é "${q.opts[q.c]}" para a seguinte questão de licitações:\n\n${q.q}\n\nReferência legal: ${q.ref}. Seja didático, mencione o artigo e o motivo jurídico.`
    );
    $('study-expl-text').textContent = txt;
  } catch (e) {
    $('study-expl-text').textContent = `Resposta correta: ${q.opts[q.c]}. Referência: ${q.ref}.`;
  }
}

function nextStudyQ() {
  if (APP.studyQIdx >= APP.studyQs.length - 1) showStudyFinal();
  else showStudyQ(APP.studyQIdx + 1);
}

function showStudyFinal() {
  const pct = Math.round(APP.studyCorrect / APP.studyQs.length * 100);
  $('sf-icon').textContent = pct >= 80 ? '🏆' : pct >= 60 ? '📚' : '💪';
  $('sf-title').textContent = pct >= 80 ? 'Excelente domínio da Lei 14.133!' : pct >= 60 ? 'Bom resultado! Continue praticando!' : 'Não desista! A prática leva à perfeição.';
  $('sf-stats').innerHTML = `
    <div class="stat-box"><div class="stat-val">${APP.studyCorrect}</div><div class="stat-lbl">Acertos</div></div>
    <div class="stat-box"><div class="stat-val">${APP.studyQs.length - APP.studyCorrect}</div><div class="stat-lbl">Erros</div></div>
    <div class="stat-box"><div class="stat-val">${pct}%</div><div class="stat-lbl">Aproveit.</div></div>
    <div class="stat-box"><div class="stat-val">${APP.studyScore}</div><div class="stat-lbl">Pontos</div></div>`;
  showScreen('study-final');
}

// ═══════════════════════════════════════════════════════════
//  BANCO
// ═══════════════════════════════════════════════════════════
function renderBanco() {
  const cats = ['Todos', ...new Set(BANCO.map(q => q.cat))];
  $('banco-filters').innerHTML = cats.map(c =>
    `<div class="filter-pill ${APP.bancoFilter === c ? 'on' : ''}" onclick="setBancoFilter('${c}')">${c}</div>`
  ).join('');
  const items = APP.bancoFilter === 'Todos' ? BANCO : BANCO.filter(q => q.cat === APP.bancoFilter);
  $('banco-items').innerHTML = items.map(q => `
    <div class="banco-item">
      <div class="banco-item-q">${q.q}</div>
      <div class="banco-item-foot">
        <span class="badge badge-gold">${q.cat}</span>
        <span class="badge badge-teal">${q.ref}</span>
        <span style="margin-left:auto;font-size:10px;color:var(--c-muted);">${ANS_COLS[q.c].l}: ${q.opts[q.c]}</span>
      </div>
    </div>`).join('') || '<div style="color:var(--c-muted);text-align:center;padding:20px;">Nenhuma questão nesta categoria.</div>';
}

function setBancoFilter(cat) { APP.bancoFilter = cat; renderBanco(); }

async function doBancoAI() {
  setAI('Gerando novas questões...', 'Criando 5 questões técnicas para o banco');
  showScreen('ai');
  try {
    const r = await callClaude(
      `Gere 5 questões técnicas de múltipla escolha sobre licitações (Lei 14.133/2021). ` +
      `Responda APENAS com JSON sem markdown:\n` +
      `[{"cat":"CATEGORIA","q":"PERGUNTA","opts":["A","B","C","D"],"c":0,"ref":"Art. X"}]\n` +
      `Categorias válidas: Modalidades, Contratos, Penalidades, Habilitação, Planejamento. c = índice da resposta correta (0 a 3).`
    );
    const p = JSON.parse(r.replace(/```json|```/g, '').trim());
    p.forEach((q, i) => { q.id = 'ai_' + Date.now() + '_' + i; BANCO.push(q); });
    showScreen('banco'); renderBanco();
    toast(`${p.length} questões adicionadas ao banco!`);
  } catch (e) { showScreen('banco'); toast('Erro ao gerar questões', true); }
}

// ═══════════════════════════════════════════════════════════
//  CLAUDE API
// ═══════════════════════════════════════════════════════════
async function callClaude(prompt) {
  const r = await fetch('/.netlify/functions/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d.text;
}

function setAI(msg, sub) {
  $('ai-msg').textContent = msg;
  $('ai-sub').textContent = sub;
}

// ═══════════════════════════════════════════════════════════
//  AUTO-PIN FROM URL
// ═══════════════════════════════════════════════════════════
function checkUrlPin() {
  const p = new URLSearchParams(window.location.search).get('pin');
  if (p && p.length === 6) {
    $('join-pin').value = p;
    showScreen('join');
    toast('PIN detectado: ' + p + ' — Confirme para entrar');
  }
}

// ═══════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════
// Aguarda auth completa antes de liberar a UI
initAuth().then(() => {
  checkUrlPin();
  // Se já está na tela dash sem user, redireciona
  const active = document.querySelector('.screen.active');
  if (active && active.id === 'screen-dash' && !APP.user) showScreen('home');
});
