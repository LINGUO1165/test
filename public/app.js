const QUESTIONS = [
  {d:0,t:'别人说了让我不舒服的话，我常先回“没事”，之后再自己反复想。'},
  {d:0,t:'在工作群或同学群里有分歧时，我会先不回复，等气氛过去再说。'},
  {d:0,t:'对方问我“你怎么了”，我明明有意见，却会说“没什么”。'},
  {d:0,t:'我有时会故意晚点回消息，希望对方能自己意识到我不高兴。'},
  {d:0,t:'即使担心场面尴尬，我通常也能直接说“这件事我不太舒服”。',r:true},
  {d:0,t:'意见不同时，我会尽量把具体问题说出来，而不是只说“算了”。',r:true},
  {d:1,t:'对方消息只回“嗯”或“好”，我容易猜他是不是在敷衍我。'},
  {d:1,t:'别人临时取消约定时，我会先问清楚原因，再判断这件事代表什么。',r:true},
  {d:1,t:'朋友聚会没叫我时，我容易觉得自己被排除在外。'},
  {d:1,t:'对方没有按我期待的方式关心我，我会觉得“他根本不在乎”。'},
  {d:1,t:'我通常会区分“对方做了什么”和“我猜他为什么这么做”。',r:true},
  {d:1,t:'一次争执之后，我容易把之前的小事也串起来，觉得“果然一直都是这样”。'},
  {d:2,t:'和朋友出门时，如果大家一直不定时间、地点，我会忍不住替所有人安排好。'},
  {d:2,t:'集体活动临近时有人临时改计划，我会明显烦躁，觉得事情被搞乱了。'},
  {d:2,t:'别人按自己的方式做事，即使结果没问题，我也容易忍不住指出“应该怎么做”。'},
  {d:2,t:'做小组作业或团队任务时，我常觉得不如自己接过来，进度更稳。'},
  {d:2,t:'计划有变化时，我一般能和大家一起重新商量，不急着把原方案救回来。',r:true},
  {d:2,t:'我能接受别人用和我不同的方法完成同一件事。',r:true},
  {d:3,t:'别人临时找我帮忙，即使我已经很累，也常怕拒绝后关系变尴尬。'},
  {d:3,t:'聚餐或旅行安排里，我常接下订位、买票、对账这些没人主动做的事。'},
  {d:3,t:'我答应帮忙后又后悔，但通常不会及时说自己做不到。'},
  {d:3,t:'为了维持气氛，我会先说“都可以”，哪怕心里其实有明确偏好。'},
  {d:3,t:'我能在答应之前先看自己的时间和精力，而不是先担心别人失望。',r:true},
  {d:3,t:'别人把责任推给我时，我通常能说明哪些部分该由对方自己处理。',r:true}
];
const DIMENSIONS = [
  {name:'撤退避冲突',short:'冲突时先撤退'},
  {name:'脑补判案',short:'容易替人下结论'},
  {name:'控场改剧本',short:'想把事情控稳'},
  {name:'过度兜底',short:'习惯先接下责任'}
];
const SCALE = ['几乎从不','很少','有时','经常','几乎总是'];
const TYPES = {
  pair01:{title:'沉默的编剧',episode:'观众开始着急的集数：第 3 集',scene:'对方问“你怎么了”，你说“没事”；回家后已经在脑内写完三集连续剧。',analysis:'你可能很希望别人主动发现你的感受，但又不太愿意把需求直接说出来。沉默给了对方很少的线索，脑补却替对方补上了很多动机。你不是没话说，而是担心说出来显得计较、麻烦或不被理解。',insight:'“我感觉被忽略了”和“对方故意忽略我”是两种不同的信息。先说观察到的事和自己的感受，比先替对方定罪更容易把话题拉回现实。',share:'我是《沉默的编剧》：嘴上说没事，脑内已经播到大结局。'},
  pair02:{title:'不说但要按我想的演',episode:'观众开始着急的集数：第 4 集',scene:'你没有说计划哪里不满意，却开始默默改时间、改路线、改群公告。',analysis:'你可能不喜欢正面冲突，同时又很需要事情保持可预期。于是你用行动重新拿回控制感，却没有把真正的分歧摆到台面上。旁人看到的是“你突然变得很难配合”，未必知道你之前已经忍了很久。',insight:'把“我希望怎样”说出来，比用冷淡或暗中调整让别人猜，通常更容易协商。',share:'我是《不说但要按我想的演》：台词没给，剧本我先改了。'},
  pair03:{title:'全剧最懂事的隐形主角',episode:'观众开始心疼的集数：第 6 集',scene:'群里没人订餐、没人买票、没人对账，最后都是你处理；大家还以为你“本来就愿意”。',analysis:'你可能用“先承担”来避免麻烦或失望，也不容易在不满刚出现时表达边界。短期看，你让事情顺利推进；长期看，别人不一定知道你付出了多少，怨气却会慢慢累积。',insight:'付出如果没有被说出来、也没有协商，就很难成为双方认可的分工。拒绝一件事，不等于拒绝一个人。',share:'我是全剧最懂事的隐形主角：戏份不多，杂活全包。'},
  pair12:{title:'证据不足，导演先喊卡',episode:'观众开始急的集数：第 2 集',scene:'对方临时改计划，你迅速推断出“他根本不重视”，同时开始安排新的方案和责任人。',analysis:'不确定的信号会让你很想快速找到解释；一旦形成解释，安排事情就像重新获得掌控感。问题在于，猜测可能被当成证据，方案也可能在对方还没解释前就被替他决定了。',insight:'把事实、猜测和请求分开表达：发生了什么；你担心什么；你希望接下来怎么处理。',share:'我是《证据不足，导演先喊卡》：你还没解释，我已经安排好重拍了。'},
  pair13:{title:'关系气氛组兼情绪侦探',episode:'观众开始着急的集数：第 5 集',scene:'你察觉到谁语气不对，马上补位、圆场、接下事情；但不确定对方是否真的需要你这么做。',analysis:'你很留意关系里的细节，也可能因此更容易把模糊信号理解成“是不是我该做点什么”。照顾别人确实能让场面缓和，但如果每次都靠你兜住，别人就少了表达和承担的机会。',insight:'关心不一定要靠猜。直接问“你现在希望我听你说，还是帮你一起想办法？”能减少好心办成替人做主。',share:'我是关系气氛组兼情绪侦探：别人的语气变化，我的待办增加。'},
  pair23:{title:'热心项目经理，兼职全组监护人',episode:'观众开始吐槽的集数：第 3 集',scene:'你主动接下所有安排，之后又开始追进度、改细节，最后觉得“怎么什么都得我来”。',analysis:'责任感和控制感可能缠在一起：你想让事情靠谱，于是先把活接过来；活接多了，又更担心别人做不好。结果你既累，也容易让别人感觉没有参与空间。',insight:'分工不只是把任务派出去，也包括允许别人用不同方法完成。先说清标准和截止时间，常常比全程接管更有效。',share:'我是热心项目经理：本来想帮一下，最后开了三次进度会。'},
  single0:{title:'已读不回的留白大师',episode:'观众开始着急的集数：第 4 集',scene:'有不满时先退一步，等自己整理好了，剧情已经错过了最佳沟通时机。',analysis:'你遇到不舒服的事时容易先撤退，给自己时间整理。若一直不回来沟通，别人可能只看到沉默，看不到你真正介意的部分。',insight:'给自己暂停时间可以很有用；最好顺手约定一个回来的时间，比如“我想缓一会儿，晚饭后我们再聊”。',share:'我是《已读不回的留白大师》：不是没想法，是还在加载怎么开口。'},
  single1:{title:'三秒定案的弹幕法官',episode:'观众开始着急的集数：第 2 集',scene:'一个“嗯”字刚发来，你的内心旁白已经开始分析人物动机。',analysis:'你对关系变化很敏感，能快速注意到语气和行为差异；需要留意的是，敏感捕捉到的是线索，不一定就是完整事实。',insight:'试着问一句“我看到你只回了嗯，是不是现在不方便聊？”给事实留出第二种解释。',share:'我是《三秒定案的弹幕法官》：线索收集满分，结案速度也满分。'},
  single2:{title:'全组唯一执行导演',episode:'观众开始吐槽的集数：第 3 集',scene:'大家还在讨论去哪儿，你已经发出了集合时间、路线和备选方案。',analysis:'你擅长让混乱的事落地，但可能把“我觉得这样更稳”变成“大家都得这样做”。协商标准、给别人留方法空间，能减少摩擦。',insight:'把结果标准讲清楚，再让别人选择做法；你不必放弃靠谱，也能给团队留出参与感。',share:'我是《全组唯一执行导演》：群里还没定，我已经发了拍摄通告。'},
  single3:{title:'全剧组最靠谱的工具人',episode:'观众开始心疼的集数：第 5 集',scene:'你说“都可以”，于是订位、买票、对账也都落到了你身上。',analysis:'大家可能确实依赖你，但这不等于所有事情都该由你负责。试着在答应前多问自己一句：“这是我愿意做，还是我怕拒绝后的反应？”',insight:'先暂停十秒，确认自己的时间和意愿，再答应；这是让帮助变得可持续的一种边界。',share:'我是《全剧组最靠谱的工具人》：本来来吃饭，最后顺便做了制片。'},
  balanced:{title:'观众暂时站你这边：能沟通的群像主角',episode:'观众评价：目前没有单一槽点霸屏',scene:'你会有纠结、有情绪，但不总被同一种应对方式牵着走。',analysis:'你的四项分数没有显示出特别突出的单一冲突习惯。你可能会回避、脑补、想控场或过度承担，但这些倾向没有明显压过其他方式。这个结果不代表“永远不会让人着急”，更像是你有机会根据场景调整。',insight:'有弹性不等于每次都处理完美，而是发现自己卡住时，还能试试另一种表达方式。',share:'测完了，观众暂时没骂我。下一集继续观察。'}
};
const gate = document.querySelector('#gate');
const quiz = document.querySelector('#quiz');
const result = document.querySelector('#result');
const form = document.querySelector('#password-form');
const passwordInput = document.querySelector('#password');
const gateError = document.querySelector('#gate-error');
let answers = Array(QUESTIONS.length).fill(null);
let index = 0;
let currentScores = [0,0,0,0];
let currentResult = TYPES.balanced;
let password = '';

