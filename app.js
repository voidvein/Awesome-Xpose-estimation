'use strict';
function filterPapers(papers, filters) {
  const query = (filters.query || '').trim().toLocaleLowerCase();
  const words = query.split(/\s+/).filter(Boolean);
  return papers.filter(p => {
    const haystack = [p.id,p.title,p.summary,p.authors,p.venue,p.category,...(p.tags || [])].join(' ').toLocaleLowerCase();
    return words.every(w => haystack.includes(w)) && (!filters.category || p.category === filters.category) && (!filters.dimension || (p.dimensions || []).includes(filters.dimension)) && (!filters.year || String(p.year) === filters.year) && (!filters.status || p.status === filters.status) && (!filters.venue || p.venue === filters.venue) && (!filters.code || Boolean(p.code));
  }).sort((a,b) => filters.sort === 'title' ? a.title.localeCompare(b.title) : filters.sort === 'oldest' ? a.year-b.year || a.title.localeCompare(b.title) : b.year-a.year || a.title.localeCompare(b.title));
}
if (typeof module !== 'undefined') module.exports = {filterPapers};
if (typeof document !== 'undefined') {
  const $ = id => document.getElementById(id);
  let papers = [], category = '';
  const labels = {'':'全部研究',Head:'Head · 头部',Hand:'Hand · 手部',Human:'Human · 人体'};
  function element(tag, text, className) {const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(className)e.className=className;return e;}
  function link(text,url){const a=element('a',text);if(/^https:\/\//.test(url)){a.href=url;a.target='_blank';a.rel='noopener noreferrer';}return a;}
  function render() {
    const result = filterPapers(papers,{query:$('search').value,category,dimension:$('dimension').value,year:$('year').value,status:$('status').value,venue:$('venue').value,code:$('code').checked,sort:$('sort').value});
    $('results').textContent=`显示 ${result.length} / ${papers.length} 篇论文`;
    $('empty').hidden=result.length!==0;
    $('cards').replaceChildren();
    for(const [i,p] of result.entries()){
      const card=element('article',undefined,'card');
      const meta=element('div',undefined,'card-meta');meta.append(element('span',`${p.venue} ${p.year}${p.status==='Preprint'?' · 预印本':''}`,'venue'+(p.status==='Preprint'?' preprint':'')),element('span',String(i+1).padStart(2,'0'),'number'));card.append(meta);
      const title=element('h3');title.append(link(p.title,p.url));card.append(title);
      if(p.authors)card.append(element('p',Array.isArray(p.authors)?p.authors.join(', '):p.authors,'authors'));
      card.append(element('p',p.summary));
      const tags=element('div',undefined,'tags');for(const tag of [p.category,...p.dimensions,...(p.tags||[])])tags.append(element('span',tag,'tag'));card.append(tags);
      const links=element('div',undefined,'card-links');links.append(link('论文 ↗',p.url));if(p.code)links.append(link('代码 ↗',p.code));if(p.project)links.append(link('项目 ↗',p.project));card.append(links);$('cards').append(card);
    }
    for(const button of $('categories').children)button.setAttribute('aria-pressed',String(button.dataset.category===category));
  }
  function clear(){category='';$('search').value='';for(const id of ['dimension','year','status','venue'])$(id).value='';$('code').checked=false;$('sort').value='newest';render();}
  for(const id of ['search','dimension','year','status','venue','code','sort'])$(id).addEventListener(id==='search'?'input':'change',render);
  $('clear').addEventListener('click',clear);$('empty-clear').addEventListener('click',clear);
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();$('search').focus();}});
  fetch('papers.json').then(r=>{if(!r.ok)throw Error('Failed to load catalog');return r.json();}).then(data=>{
    if(!Array.isArray(data))throw Error('Invalid catalog');papers=data;
    $('total').textContent=`${papers.length} PAPERS · 3 TOPICS`;
    for(const [value,label] of Object.entries(labels)){const button=element('button',label,'category');button.dataset.category=value;button.append(element('span',String(value?papers.filter(p=>p.category===value).length:papers.length)));button.addEventListener('click',()=>{category=value;render();});$('categories').append(button);}
    for(const year of [...new Set(papers.map(p=>p.year))].sort((a,b)=>b-a)){const option=element('option',String(year));option.value=String(year);$('year').append(option);}
    for(const venue of [...new Set(papers.map(p=>p.venue))].sort()){const option=element('option',venue);option.value=venue;$('venue').append(option);}
    render();
  }).catch(()=>{$('error').hidden=false;$('results').textContent='数据加载失败';$('total').textContent='OFFLINE';});
}
