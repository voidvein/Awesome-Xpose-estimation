const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = fs.existsSync(path.join(__dirname, '../dist/app.js')) ? '../dist' : '..';
const {filterPapers} = require(path.join(__dirname, root, 'app.js'));
const papers = JSON.parse(fs.readFileSync(path.join(__dirname, root, 'papers.json')));
assert.ok(papers.length>0);
assert.equal(new Set(papers.map(p=>p.id)).size,papers.length,'Unique paper ids');
for(const p of papers){for(const key of ['id','title','category','venue','status','summary','url'])assert.ok(typeof p[key]==='string'&&p[key],`${p.id}: ${key}`);assert.ok(['Head','Hand','Human'].includes(p.category));assert.ok(['Published','Preprint'].includes(p.status));assert.ok(p.year>=1990&&p.year<=new Date().getFullYear()+1);assert.ok(p.dimensions.length&&p.dimensions.every(d=>['2D','3D'].includes(d)));assert.equal(new URL(p.url).protocol,'https:');if(p.code)assert.equal(new URL(p.code).protocol,'https:');}
assert.equal(filterPapers(papers,{}).length,papers.length);
for(const category of ['Head','Hand','Human'])assert.ok(filterPapers(papers,{category}).every(p=>p.category===category));
assert.ok(filterPapers(papers,{dimension:'2D'}).every(p=>p.dimensions.includes('2D')));
assert.ok(filterPapers(papers,{code:true}).every(p=>p.code));
assert.ok(filterPapers(papers,{status:'Preprint'}).every(p=>p.status==='Preprint'));
assert.equal(filterPapers(papers,{query:'zzzz_NONEXISTENT_zzzz'}).length,0);
assert.ok(filterPapers(papers,{query:papers[0].id}).some(p=>p.id===papers[0].id));
assert.ok(filterPapers(papers,{year:'2024'}).every(p=>p.year===2024));
console.log(`PASS: ${papers.length} records; schema, unique IDs, URL safety, search, category, 2D, code, status, year filters.`);
const {ccfTier} = require(path.join(__dirname, root, 'app.js'));
const fixture=Array.from({length:5},(_,i)=>({...papers[0],id:'ccf-'+i,ccf:i<3?{tier:['A','B','C'][i],source:'https://www.ccf.org.cn/',version:'test'}:i===3?{tier:'A',source:'javascript:alert(1)'}:undefined}));
for(const tier of ['A','B','C'])assert.equal(filterPapers(fixture,{ccf:tier}).length,1);
assert.equal(filterPapers(fixture,{ccf:'unmarked'}).length,2);
assert.equal(ccfTier(fixture[3]),'');
assert.equal(ccfTier({ccf:{tier:'D',source:'https://www.ccf.org.cn/'}}),'');
assert.equal(filterPapers(fixture,{ccf:'A',category:'unmatched'}).length,0);
console.log('PASS: CCF A/B/C filtering, missing/unsafe mapping, combined filters.');

// Analysis is optional and never replaced with invented paper-specific content.
const {paperAnalysis}=require(path.join(__dirname,root,'app.js'));
assert.equal(paperAnalysis({}).available,false);
assert.equal(paperAnalysis({analysis:null}).available,false);
const note=paperAnalysis({analysis:{problem:'  研究问题  ',method:['步骤一','步骤二',null],limitations:null,sources:['https://arxiv.org/abs/example',{url:'https://example.org/paper',title:'论文原文'},{url:'javascript:alert(1)',label:'unsafe'},'https://arxiv.org/abs/example',null]}});
assert.equal(note.available,true);assert.equal(note.problem,'研究问题');assert.equal(note.method,'步骤一\n\n步骤二');assert.equal(note.limitations,'');assert.equal(note.sources.length,2);assert.equal(note.sources[1].label,'论文原文');
assert.equal(paperAnalysis({analysis:{problem:{invented:'unsupported'}}}).available,false);
assert.equal(paperAnalysis({analysis:{problem:'<script>literal text</script>'}}).problem,'<script>literal text</script>');
console.log('PASS: optional analysis, prose normalization, explicit missing data, source safety and deduplication.');