function showOnly(section) { [gate,quiz,result].forEach(node => node.classList.toggle('hidden', node !== section)); }
function sayGate(message, error=false) { gateError.textContent = message; gateError.classList.toggle('error', error); }
function startAttempt(value) {
  const button = document.querySelector('#start-btn');
  button.disabled = true;
  sayGate('正在核对密码…');
  const config=window.QUIZ_CONFIG;
  const endpoint=config?.supabaseFunctionUrl || '/api/start';
  const headers={'Content-Type':'application/json'};
  if(config?.supabaseAnonKey){headers.apikey=config.supabaseAnonKey;headers.Authorization=`Bearer ${config.supabaseAnonKey}`;}
  fetch(endpoint,{method:'POST',headers,body:JSON.stringify({password:value})})
    .then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error || '暂时无法开始，请稍后重试。'); return data; })
    .then(data => { password=value; answers=Array(QUESTIONS.length).fill(null); index=0; showOnly(quiz); renderQuestion(); sayGate(`密码可开始测评。剩余 ${data.remaining} 次机会。`); })
    .catch(error => sayGate(error.message, true))
    .finally(() => { button.disabled=false; });
}
form.addEventListener('submit', event => { event.preventDefault(); const value=passwordInput.value.trim(); if (!value) return sayGate('请先输入测评密码。',true); startAttempt(value); });

