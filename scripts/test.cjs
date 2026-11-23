const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = fs.existsSync(path.join(__dirname, '../dist/app.js')) ? '../dist' : '..';
const {filterPapers} = require(path.join(__dirname, root, 'app.js'));
const papers = JSON.parse(fs.readFileSync(path.join(__dirname, root, 'papers.json')));
assert.ok(papers.length>0);
assert.equal(new Set(papers.map(p=>p.id)).size,papers.length,'Unique paper ids');
const {codeLink}=require(path.join(__dirname,root,'app.js'));
for(const code of [undefined,'','javascript:alert(1)','http://example.org','https://','https://user:pass@example.org'])assert.equal(codeLink({code}),'');
assert.equal(codeLink({code:'https://github.com/example/project'}),'https://github.com/example/project');
for(const p of papers){
 for(const key of ['problem','method','inputs_outputs','contribution','limitations'])assert.ok(typeof p.analysis?.[key]==='string'&&p.analysis[key].trim(),`${p.id}: missing analysis ${key}`);
 assert.ok(p.analysis.sources.length,`${p.id}: analysis must cite sources`);
 assert.ok(p.analysis.evidence_level,`${p.id}: reading scope must be explicit`);
 if(p.analysis.limitations_kind==='editorial_scope')assert.ok(p.analysis.scope_reviewed_at,`${p.id}: editorial scope review date`);
 if(p.code)assert.equal(codeLink(p),p.code);
 if(p.code_provenance){assert.equal(p.code_provenance.url,p.code);assert.ok(p.code_provenance.verified_at);}
}
const markdown=fs.readFileSync(path.join(__dirname,root,'README.md'),'utf8');
for(const p of papers.filter(p=>p.code))assert.ok(markdown.includes(`- [code](${p.code}) **[${p.title}]`),`${p.id}: README badge precedes method`);
console.log('PASS: complete sourced detail fields, explicit reading scope, implementation provenance, safe code links and matching Markdown badges.');
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
assert.equal(paperAnalysis({analysis:{evidence_level:'primary_publisher_preview'}}).evidence_label,'出版商预览已核对');
assert.equal(paperAnalysis({analysis:{evidence_level:'primary_project_and_implementation'}}).evidence_label,'作者项目与实现已核对');
assert.equal(paperAnalysis({analysis:{evidence_level:'unknown_technical_enum'}}).evidence_label,'核验范围见说明');
for(const paper of papers){const label=paperAnalysis(paper).evidence_label;assert.ok(!/[a-z_]/i.test(label),'Evidence labels must be human-readable Chinese');}
console.log('PASS: all catalog evidence-level labels localized; unknown enum safely generalized.');

const {groupPapersByYear,yearCounts,paperFigure}=require(path.join(__dirname,root,'app.js'));
const yearGroups=groupPapersByYear(papers);
assert.equal(yearGroups.reduce((sum,g)=>sum+g.items.length,0),papers.length);
assert.ok(yearGroups.every((g,i)=>!i||yearGroups[i-1].year>g.year));
assert.ok(groupPapersByYear(papers,'oldest').every((g,i,all)=>!i||all[i-1].year<g.year));
assert.deepEqual(groupPapersByYear([]),[]);
assert.ok(groupPapersByYear(papers,'title').every(g=>g.items.every((p,i)=>!i||ccfTier(g.items[i-1])!==ccfTier(p)||g.items[i-1].title.localeCompare(p.title)<=0)));
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

