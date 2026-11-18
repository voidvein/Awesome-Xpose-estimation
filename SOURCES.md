# Sources and curation notes

## Head and facial alignment pipeline batch — 2026-11-18

Added 24 targeted method readings covering the short/wide-range HPE analysis, Infinite 3D Landmarks, FaceXFormer v3, SemiUHPE v4, FAN, HopeNet, LAB, Wing Loss, PRNet, Adaptive Wing, DeCaFA, PFLD, LUVLi, 3DDFA-V2, WHENet, PIPNet, ADNet, 6DRepNet, HHP-Net, LwPosr, DTLD, STAR Loss, 6DRepNet360 and partially-latent mixture regression. Exact source versions, method sections and figure anchors are recorded in `scripts/curation-2026-11-18-batch3.json` and each page. LAB uses the official CVPR 2018 PDF, §3.1–3.3, Figure 2 and Algorithm 1; its original diagram remains linked because republication permission has not been established.

These pages distinguish training components from inference, loss-function contributions from new network architectures, rotation representation dimensions from spatial degrees of freedom, and FAN's projected 3D-semantic landmarks from complete XYZ reconstruction. The targeted reading does not constitute a full experiment audit or reproduction. 6DRepNet's ICIP RepVGG configuration and the later 6DRepNet360 ResNet50 configuration are described separately.

Eight complete original image files from seven papers have verified CC/CC0 notices in their exact arXiv HTML versions: wide/short-range HPE methodology, PRNet (architecture plus UV representation), 6DRepNet, LwPosr, DTLD, STAR Loss and 6DRepNet360. Files are unchanged; the manifest records exact URLs, attribution, dimensions and SHA-256. The remaining new diagrams retain original source links. No replacement diagrams were generated.

## Continuing pipeline construction

The user requested extending the HaMeR-style pages across the remaining catalogue. The reproducible queue is tracked in `curation-progress.json` and summarized in `CURATION.md`; `scripts/curation_progress.py` derives it from the actual records and figure manifest. A short abstract or applicability note never counts as a finished pipeline.

The next batch adds 20 method-specific, versioned readings: Sapiens, WiLoR, HandOS, HaWoR, HandDiff, MotionAGFormer, PoseFormer, VideoPose3D, PARE, LocLLM, KptLLM, CapeLLM, ProsePose, LangPose, GVHMR, ViTPose, HRNet, SimCC, RTMW and SMPLest-X. This is targeted method-section reading, without independent reproduction or a blanket full-paper audit. SimCC and ViTPose use their revised v3 sources, rather than early v1 architectures; RTMW's title was checked before accepting its source record.

The user's explicit figure preference is **original paper images only; retain links when republication permission is unclear; do not redraw**. WiLoR's CC BY-NC-ND originals are copied in full without cropping or changing their content. GVHMR and SMPLest-X retain their respective CC licenses. Other new pages link to the precise original figures. For Sapiens v1, the available training-reconstruction and annotation examples are not mislabeled as a complete architecture diagram; its method section is linked while architecture-image discovery remains pending.

## Pipeline and architecture batch — 2026-11-18

The first detailed pipeline batch covers RTMPose, RTMO, FaceLift, HaMeR, TRG and WHAM. Each now has five ordered module-level steps, separate training and inference explanations, a figure-reading guide and version-specific method/figure links. The scope is targeted method-section reading, not independent reproduction or a claim that all catalogue entries received this depth of reading.

Four additional architecture images were imported: FaceLift Figure 4 (the predictor network, alongside the existing training overview), HaMeR Figure 2's architecture, TRG Figure 2 and WHAM Figure 2. Figure-specific attribution, license, version and processing records are in `assets/figures/manifest.json`. CC BY-NC-SA figures retain that license for this noncommercial research catalogue; the repository's software terms do not replace the figure licenses.