function renderQuestion() {
  const q=QUESTIONS[index];
  document.querySelector('#scene-num').textContent=String(index+1).padStart(2,'0');
  document.querySelector('#dimension-name').textContent=['第一幕：冲突时，你会……','第二幕：你怎么读懂别人？','第三幕：事情不按计划走时……','第四幕：关系里的责任怎么分？'][q.d];
  document.querySelector('#question-text').textContent=q.t;
  document.querySelector('#progress-fill').style.width=`${((index+1)/QUESTIONS.length)*100}%`;
  document.querySelector('#answered-count').textContent=`已答 ${answers.filter(a=>a!==null).length} / ${QUESTIONS.length}`;
  const back=document.querySelector('#back-btn'); back.disabled=index===0;
  const list=document.querySelector('#answers'); list.replaceChildren();
  SCALE.forEach((label,i)=>{
    const button=document.createElement('button'); button.type='button'; button.className='answer-option'+(answers[index]===i+1?' selected':'');
    button.innerHTML='<span class="answer-radio"></span><span></span>'; button.lastElementChild.textContent=label;
    button.setAttribute('aria-pressed',answers[index]===i+1?'true':'false');
    button.addEventListener('click',()=>{answers[index]=i+1; if(index<QUESTIONS.length-1){index++;renderQuestion();}else finishQuiz();});
    list.append(button);
  });
}
document.querySelector('#back-btn').addEventListener('click',()=>{if(index>0){index--;renderQuestion();}});
document.querySelector('#exit-quiz').addEventListener('click',()=>{if(confirm('现在退出会保留已使用的测试次数。要返回密码页吗？'))showOnly(gate);});

