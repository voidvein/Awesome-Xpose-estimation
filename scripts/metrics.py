#!/usr/bin/env python3
"""Build auditable static metrics, never browser-side secrets. Python stdlib only."""
import argparse, datetime, json, os, re, time, urllib.request, urllib.error, urllib.parse
from pathlib import Path

def repo_name(url):
    u=urllib.parse.urlparse(url or '')
    if u.scheme != 'https' or u.hostname != 'github.com': return None
    parts=u.path.strip('/').split('/')
    if len(parts)<2 or not all(re.fullmatch(r'[A-Za-z0-9_.-]+',x) for x in parts[:2]): return None
    return '/'.join(parts[:2]).removesuffix('.git')

def get(url, token=None):
    headers={'User-Agent':'Awesome-Xpose-estimation-metrics','Accept':'application/json'}
    if token: headers['Authorization']='Bearer '+token
    with urllib.request.urlopen(urllib.request.Request(url,headers=headers),timeout=20) as r:
        return json.load(r)

def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--papers',default='dist/papers.json')
    ap.add_argument('--out',default='dist/metrics.json')
    ap.add_argument('--max-github',type=int,default=45)
    ap.add_argument('--citations',action='store_true',help='Only exact DOI/OpenAlex IDs; no fuzzy title matching')
    args=ap.parse_args()
    papers=json.loads(Path(args.papers).read_text())
    out=Path(args.out)
    old=json.loads(out.read_text()).get('papers',{}) if out.exists() else {}
    result={}; cache={}; count=0; stopped=False
    for p in papers:
        row=dict(old.get(p['id'],{})); name=repo_name(p.get('code'))
        if name:
            if name not in cache:
                if count>=args.max_github or stopped:
                    cache[name]=None
                else:
                    count+=1
                    try:
                        r=get('https://api.github.com/repos/'+name,os.environ.get('GITHUB_TOKEN'))
                        cache[name]={'value':r['stargazers_count'],'forks':r['forks_count'],'repository':r['full_name'],'source':r['html_url'],'api':'https://api.github.com/repos/'+r['full_name'],'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'repository'}
                    except urllib.error.HTTPError as e:
                        cache[name]=None
                        if e.code in (403,429): stopped=True
                        print('GitHub unavailable:',name,e.code)
                    except Exception as e:
                        cache[name]=None; print('GitHub unavailable:',name,type(e).__name__)
                    time.sleep(.25)
            if cache[name] is not None: row['stars']=cache[name]
            elif 'stars' not in row: row['stars']=None
        else: row['stars']=None
        if args.citations:
            identifier=p.get('openalex') or p.get('doi')
            if identifier:
                identifier=re.sub(r'^https?://(?:doi.org|openalex.org)/','',identifier)
                if re.fullmatch(r'W\d+',identifier) or re.fullmatch(r'10\.\d{4,9}/\S+',identifier):
                    target=identifier if identifier.startswith('W') else 'https://doi.org/'+identifier
                    url='https://api.openalex.org/works/'+urllib.parse.quote(target,safe=':/')
                    try:
                        r=get(url)
                        row['citations']={'value':r['cited_by_count'],'source':r['id'],'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'provider':'OpenAlex','matchedBy':'exact identifier','matchedTitle':r['display_name']}
                    except Exception as e: print('OpenAlex unavailable:',p['id'],type(e).__name__)
                    time.sleep(.25)
        row.setdefault('citations',None)
        result[p['id']]=row
    payload={'generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'notes':'Stars measure repository attention, not paper quality. Citation counts are provider-specific. null means unverified/unavailable, never zero. Per-metric timestamps may be older than generation time.','papers':result}
    out.parent.mkdir(parents=True,exist_ok=True)
    temp=out.with_suffix('.tmp'); temp.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n'); temp.replace(out)
    print('Saved',len(result),'records;',sum(bool(x.get('stars')) for x in result.values()),'star snapshots')

if __name__=='__main__': main()
