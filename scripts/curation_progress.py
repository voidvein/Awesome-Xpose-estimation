"""Build a reproducible per-paper queue without treating short summaries as full pages."""
import json
from datetime import datetime,timezone,timedelta
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
papers=json.loads((ROOT/'papers.json').read_text(encoding='utf-8'))
manifest=json.loads((ROOT/'assets/figures/manifest.json').read_text(encoding='utf-8'))
verified={e['src'] for e in manifest if e.get('status')=='verified' and e.get('src')}
entries=[]
for p in papers:
    pipeline=p.get('pipeline') or {}
    figures=[p.get('figure')]+p.get('figures',[])
    illustrated=any(f and f.get('src') in verified for f in figures)
    detailed=all(pipeline.get(k) for k in ['overview','steps','training','inference','figure_reading','sources'])
    status='complete' if detailed and illustrated else 'figure_pending' if detailed else 'pending'
    figure_status='verified_local' if illustrated else pipeline.get('figure_status', 'not_yet_verified')
    entries.append({'id':p['id'],'category':p['category'],'title':p['title'],'status':status,
                    'paper_url':p['url'],'reading_level':p.get('analysis',{}).get('evidence_level',''),
                    'figure_status':figure_status,
                    'reviewed_at':pipeline.get('reviewed_at'),
                    'figure_note':next((f.get('note','') for f in figures if f and f.get('note')),'')})
counts={status:sum(e['status']==status for e in entries) for status in ['complete','figure_pending','pending']}
out={'updated_at':datetime.now(timezone(timedelta(hours=8))).date().isoformat(),'total':len(entries),'counts':counts,
     'completion_standard':'Source-checked module-level pipeline or survey classification, separate use contexts, and a figure guide. Embed paper originals when reuse permission is clear, otherwise link to the original figure or method section. Summaries alone do not count.',
     'entries':entries}
(ROOT/'curation-progress.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
lines=['# 详情页构建进度','',
 f"更新于 {out['updated_at']}。共 {len(entries)} 篇，已展开 {counts['complete']+counts['figure_pending']} 篇，其中 {counts['complete']} 篇嵌入原图。待展开 {counts['pending']} 篇。",'',
 '方法页按原文说明数据流、模块、训练与推理。数据集和综述分别说明采集与评测或分类与比较。原图按许可收录，未确认许可的保留原图链接。论文无独立结构图时，链接至对应的算法或方法正文。已在各页注明可核对的原文范围。','',
 '全量逐篇队列见 [curation-progress.json](curation-progress.json)。本表可用 `python scripts/curation_progress.py` 从当前数据重新生成。','']
for status,label in [('complete','已展开并嵌入原图'),('figure_pending','已展开并提供原文链接')]:
 lines.extend(['## '+label,''])
 for e in entries:
  if e['status']==status:lines.append('- ['+e['title']+'](https://voidvein.github.io/Awesome-Xpose-estimation/#paper='+e['id']+')')
 lines.append('')
if counts['pending']:
 lines.extend(['## 待展开条目','','查看全量 JSON 队列中的待展开条目。',''])
(ROOT/'CURATION.md').write_text('\n'.join(lines),encoding='utf-8')
print(json.dumps({'total':len(entries),**counts}))