function getScores() {
  const sums=[0,0,0,0], counts=[0,0,0,0];
  QUESTIONS.forEach((q,i)=>{let value=answers[i]; if(q.r)value=6-value; sums[q.d]+=value;counts[q.d]++;});
  return sums.map((sum,i)=>Math.round(((sum/counts[i]-1)/4)*100));
}
function selectType(scores) {
  const ranked=scores.map((score,i)=>({score,i})).sort((a,b)=>b.score-a.score);
  const [a,b]=ranked;
  if(a.score>=55 && b.score>=55) return TYPES[`pair${Math.min(a.i,b.i)}${Math.max(a.i,b.i)}`];
  if(a.score>=65) return TYPES[`single${a.i}`];
  return TYPES.balanced;
}
function finishQuiz() {currentScores=getScores();currentResult=selectType(currentScores);renderResult();showOnly(result);window.scrollTo({top:0,behavior:'smooth'});}
function renderResult() {
  const scores=currentScores;
  const sorted=scores.map((score,i)=>({score,i})).sort((a,b)=>b.score-a.score);
  const tags=sorted.slice(0,2).map(x=>DIMENSIONS[x.i].short).join(' + ');
  const scoreMarkup=scores.map((score,i)=>`<div class="score-row"><span class="score-label">${DIMENSIONS[i].name}</span><span class="score-bar"><i style="width:${score}%"></i></span><span class="score-num">${score}</span></div>`).join('');
  document.querySelector('#result-content').innerHTML=`<div class="eyebrow">YOUR CHARACTER PROFILE · ${tags}</div><div class="result-hero"><div class="result-episode">${currentResult.episode}</div><h1 class="result-title">《${currentResult.title}》</h1><div class="result-subtitle">${currentResult.scene}</div><div class="result-hook">短剧角色观察报告 · 近期互动习惯</div></div><div class="score-card"><div class="score-heading"><span>你的剧情触发点</span><span>近期自评 / 0—100</span></div>${scoreMarkup}</div><div class="result-body"><section class="result-section"><h3>为什么观众会急</h3><p>${currentResult.analysis}</p></section><section class="result-section"><h3>这一集可以怎么改写</h3><p>${currentResult.insight}</p></section><div class="result-footer-quote">“${currentResult.share}”</div></div>`;
  renderAnswerReview();
}

function renderAnswerReview() {
  const review=document.querySelector('#answer-review');
  if(answers.some(answer=>answer===null)){review.classList.add('hidden');review.replaceChildren();return;}
  review.classList.remove('hidden');
  const title=document.createElement('h3');title.className='review-title';title.textContent='对照你的真实答案：本次积分从哪里来？';
  const note=document.createElement('p');note.className='review-note';note.textContent='仅显示在你当前的结果页，不会进入分享链接或结果长图。每题对本维度最高贡献约 16.7 分。';
  review.replaceChildren(title,note);
  DIMENSIONS.forEach((dimension,d)=>{
    const card=document.createElement('details');card.className='review-dimension';
    const summary=document.createElement('summary');summary.innerHTML=`<span></span><strong>${dimension.name}</strong><b>${currentScores[d]} 分</b>`;summary.querySelector('span').className='review-chevron';
    const list=document.createElement('ol');list.className='review-list';
    QUESTIONS.forEach((q,i)=>{if(q.d!==d)return;
      const raw=answers[i],scored=q.r?6-raw:raw,contribution=((scored-1)/4)*(100/6);
      const row=document.createElement('li');
      const text=document.createElement('span');text.className='review-question';text.textContent=q.t;
      const answer=document.createElement('span');answer.className='review-answer';answer.textContent=`你的选择：${SCALE[raw-1]}${q.r?' · 反向计分':''}`;
      const points=document.createElement('span');points.className='review-points';points.textContent=`计入 ${contribution.toFixed(1)} 分`;
      row.append(text,answer,points);list.append(row);
    });
    card.append(summary,list);review.append(card);
  });
}

