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
