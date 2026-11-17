# Sources and curation notes

This is a selective catalogue, not a systematic review. Source lists aided discovery; entries link to papers or author sources. Metrics are snapshots and are not comparable across providers.

# Head / face expansion provenance

39 entries: 12 retained recent entries from `head.json`, plus 27 newly researched entries spanning 2013–2024. Existing recent entries extend coverage through 2026. This is a curated research list, not a claim of exhaustive coverage.

Discovery lists consulted:
- https://github.com/becauseofAI/awesome-face (facial landmark section: FAN, PRNet, LAB, PFLD, Adaptive Wing, DeCaFA, classical tree-regression work)
- https://github.com/johnbhlm/face-align (chronological landmark and alignment literature)

New additions have per-entry `primary_sources` and `verified_at`. CVF proceedings, author arXiv pages, official project repositories, BMVC archive and publisher DOIs supplied bibliographic status, dates, and summaries. The discovery lists are aids, not authorities for acceptance status. No star, download or citation figures are invented. Source repositories are linked in `code` where found, with missing code deliberately omitted.

Important distinctions:
- PFLD remains labeled arXiv / Preprint, not an assumed conference acceptance.
- Hopenet is CVPR Workshops 2018 and HIH is ICCV Workshops 2021, not main conference.
- HIH's published title uses “Revisting”; retained as published.
- PIPNet is IJCV 2021 (arXiv first appeared 2020), not the unrelated explainable-classification PIP-Net.
- 6DRepNet is ICIP 2022. Its full-rotation extension is IEEE TIP 2024, linked as related work in the description.
- 6D rotation representation does not itself imply camera translation / 6DoF; img2pose does estimate 6DoF.
- Face landmark regression, dense 3D alignment and head rotation estimation are distinguished through dimensions and tags.

The LAB code link was discovered in the existing awesome list; the paper and bibliographic fields are primary-source verified, but direct GitHub retrieval of LAB timed out. Other linked recent official repos were readable. The 12 retained recent entries were not re-audited in this expansion pass.


# Hand expansion provenance

Checked 2026-11-17. 45 records total: retained 12 existing, added 33. New records span 2015–2024; combined coverage reaches 2026.

## Discovery sources
- https://github.com/xinghaochen/awesome-hand-pose-estimation and its rendered page https://xinghaochen.github.io/awesome-hand-pose-estimation/
- https://github.com/KiaRational/Hand-Object-Interaction-Paper-Lists
- https://mano.is.tue.mpg.de/ (model paper and ecosystem references)

These were discovery aids, not copied content or proof of acceptance. New summaries are original and source links point to primary proceedings, author project pages or author arXiv records. No source code from those projects was reused.

## Verification
CVF search results supplied exact accepted-paper titles, years, venues and abstracts. Some direct CVF opens returned 403; this was not interpreted as paper absence. Primary MANO page and arXiv MediaPipe page were opened in full. InterHand metadata and official code relationship verified through author repository and arXiv. Official code links were additionally checked against CVF abstracts, IEEE, or author GitHub descriptions.

MediaPipe: arXiv explicitly lists CVPR AR/VR Workshop 2020. DeepPrior++ is ICCV Workshops 2017. MANO is ACM TOG / SIGGRAPH Asia 2017, not 2022 (later arXiv upload). FreiHAND is ICCV 2019; MANO ecosystem list has a conflicting ICCV 2020 typo, which was not propagated.

## Scope limitations
Curated breadth, not exhaustive survey or reproduced benchmark. No invented citation/star/download counts. Dataset, foundational hand model and survey records have corresponding tags. 2.5D intermediates are not indiscriminately labeled 2D outputs. MeshGraphormer, METRO and V2V-PoseNet also cover humans and may overlap human-agent entries; parent should deduplicate by title while retaining cross-category tags.


# Human expansion provenance

Checked 2026-11-17. 43 records: 12 existing, 31 additions. This is a selective index, not exhaustive or a leaderboard. No citation/star/download counts were invented or imported.

Discovery sources:
- https://github.com/cbsudux/awesome-human-pose-estimation
- https://github.com/wangzheallen/awesome-human-pose-estimation
- https://github.com/open-mmlab/mmpose
- https://mmpose.readthedocs.io/en/latest/model_zoo_papers/algorithms.html
- https://github.com/open-mmlab/mmhuman3d

These existing projects were used to discover methods and implementations, not copied as prose or used to infer rankings. Metadata was checked against CVF/ECVA/NeurIPS proceedings, arXiv papers and official project/repository pages. Each JSON record has `sources`; newly written Chinese summaries are concise editorial descriptions. Raw years in third-party lists can be wrong (e.g. HRNet is CVPR 2019, not 2020; VideoPose3D is CVPR 2019, not ICCV). Publication years are used except explicit preprints.

Coverage: 2D top-down/bottom-up, heatmap/regression/coordinate classification, transformer foundations; 2D-to-3D lifting and video; parameterized mesh regression/optimization; expressive whole body models and benchmarks.

Limits: no reproduction/benchmark runs; code links not present on every entry; older works selected from 2014 onward, not all historical approaches; DOI and complete author metadata not yet uniformly populated. Existing 2024–2026 records were retained from prior verified research. CVF direct pages can return 403, with official indexed BibTeX/title used when needed. PIXIE venue/year checked via author project, ExPose via author project and arXiv.