function createShareURL() {
  const payload=btoa(unescape(encodeURIComponent(JSON.stringify({v:1,s:currentScores})))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  return `${location.origin}${location.pathname}?r=${payload}`;
}
function loadSharedResult() {
  const encoded=new URLSearchParams(location.search).get('r'); if(!encoded)return false;
  try {const normalized=encoded.replace(/-/g,'+').replace(/_/g,'/');const parsed=JSON.parse(decodeURIComponent(escape(atob(normalized))));if(parsed.v!==1||!Array.isArray(parsed.s)||parsed.s.length!==4||parsed.s.some(n=>!Number.isFinite(n)||n<0||n>100))return false;answers=Array(QUESTIONS.length).fill(null);currentScores=parsed.s.map(Math.round);currentResult=selectType(currentScores);renderResult();showOnly(result);document.querySelector('#answer-review').classList.add('hidden');return true;}catch{return false;}
}
document.querySelector('#copy-btn').addEventListener('click',async()=>{
  const url=createShareURL(),status=document.querySelector('#action-status');
  try{await navigator.clipboard.writeText(url);status.textContent='结果链接已复制，发给朋友即可查看。';}
  catch{const area=document.createElement('textarea');area.value=url;area.style.position='fixed';area.style.opacity='0';document.body.append(area);area.select();const ok=document.execCommand('copy');area.remove();status.textContent=ok?'结果链接已复制，发给朋友即可查看。':'复制失败，请手动复制地址栏链接。';}
});
document.querySelector('#retry-btn').addEventListener('click',()=>{passwordInput.value=password;showOnly(gate);sayGate('再测一次会占用这个密码的一次机会。');passwordInput.focus();});

function wrapCanvasText(ctx,text,x,y,maxWidth,lineHeight,maxLines=20){let line='',lines=0;for(const char of text){const test=line+char;if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,x,y);line=char;y+=lineHeight;lines++;if(lines>=maxLines)return y;}else line=test;}if(line)ctx.fillText(line,x,y);return y+lineHeight;}
function roundedRect(ctx,x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}}
async function makeResultImage(){
  if(document.fonts?.ready)await document.fonts.ready;
  const canvas=document.createElement('canvas');canvas.width=900;canvas.height=1900;const ctx=canvas.getContext('2d');
  const bg=ctx.createLinearGradient(0,0,900,1900);bg.addColorStop(0,'#211a27');bg.addColorStop(1,'#15121a');ctx.fillStyle=bg;ctx.fillRect(0,0,900,1900);
  ctx.fillStyle='#ff7898';ctx.font='500 23px "DM Mono", sans-serif';ctx.fillText('THE DRAMA IS YOURS TO EDIT.',72,82);
  ctx.fillStyle='#b5a7b8';ctx.font='500 25px "Noto Sans SC", sans-serif';ctx.fillText('短剧人物观察室 · 近期互动习惯',72,132);
  roundedRect(ctx,55,175,790,400,28,'#38283f','rgba(255,255,255,.14)');
  ctx.fillStyle='#e9a9bb';ctx.font='500 23px "Noto Sans SC", sans-serif';ctx.fillText(currentResult.episode,90,232);
  ctx.fillStyle='#fff7fb';ctx.font='900 51px "Noto Sans SC", sans-serif';wrapCanvasText(ctx,`《${currentResult.title}》`,90,310,690,68,2);
  ctx.fillStyle='#d3c5d7';ctx.font='500 26px "Noto Sans SC", sans-serif';let y=wrapCanvasText(ctx,currentResult.scene,90,395,690,43,3);
  roundedRect(ctx,82,y+5,330,48,14,'rgba(255,255,255,.08)');ctx.fillStyle='#ffd9c0';ctx.font='500 19px "Noto Sans SC", sans-serif';ctx.fillText('短剧角色观察报告',102,y+37);
  ctx.fillStyle='#fff2f7';ctx.font='700 27px "Noto Sans SC", sans-serif';ctx.fillText('你的剧情触发点',72,665);
  const labels=['撤退避冲突','脑补判案','控场改剧本','过度兜底'];
  currentScores.forEach((score,i)=>{const top=720+i*70;ctx.fillStyle='#c9bdce';ctx.font='500 22px "Noto Sans SC", sans-serif';ctx.fillText(labels[i],72,top);roundedRect(ctx,280,top-17,490,12,8,'rgba(255,255,255,.1)');roundedRect(ctx,280,top-17,490*score/100,12,8,'#c18aff');ctx.fillStyle='#f2e5f3';ctx.font='500 20px "DM Mono", sans-serif';ctx.fillText(String(score),790,top);});
  let sy=1045;ctx.fillStyle='#ffafc3';ctx.font='700 24px "Noto Sans SC", sans-serif';ctx.fillText('为什么观众会急',72,sy);sy+=48;ctx.fillStyle='#d2c8d5';ctx.font='400 23px "Noto Sans SC", sans-serif';sy=wrapCanvasText(ctx,currentResult.analysis,72,sy,750,41,5)+20;
  ctx.fillStyle='#ffafc3';ctx.font='700 24px "Noto Sans SC", sans-serif';ctx.fillText('这一集可以怎么改写',72,sy);sy+=48;ctx.fillStyle='#d2c8d5';ctx.font='400 23px "Noto Sans SC", sans-serif';sy=wrapCanvasText(ctx,currentResult.insight,72,sy,750,41,4)+15;
  const quoteY=Math.min(Math.max(sy+13,1545),1690);roundedRect(ctx,65,quoteY-35,770,130,18,'rgba(255,100,136,.1)');ctx.fillStyle='#f1cbd5';ctx.font='600 23px "Noto Sans SC", sans-serif';wrapCanvasText(ctx,`“${currentResult.share}”`,90,quoteY+10,710,39,2);
  ctx.fillStyle='#8f8394';ctx.font='400 18px "Noto Sans SC", sans-serif';ctx.fillText('娱乐与自我观察 · 不是心理诊断',72,1835);ctx.fillStyle='#ff7898';ctx.font='500 18px "DM Mono", sans-serif';ctx.fillText('THE DRAMA IS YOURS TO EDIT.',72,1870);
  return new Promise(resolve=>canvas.toBlob(blob=>resolve(blob),'image/png'));
}
document.querySelector('#save-btn').addEventListener('click',async()=>{
  const button=document.querySelector('#save-btn'),status=document.querySelector('#action-status');button.disabled=true;status.textContent='正在生成长图…';
  try{const blob=await makeResultImage();if(!blob)throw new Error('无法生成图片');const file=new File([blob],`短剧角色测评-${currentResult.title}.png`,{type:'image/png'});
    if(navigator.canShare?.({files:[file]})&&navigator.share){await navigator.share({files:[file],title:`我的短剧角色是《${currentResult.title}》`,text:currentResult.share});status.textContent='已打开系统分享面板，可选择保存图片或发送给朋友。';}
    else{const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`短剧角色测评-${currentResult.title}.png`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1500);status.textContent='长图已下载；手机端可在下载文件中保存到相册。';}
  }catch(error){if(error.name==='AbortError')status.textContent='已取消保存。';else status.textContent='图片生成失败，请刷新后再试。';}finally{button.disabled=false;}
});

const modal=document.querySelector('#gift-modal');
document.querySelector('#gift-btn').addEventListener('click',()=>{modal.classList.remove('hidden');document.querySelector('[data-close-modal].modal-ok').focus();});
modal.querySelectorAll('[data-close-modal]').forEach(button=>button.addEventListener('click',()=>modal.classList.add('hidden')));
document.addEventListener('keydown',event=>{if(event.key==='Escape')modal.classList.add('hidden');});

if(!loadSharedResult())showOnly(gate);