// Years remain primary; validated CCF A/B/C ranks precede unmarked records.
const ranked = [
 {id:'none',title:'A unmarked'},
 {id:'unsafe',title:'B unsafe',ccf:{tier:'A',source:'javascript:alert(1)'}},
 {id:'c',title:'C title',ccf:{tier:'C',source:'https://www.ccf.org.cn/'}},
 {id:'b',title:'B title',ccf:{tier:'B',source:'https://www.ccf.org.cn/'}},
 {id:'a-z',title:'Z title',ccf:{tier:'A',source:'https://www.ccf.org.cn/'}},
 {id:'a-a',title:'A title',ccf:{tier:'A',source:'https://www.ccf.org.cn/'}}
].map(p=>({...papers[0],year:2024,...p,ccf:p.ccf}));
const expectedRank=['a-a','a-z','b','c','none','unsafe'];
assert.deepEqual(filterPapers(ranked,{}).map(p=>p.id),expectedRank);
assert.deepEqual(filterPapers(ranked,{sort:'oldest'}).map(p=>p.id),expectedRank);
assert.deepEqual(filterPapers(ranked,{sort:'title'}).map(p=>p.id),expectedRank);
assert.deepEqual(groupPapersByYear(ranked,'title')[0].items.map(p=>p.id),expectedRank);
assert.deepEqual(groupPapersByYear(ranked)[0].items.map(p=>p.id),expectedRank);
assert.deepEqual(groupPapersByYear(ranked,'oldest')[0].items.map(p=>p.id),expectedRank);
const withYears=[...ranked,{...ranked[0],id:'new',year:2025},{...ranked[4],id:'old',year:2023}];
assert.equal(filterPapers(withYears,{})[0].id,'new');
assert.equal(filterPapers(withYears,{sort:'oldest'})[0].id,'old');
const alphabetical=filterPapers(withYears,{sort:'title'});
assert.equal(alphabetical[0].id,'new');
assert.deepEqual(alphabetical.filter(p=>p.year===2024).map(p=>p.id),expectedRank);
assert.deepEqual(filterPapers(ranked,{ccf:'A'}).map(p=>p.id),['a-a','a-z']);
assert.deepEqual(yearCounts(ranked),yearCounts(filterPapers(ranked,{})));
assert.equal(ranked[0].id,'none','Sorting does not mutate source data');
console.log('PASS: within-year CCF A/B/C/unmarked priority, unsafe ranks, same-tier alphabetical order in all sort modes, chronology, filters and nonmutation.');

// The chart reflects every active condition except year, keeping year choices visible.
const {filteredYearCounts}=require(path.join(__dirname,root,'app.js'));
for(const filters of [{},{category:'Head'},{category:'Hand'},{category:'Human'},{dimension:'2D'},{dimension:'3D'},{status:'Preprint'},{ccf:'A'},{ccf:'B'},{ccf:'C'},{ccf:'unmarked'},{code:true},{query:'transformer'},{venue:papers[0].venue},{category:'Human',dimension:'3D',ccf:'A',code:true},{query:'no-such-paper-absent-987'}]){
 const expected=yearCounts(filterPapers(papers,filters));
 assert.deepEqual(filteredYearCounts(papers,filters),expected);
 assert.deepEqual(filteredYearCounts(papers,{...filters,year:'2024'}),expected,'Year selection must not collapse the histogram');
 assert.equal(filteredYearCounts(papers,filters).reduce((sum,x)=>sum+x.count,0),filterPapers(papers,filters).length);
}
assert.deepEqual(filteredYearCounts([],{category:'Head'}),[]);
const preservedFilters={category:'Hand',year:'2024'};filteredYearCounts(papers,preservedFilters);assert.equal(preservedFilters.year,'2024');
console.log('PASS: chart follows category/dimension/status/CCF/code/query/venue and combined filters; ignores year without mutating filters; handles empty results.');

// REACH publication correction: hosting on arXiv must not imply preprint-only status.
const reach=papers.find(p=>p.id==='reach');
assert.ok(reach,'REACH stays in the catalog');
assert.equal(reach.venue,'FG');assert.equal(reach.year,2026);assert.equal(reach.status,'Published');assert.equal(ccfTier(reach),'C');
assert.equal(reach.url,'https://arxiv.org/abs/2605.22231');assert.equal(reach.preprint_url,reach.url);
assert.equal(reach.analysis.evidence_level,'primary_abstract_and_targeted_fulltext');assert.equal(reach.analysis.limitations_kind,'editorial_scope');assert.ok(reach.analysis.limitations.includes('多视角'));
assert.ok(reach.primary_sources.includes('https://vision.ist.i.kyoto-u.ac.jp/research/reach/'));
assert.ok(reach.primary_sources.includes('https://vision.ist.i.kyoto-u.ac.jp/publication/'));
assert.ok(!reach.summary.includes('正式接收状态未核实'));
assert.ok(filterPapers(papers,{status:'Published',ccf:'C',venue:'FG'}).some(p=>p.id==='reach'));
assert.ok(!filterPapers(papers,{status:'Preprint'}).some(p=>p.id==='reach'));
console.log('PASS: REACH FG 2026 / CCF C correction, preserved arXiv and targeted method evidence, author sources and publication filters.');

