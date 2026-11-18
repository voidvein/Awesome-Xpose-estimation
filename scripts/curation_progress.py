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
    entries.append({'id':p['id'],'category':p['category'],'title':p['title'],'status':status,
                    'paper_url':p['url'],'reading_level':p.get('analysis',{}).get('evidence_level',''),
                    'figure_status':'verified_local' if illustrated else 'not_yet_verified',
                    'reviewed_at':pipeline.get('reviewed_at'),
                    'figure_note':next((f.get('note','') for f in figures if f and f.get('note')),'')})
counts={status:sum(e['status']==status for e in entries) for status in ['complete','figure_pending','pending']}
out={'updated_at':datetime.now(timezone(timedelta(hours=8))).date().isoformat(),'total':len(entries),'counts':counts,
     'completion_standard':'Source-checked module-level pipeline, separate training/inference, figure guide, and a verified local architecture/process figure. Summaries and applicability notes do not count.',
     'entries':entries}
(ROOT/'curation-progress.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
lines=['# 详情页构建进度','',
 f"更新：{out['updated_at']}。共 {len(entries)} 篇；流程说明已完成 {counts['complete']+counts['figure_pending']} 篇，其中原图已收录 {counts['complete']} 篇；待开展 {counts['pending']} 篇。",'',
 '每篇按原文核对模块顺序、数据流、训练与推理、图号及版本。只使用论文原图；转载许可未明确时只保留原图链接，不重绘。摘要与适用边界笔记不计为流程精读完成。','',
 '全量逐篇队列见 [curation-progress.json](curation-progress.json)。本表可用 `python scripts/curation_progress.py` 从当前数据重新生成。','']
for status,label in [('complete','流程与原图均已完成'),('figure_pending','流程已完成，原图待收录')]:
 lines.extend(['## '+label,''])
 for e in entries:
  if e['status']==status:lines.append('- ['+e['title']+'](https://voidvein.github.io/Awesome-Xpose-estimation/#paper='+e['id']+')')
 lines.append('')
lines.extend(['## 后续队列','',
 '其余条目保留在全量 JSON 队列中。优先复用已取得正文的条目，再按 Head、Hand、Human 分批推进。数据集与综述按实际数据构建/研究分类流程组织，不虚构不存在的网络结构。',''])
(ROOT/'CURATION.md').write_text('\n'.join(lines),encoding='utf-8')
print(json.dumps({'total':len(entries),**counts}))