Progress is explicitly recorded by the optional `pipeline` field in `papers.json`. Entries without that field remain at their existing reading depth, rather than receiving generated generic module descriptions. Future batches should inspect the method text, distinguish training from inference, identify the actual architecture figure, verify reuse terms, inspect the final image and record the exact source version before adding a pipeline.

This is a selective catalogue, not a systematic review. Source lists aided discovery; entries link to papers or author sources. Metrics are snapshots and are not comparable across providers.

## Detail and implementation review — 2026-11-18

The initial 366 entries now have the five detail fields. This pass adds 346 individual applicability notes, explicitly labeled **编者归纳** in the detail view. These are deductions from the already cited input/output and method conditions, not invented author-reported failures or claims of full-text review. Existing sourced limitations are retained. MotionAGFormer (arXiv:2310.16288v1, experiments and appendices A–D) and PoseFormer (arXiv:2103.10455v3, complexity discussion and appendix D) received targeted body checks, including difficult sequences and dependence on 2D detections.

Primary-page retrieval succeeded for 362 records. Four records (joint-unsup-landmarks, simcc, cocowholebody, hand-survey-cameras-2019) were unavailable in this pass; their pre-existing source references were retained. Retrieval does not imply full-text reading, and their new editorial boundaries do not upgrade the previous evidence level. Nine previously unlabeled reading scopes are now explicitly identified as abstract or project-page readings.

31 implementation links were added after checking author repository READMEs, paper citations and implementation files. Four alternative author repository addresses were also checked; they redirect to the already stored canonical projects, whose addresses were retained. After merging the concurrent five additions, the catalogue contains 371 entries and links 129 implementations; a `code` link precedes the method title on cards, detail headers and in this repository's Markdown index. Code links lead directly to the implementation project; paper-title links continue to open the method detail. A linked repository does not imply that its software, weights or datasets are unrestricted, or that its results have been reproduced. Methods without a verified link remain unmarked, rather than being labeled unavailable.

See `scripts/curation-2026-11-18.json` for the changed implementation records and unavailable primary pages. Metrics were not refreshed in this pass.

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



## CCF labels

Labels refer to the 2026 seventh edition, not historical ratings at the time of each publication. The [CCF release notice](https://www.ccf.org.cn/Academic_Evaluation/By_category/2026-03-31/870181.shtml) announces the edition; the [catalogue PDF reproduced by Lishui University](https://kyc.lsu.edu.cn/_upload/article/files/20/77/2cbaa3754eb9aff9ed74cafed8ff/23a8de02-594c-445f-b084-69b0193c05b3.pdf) is the row-level source. See `ccf-mapping.json` for venue matching and exclusions. Labels describe a venue, not the quality of an individual paper. Workshops and preprints do not inherit main-conference ranks; unmatched entries are left unmarked.

## Expanded catalogue batch

The additional 198 entries were discovered in conference proceedings and verified against primary bibliographic records and abstracts. Of these, 197 are CVF proceedings records and one is an IEEE TMM journal record. The batch is conference-heavy, with limited journal and recent-year coverage; it is not a systematic review. Analyses are abstract-level unless explicitly stated otherwise. Same-year ordering uses CCF 2026 seventh-edition A, B, C, then unmarked; an unmarked entry is not necessarily absent from CCF.

## LLM, recent and journal gap batch

This batch includes LocLLM and KptLLM with targeted source-text checks; related KptLLM++ is an extension, not a distinct research lineage. Further additions include 19 CVPR/ICCV 2025 papers and 13 journal plus two conference records. Most are abstract-level readings and not independently reproduced. For LocLLM/KptLLM architecture figures, the arXiv non-exclusive distribution licence does not establish third-party republication rights, so the site links to the original figures rather than embedding them. See the figure manifest.

The concurrent publication-metadata corrections, five additional records, and deeper body analyses through c1a308d were preserved on merge. Three newly added abstract-level entries also received explicitly labeled editorial applicability notes. Existing deeper author-reported limitations take precedence over the editorial notes in this pass.