// Pipeline depth is optional; only sourced, structured notes are rendered.
const {paperPipeline,paperFigures}=require(path.join(__dirname,root,'app.js'));
assert.equal(paperPipeline({}).available,false);
assert.equal(paperPipeline({}).kind,'method');
assert.equal(paperPipeline({pipeline:{kind:'survey'}}).kind,'survey');
assert.equal(paperPipeline({pipeline:{steps:[{title:'one',description:'text'}],sources:[{url:'https://example.org'}]}}).available,false);
assert.equal(paperPipeline({pipeline:{steps:[{title:'one',description:'text'},{title:'two',description:'text'}],sources:[{url:'javascript:alert(1)'}]}}).available,false);
const pipelinePapers=papers.filter(p=>p.pipeline);
const verifiedAuthorPdf=/^https:\/\/(?:faculty\.cc\.gatech\.edu\/~hic\/CS7616\/Papers\/Yang-Ramanan-2013|www\.cs\.toronto\.edu\/~fleet\/research\/Papers\/handTrackerPAMI|www\.ece\.ualberta\.ca\/~lcheng5\/papers\/XuEtAl_IJCV16|collomosse\.com\/pubs\/Gilbert-IJCV-2019|vision\.imar\.ro\/human3\.6m\/pami-h36m|www\.microsoft\.com\/en-us\/research\/wp-content\/uploads\/2016\/(?:02\/BodyPartRecognition|04\/iccv_2015_camready))\.pdf#page=\d+$/;
const publisherPreviews=new Map([
 ['hland-pose',new Set(['https://www.sciencedirect.com/science/article/abs/pii/S0925231225010082','https://doi.org/10.1016/j.neucom.2025.130336'])],
 ['hand-survey-cameras-2019',new Set(['https://www.sciencedirect.com/science/article/abs/pii/S0031320319301724','https://doi.org/10.1016/j.patcog.2019.04.026'])],
 ['rrl-head-pose',new Set(['https://www.sciencedirect.com/science/article/pii/S0020025526009643','https://doi.org/10.1016/j.ins.2026.124033'])],
]);
for(const p of pipelinePapers){
 const pipeline=paperPipeline(p);
 assert.ok(pipeline.available&&pipeline.overview&&pipeline.training&&pipeline.inference&&pipeline.figure_reading,`${p.id}: complete pipeline`);
 assert.ok(pipeline.steps.length>=4,`${p.id}: module-level steps`);
 assert.ok(paperFigures(p).some(f=>f.src)||(p.pipeline.figure_status==='original_link_only'||p.pipeline.figure_status==='architecture_not_located')&&paperFigures(p).some(f=>f.source),`${p.id}: pipeline needs a verified figure or an explicitly pending original-source link`);
 assert.ok(pipeline.sources.every(s=>
  /^https:\/\/arxiv\.org\/html\/\d{4}\.\d{4,5}v\d+#\S+$/.test(s.url)||
  /^https:\/\/openaccess\.thecvf\.com\/content[^#]+\/papers\/[^#]+\.pdf#page=\d+$/.test(s.url)||
  (p.id==='handy'&&s.url==='https://openaccess.thecvf.com/content/CVPR2023/supplemental/Potamias_Handy_Towards_a_CVPR_2023_supplemental.pdf#page=1')||
  /^https:\/\/www\.cs\.uic\.edu\/~tangw\/files\/2025_PR_ZhimingZou\.pdf#page=\d+$/.test(s.url)||
  /^https:\/\/link\.springer\.com\/article\/10\.1007\/(?:s42979-023-01796-z|s10462-024-10936-7|s11263-023-01856-0|s11263-018-1118-y)#(?:Sec\d+|figure-\d+)$/.test(s.url)||
  /^https:\/\/link\.springer\.com\/content\/pdf\/10\.1007\/s11263-012-0549-0\.pdf#page=\d+$/.test(s.url)||
  /^https:\/\/people\.ict\.usc\.edu\/~gratch\/CSCI534\/Old-Readings\/Head%20Pose%20estimation\.pdf#page=\d+$/.test(s.url)||
  (p.id==='headdiff'&&/^https:\/\/(?:ieeexplore\.ieee\.org\/document\/10462910|www\.nxu\.edu\.cn\/(?:info\/1590\/31709\.htm|__local\/3\/AF\/BD\/10E5B14A0EC54DD6CA74765A293_AF945962_61CB5\.png\?e=\.png))$/.test(s.url))||
  (p.id==='quatnet'&&/^https:\/\/(?:ieeexplore\.ieee\.org\/document\/8444061(?:\/figures#fig3)?|scholar\.nycu\.edu\.tw\/zh\/publications\/quatnet-quaternion-based-head-pose-estimation-with-multiregressio\/)$/.test(s.url))||
  (p.id==='instanthmr'&&/^https:\/\/arxiv\.org\/pdf\/2611\.09195v2#page=(?:3|4|5|21)$/.test(s.url))||
  (p.id==='oa-skeleton-st'&&new Set(["https://www.mdpi.com/1424-8220/26/22/7283#sensors-26-07283-f004", "https://www.mdpi.com/1424-8220/26/22/7283#sec3dot5-sensors-26-07283", "https://www.mdpi.com/1424-8220/26/22/7283#sensors-26-07283-t003", "https://www.mdpi.com/1424-8220/26/22/7283#sensors-26-07283-t008"] ).has(s.url))||
  verifiedAuthorPdf.test(s.url)||publisherPreviews.get(p.id)?.has(s.url)||
  (p.id==='a2j-transformer-plus'&&/^https:\/\/(?:changlongjianggit\.github\.io\/A2J-Transformer-Plus\/(?:static\/images\/method_figure[23]\.png)?|github\.com\/ChanglongJiangGit\/A2J-Transformer-Plus\/blob\/main\/main\/model\.py#L188-L272)$/.test(s.url))
 ),`${p.id}: versioned section or primary PDF page anchors`);
}
assert.ok(pipelinePapers.length>=6);
assert.equal(paperFigures({figure:{src:'assets/figures/a.png',source:'https://example.org'},figures:[{src:'assets/figures/a.png',source:'https://example.org'},null]}).length,1);
const crypto=require('node:crypto');
const figureManifest=JSON.parse(fs.readFileSync(path.join(__dirname,root,'assets/figures/manifest.json'),'utf8'));
for(const p of papers)for(const figure of paperFigures(p).filter(f=>f.src)){
 const file=path.join(__dirname,root,figure.src);
 assert.ok(fs.existsSync(file),`${p.id}: figure exists`);
 const entry=figureManifest.find(f=>f.src===figure.src&&f.paper_id===p.id);
 assert.ok(entry&&entry.attribution&&entry.license_evidence_url&&entry.modifications,`${p.id}: image provenance`);
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),entry.sha256,`${p.id}: manifest checksum`);
 assert.equal(figure.source,entry.source_url);assert.equal(figure.license,entry.license);
}
console.log(`PASS: ${pipelinePapers.length} sourced pipelines, training/inference separation, optional multi-figure rendering and all local image checksums/attributions.`);
const progress=JSON.parse(fs.readFileSync(path.join(__dirname,root,'curation-progress.json'),'utf8'));
assert.equal(progress.total,papers.length);assert.equal(progress.entries.length,papers.length);
assert.equal(new Set(progress.entries.map(p=>p.id)).size,papers.length);
assert.equal(progress.counts.complete+progress.counts.figure_pending,pipelinePapers.length);
assert.equal(Object.values(progress.counts).reduce((a,b)=>a+b,0),papers.length);
for(const entry of progress.entries){
 const p=papers.find(p=>p.id===entry.id);assert.ok(p);
 if(entry.status==='complete')assert.ok(p.pipeline&&entry.figure_status==='verified_local'&&paperFigures(p).some(f=>f.src));
 if(entry.status==='figure_pending')assert.ok(p.pipeline&&entry.figure_status===p.pipeline.figure_status&&!paperFigures(p).some(f=>f.src));
 if(entry.status==='pending')assert.ok(!p.pipeline);
}
console.log('PASS: full catalogue queue matches actual pipeline and original-figure completion; pending pages are never counted as complete.');