const evidence=paperAnalysis({analysis:{problem:'问题',evidence_level:' primary_abstract ',evidence_scope:'仅核查摘要',verification_note:'未阅读全文',verification_notes:['不比较数值','<b>保留纯文本</b>']}});
assert.equal(evidence.evidence_label,'摘要级核验');assert.equal(evidence.evidence_scope,'仅核查摘要');assert.equal(evidence.verification_notes,'未阅读全文\n\n不比较数值\n\n<b>保留纯文本</b>');assert.equal(paperAnalysis({analysis:{evidence_level:'primary_full_text'}}).evidence_label,'全文级核验');
console.log('PASS: per-paper evidence scope, abstract/full-text labels and verification notes.');

assert.equal(paperAnalysis({analysis:{evidence_level:'primary_abstract_and_targeted_fulltext'}}).evidence_label,'摘要与相关正文已核对');
assert.equal(paperAnalysis({analysis:{evidence_level:'unknown_technical_enum'}}).evidence_label,'核验范围见说明');
for(const paper of papers){const label=paperAnalysis(paper).evidence_label;assert.ok(!/[a-z_]/i.test(label),'Evidence labels must be human-readable Chinese');}
console.log('PASS: all catalog evidence-level labels localized; unknown enum safely generalized.');

const {groupPapersByYear,yearCounts,paperFigure}=require(path.join(__dirname,root,'app.js'));
const yearGroups=groupPapersByYear(papers);
assert.equal(yearGroups.reduce((sum,g)=>sum+g.items.length,0),papers.length);
assert.ok(yearGroups.every((g,i)=>!i||yearGroups[i-1].year>g.year));
assert.ok(groupPapersByYear(papers,'oldest').every((g,i,all)=>!i||all[i-1].year<g.year));
assert.deepEqual(groupPapersByYear([]),[]);
assert.ok(groupPapersByYear(papers,'title').every(g=>g.items.every((p,i)=>!i||g.items[i-1].title.localeCompare(p.title)<=0)));
assert.equal(yearCounts(papers).reduce((sum,g)=>sum+g.count,0),papers.length);
assert.equal(paperFigure({}),null);
assert.equal(paperFigure({figure:{src:'assets/figures/example.webp',source:'https://example.org'}}).src,'assets/figures/example.webp');
for(const src of ['../private.png','assets/figures/../../private.png','https://example.org/a.png','assets/figures/x.svg?x=y','javascript:alert(1)'])assert.equal(paperFigure({figure:{src}}).src,'');
assert.equal(paperFigure({figure:{source:'javascript:alert(1)'}}).source,'');
console.log('PASS: year groups/counts, stable group sorting, safe figure paths and sources.');

const licensed=paperFigure({figure:{src:'assets/figures/method.png',source:'https://arxiv.org/html/1234v2',license:'CC BY 4.0',license_url:'https://creativecommons.org/licenses/by/4.0/',attribution:'<b>Author et al.</b>',authors:['Author A','Author B'],figure_number:'Figure 2',version:'arXiv v2',modifications:'裁去页边空白；未改动内容',alt:'方法的编码器和解码器流程'}});
assert.equal(licensed.license_url,'https://creativecommons.org/licenses/by/4.0/');assert.equal(licensed.attribution,'<b>Author et al.</b>');assert.equal(licensed.authors,'Author A, Author B');assert.equal(licensed.figure_number,'Figure 2');assert.equal(licensed.version,'arXiv v2');assert.equal(licensed.alt,'方法的编码器和解码器流程');assert.ok(licensed.modifications);
for(const url of ['javascript:alert(1)','http://example.org/license','https://','https://user:pass@example.org/license']){assert.equal(paperFigure({figure:{source:url,license_url:url}}).source,'');assert.equal(paperFigure({figure:{source:url,license_url:url}}).license_url,'');}
console.log('PASS: figure attribution, version, modifications, alt and HTTPS license URL validation.');
