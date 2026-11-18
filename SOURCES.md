# Sources and curation notes

## Scheduled maintenance — 2026-11-19 (UTC+8)

Backfilled WinDEX ([v1](https://arxiv.org/html/2611.21143v1)) and MetricHand ([v1](https://arxiv.org/html/2611.21060v1)), both submitted 16 November, not newly published since the preceding check. Verified authors, submission/version, targeted method sections, evaluation protocols and limitations. Both remain arXiv preprints without CCF ratings. Do not compare WinDEX’s aligned W-MPJPE directly with MetricHand’s unaligned ABS-W-MPJPE. Author project pages were inaccessible during this pass; no code/data-release claim or copied figure was added.

Searched arXiv, IEEE TPAMI/TIP and CVF/ECVA/NeurIPS sources; this pass did not establish a relevant publication newer than the preceding successful check. Search coverage is non-exhaustive.

## Hand representation and reconstruction batch — 2026-11-18

Added 29 module-level readings spanning RGB-to-3D hands, V2V-PoseNet, Hand PointNet, latent 2.5D regression, dense depth regression, FreiHAND, Graph CNN reconstruction, MANO-based reconstruction in the wild, HOnnotate, YouTube mesh reconstruction, DetNet/IKNet, HandFoldingNet, I2UV-HandNet, Mesh Graphormer, METRO, CMR, HandOccNet, MobRecon, multi-view depth self-supervision, Handy, Deformer, THOR-Net, dense mutual hand-object attention, HMP, multiview bootstrapping, DeepPrior++, InterHand2.6M, MediaPipe Hands and EvHandPose. Exact versions, method sections or official PDF pages and original figure locations are recorded in `scripts/curation-2026-11-18-batch4.json` and individual page sources.

Official PDF method diagrams were rendered and visually checked to verify figure/page selection. The corresponding diagrams remain links when republication permission is unclear. For Handy, the reviewed model-construction section does not provide a complete network overview: PCA shape and texture results are not relabeled as architecture diagrams. CMR and MobRecon each have two unmodified original diagrams with explicit CC BY-NC-ND 4.0 / CC BY-NC-SA 4.0 notices in their exact arXiv HTML versions; image hashes and attribution are in the figure manifest.

The notes separate relative/normalized from metric geometry, hand model building from image inference, multi-view label generation from single-view deployment, and feed-forward prediction from test-time optimization. In particular, dense hand-object mutual attention assumes object CAD and wrist depth; HMP's main setting assumes a static camera; the MediaPipe page follows the 2020 paper rather than current software behavior. METRO and Mesh Graphormer use body examples in their general architecture figures, so body-specific vertex counts are not copied into hand configurations. These are targeted method readings, not independent reproductions or complete experimental audits.

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

## Human pipeline expansion — 2026-11-18, batch 5

29 existing Human records received individually written module-level pipelines, separate training/inference notes, and original-figure reading guides. The exact source versions and inspected sections/pages are recorded in `scripts/curation-2026-11-18-batch5.json`; these are targeted method readings, not claims of complete paper reviews or independent reproduction.

Coverage includes probabilistic and dynamically routed 2D pose, camera-aware and egocentric pose, classic heatmap/coordinate methods, video lifting, SMPL fitting and regression, and expressive whole-body reconstruction. The COCO-WholeBody entry describes the ECCV 2020 ZoomNet baseline, not the later ZoomNAS paper. HMR 2.0 single-frame reconstruction is distinguished from the 4DHumans tracking system; SMPL-X is distinguished from SMPLify-X fitting; training-only optimizers and discriminators are identified explicitly.

Four unchanged original assets were added for MotionBERT, 4DHumans and SMPLer-X, with version-specific CC license evidence, authors, source anchors and hashes in the figure manifest. The SMPLer-X SVG has no scripts, event handlers, foreign objects or external references. Other pages retain original links when no republication license was established. ProbPose's CC-licensed window illustration is linked and explicitly identified as a representation diagram; a complete architecture figure was not located for SMPL-X/SMPLify-X, so its method section is linked without presenting qualitative results as architecture. No replacement diagrams were drawn.

## Head/face pipeline expansion — 2026-11-18, batch 6

24 existing records received individual method pipelines, training/inference separation, and original-figure or algorithm reading guides. Exact inspected versions and sections/pages are in `scripts/curation-2026-11-18-batch6.json`. Coverage spans SDM, ERT, LBF, generative and dictionary-based fitting, 3DDFA, FSA-Net, img2pose, HIH, TokenHPE, depth/scan-based landmarking, joint AU/landmark inference, unsupervised discovery and relative pose methods. Classical algorithms are described in their own terms rather than presented as invented neural networks. These remain targeted method readings, not full-paper reviews or independent reproductions.

Three unchanged STAG-Net originals were added: its overall landmark pipeline, system architecture and per-group DeepSet module. The exact arXiv version declares CC BY 4.0; attribution, source anchors, dimensions and hashes are in the manifest. The SVG files contain no scripts, event handlers, foreign objects or external references. Other newly expanded records retain original source links without copying images under unclear licenses. Where a complete structure figure was not located, the source algorithm is linked and the limitation is stated; qualitative outputs and feature-weight visualizations are not mislabeled as network diagrams.

Author README files and public implementation directories were checked for STAG-Net, ReVA-HPE and VGGT-HPE, adding three implementation links and the corresponding leading code badges. No implementation was run. STAG-Net's README explicitly says that Protocol I uses the complete selected target dataset for checkpoint selection, so its resulting MAE is not an independent test estimate; this release-specific caveat is recorded. ReVA-HPE's arXiv v1 description of optimizing only LoRA differs from the current README's additional camera-head finetuning description; both source scopes are identified rather than silently mixed. Existing publication metadata was preserved.

## Hand pipeline expansion — 2026-11-18, batch 7

24 existing Hand entries received individually written five-step pipelines, training/inference notes, original-figure guides and versioned method-section or PDF-page anchors. The reading ledger is `scripts/curation-2026-11-18-batch7.json`. These are targeted method readings, not complete paper reviews or independent reproductions. Coverage includes depth forests and recurrent point-cloud refinement, hand-body and multiview models, visibility-only estimation, gesture pretraining, hand/object neural fields and diffusion priors, RF sensing, and interacting-hand reconstruction.

MANO is described as a learned geometric model and scan-fitting system, PHRIT as skeleton-conditioned surface representation, FPHAB as a capture/annotation benchmark, and RenderIH as a data-generation pipeline with a separate TransHand baseline. The 2022 MANO arXiv upload does not change its original 2017 publication year. Method conditions are explicit: REACH chest cameras serve annotation, HaMuCo transfers multiview training to single-view inference, the binocular method requires stereo calibration, and Intershape's reported setup uses annotated crops and true bone lengths to restore scale. Iteration over one image is distinguished from temporal recurrence.

Four unchanged original assets were added for three papers: REACH Figure 4 (CC BY-NC-SA 4.0), Hand Visibility Detector Figure 2 (CC BY-SA 4.0), and Gesture-aware Hand Figures 1 and 3 (CC BY 4.0). Each version's arXiv HTML declares its license; source anchors, authors, license links, original URLs, dimensions and checksums are recorded in the manifest. The original licenses continue to apply to these assets. Other pages link original figures without copying them when republication rights remain unclear. No replacement diagrams were drawn.

Author-linked repositories and their README/implementation directories were checked for DIR, OCHID-Fi, HO-NeRF and Intershape; four code links were added. Intershape's original repository is a v0 inference release and points to a newer v1.0 train/test repository; the pipeline here follows the ICCV 2021 paper rather than silently substituting the newer implementation's results. No code or pretrained model was executed.

## Human pipeline expansion — 2026-11-18, batch 8

24 existing Human entries received individual five-step pipelines, separate training/inference descriptions, original-figure guides and official PDF page anchors. The inspected source pages and figure positions are recorded in `scripts/curation-2026-11-18-batch8.json`. The scope is targeted method reading rather than complete paper review or independent reproduction. Publication metadata and existing deeper notes are preserved.

The batch covers BMP, TCMR, TesseTrack, SWAHR, PlaneSweepPose, Mirrored-Human, ContextPose, PoseAug, integrated top-down/bottom-up estimation, SimPoE, BOA, Graph Stacked Hourglass, HUND, CanonPose, FCPose, Ray3D, OCHMR, PETR, ElePose, MHFormer, GLAMR, CID, DRM and generalizable triangulation. Training-only augmentation, discriminators and auxiliary heatmaps are separated from deployment. BOA's source-data replay and test-time weight updates, Ray3D's calibration requirements, TCMR/GLAMR's future context, and SimPoE's simulator and residual forces are stated explicitly. HUND uses GHUM; internal MHFormer hypotheses are features rather than multiple independently selected final poses.

Seven original method assets were added for FCPose, Mirrored-Human, OCHMR, Ray3D and SWAHR. Exact arXiv versions declare CC BY 4.0 or CC BY-NC-SA 4.0; authors, source anchors, original asset URLs, dimensions, licenses and hashes are in the manifest. Six assets are unchanged. Mirrored-Human's author-drawn geometric constraint image had excessive blank margins and a page number, which were cropped without changing its diagram or labels; both original and output hashes and the modification are recorded. Its overview contains Internet photographs whose rights are limited according to the author project, so the overview remains linked. Other unclear-license figures remain linked. No diagrams were redrawn.

Eleven implementation links were checked against author-linked projects, README titles and public source directories. Mirrored-Human's project points to EasyMocap; the actual mirror demo/optimization entry was checked there. The integrated dual-network repository now foregrounds its TPAMI 2022 extension; this page follows the CVPR 2021 method. AdelaiDet's FCPose README identifies its release as a reimplementation with different measured results and timing conditions; no values were substituted into the paper description. No implementation or pretrained model was run.

## Head and face pipeline expansion — 2026-11-18, batch 9

24 existing Head entries received individually written five-step pipelines, separate training/inference descriptions and original-figure reading guides. Official CVF PDFs were read at the method pages recorded in `scripts/curation-2026-11-18-batch9.json`; these are targeted readings, not full experimental reviews or independent reproductions. Catalog publication metadata was retained.

Coverage includes de-corrupt autoencoders, MDM, dense 3DMM CNN fitting, two-stage reinitialization, joint visibility/pose/deformation, part mixtures, FEGA-MTL, shape-space pruning, exemplar graph matching, RCPR, random projection forests, depth-based model registration, visibility-pattern cascades, PIFA, heterogeneous-annotation regression, RTSM, PIEFA, recurrent 3D–2D refinement, differentiable visualization layers, binary landmark networks, consensus alignment/tracking, SLPT, GlomFace and DSFNet. Iteration within one image is distinguished from video recurrence. Classical part models, forests and numerical fitting are described as such. Online optimization and adaptation remain explicit parts of EGM, PIEFA and depth registration inference. Source-derived model parameters are distinguished from measured 3D truth.

The earlier random-projection forest note incorrectly restricted the paper to classification; the detailed source also describes continuous estimation, and the input/output and limitation notes were corrected. The depth-registration note now distinguishes algorithm initialization and a prebuilt 3D shape prior from requiring a user-specific reference capture. DSFNet's fused dense geometry is distinguished from simply averaging the auxiliary 3DMM parameters.

All 24 original figures remain linked at their actual PDF pages. Component-only illustrations are identified as such (e.g. depth head localization and RTSM point sets), with the complete algorithm explained from the method text. Five checked arXiv versions—binary localizers v2, joint visibility/pose/deformation v1, single-CNN PIFA v1, SLPT v1 and DSFNet v1—declare arXiv's nonexclusive distribution license. This does not establish permission for this site to republish the images. No new figure copies or substitute drawings were added; code repository licensing was not treated as a license for the paper figures.

Three implementation links were added: author MDM, SLPT and the binary face-alignment demo. Existing GlomFace and DSFNet links were also checked against author-supplied URLs, READMEs and source listings. MDM's README notes differences in data augmentation from the paper and restricted pretrained-model use; the binary release is a Torch7 demo and points separately to a later PyTorch training repository. Neither is presented as a verified reproduction. EGM's linked Helen annotation visualization package was not counted as the EGM algorithm implementation. No implementation or pretrained model was executed.

## Hand pipeline expansion — 2026-11-18, batch 10

24 existing Hand entries received individual five-step pipelines, training/inference descriptions, original-figure or algorithm guides and official PDF page anchors. The ledger is `scripts/curation-2026-11-18-batch10.json`. Official method pages were read directly, with training details or preprocessing sections included where needed. These are targeted method readings, not complete experimental reviews or independent reproductions.

The batch covers the 2015 depth benchmark and its volumetric-exemplar baseline; weak GAN/mesh domain adaptation; HOPE-Net; disentangled cross-modal latents; DGGAN; rotation-mixture graphical networks; disentangled VAE hands; H+O; training by fitting; CrossInfoNet; dense neural-rendering estimation; HandMap; HBE; point-to-point PointNet; weak RGB pose learning; hierarchical mixture densities; Crossing Nets; volumetric 3D CNNs; single-depth multiview projection; DeepHand; SIP forests; evolutionary Sobol search; HOISDF; and SimpleHand. The survey is organized as a data/evaluation workflow and actual baseline, and Sobol tracking as numerical search rather than an invented neural architecture.

Important distinctions are explicit: virtual multiview projections come from one depth image; HandMap and HBE use provided/label-based hand crops in their reported setup; real weak RGB training still uses 2D labels and depth supervision; HMDN models per-joint distributions rather than guaranteed valid whole-hand samples; and DeepHand includes retrieval, temporal neighbors and, for some ROI settings, a colored wristband. Neural-rendering DHPE and weak-GAN adaptation retain their actual test-time parameter optimization. Training-by-fitting instead optimizes shared network weights and uses a forward pass at inference. H+O's temporal module recognizes interactions rather than directly refining every frame's pose.

SimpleHand Figures 4 and 3 were added as unchanged original PNGs from arXiv:2403.01813v1, whose version-specific license is CC BY 4.0. Authors follow that paper version's byline; source anchors, license evidence, dimensions and checksums are recorded in the asset manifest. The current repository README has a different author list and 200-epoch release examples, while the inspected CVF/v1 method describes 100 epochs; the description and image attribution retain their own source scope. Four other checked arXiv versions (Crossing Nets, HMDN, disentangled VAE hands and HOISDF) use arXiv's nonexclusive distribution license, so their figures remain linked. All other unclear-license figures remain linked as well. No replacement diagrams were drawn.

Four code links were added after inspecting corresponding READMEs and public implementation files: author HOPE-Net, CrossInfoNet and SimpleHand, plus an explicitly labeled third-party point-to-point PointNet implementation. The latter has two-stage PointNet and training files but is not claimed to include all original fallback/PCA processing or reproduce reported numbers. The existing official HOISDF link was rechecked. The weak-GAN author's linked repository currently contains only a README promising future release; it is documented as a placeholder and receives no code badge. No implementation or pretrained model was executed.
# 2026-11-18：第 11 批人体方法详情

本批补充 24 篇人体姿态/网格方法的五步流程、训练、推理与原图阅读说明，定向正文页码或 arXiv 版本章节逐条记录在 `scripts/curation-2026-11-18-batch11.json`。覆盖 MPS-Net、LitePose、PoseTriplet、GFPose、STCFormer、GLoT、OSX、PSVT、NIKI、PCT、HuManiFlow、DeFormer、POTTER、DPMesh、AiOS、FinePOSE、TokenHMR、HoT、KTPFormer、RMPE、Modulated GCN、Normalizing Flows、RLE、PyMAF。未运行模型或重做实验。

- 新增 11 个经过作者 README 与实现目录/入口核对的代码链接；红色 `code` 入口和 README 前缀与数据一致。STCFormer 未公开的 243 帧权重、TokenHMR 的论文/发布版本、RMPE 与后续 AlphaPose、PyMAF 与 PyMAF-X 均作区分。
- LitePose（2205.01271v1，CC BY-NC-SA 4.0）、OSX（2303.16160v1）、AiOS（2403.17934v1）和 Normalizing Flows 姿态方法（2107.13788v1，后三者 CC BY 4.0）各收录一张未修改的论文原图。原图文件、版本、作者、许可证据及 SHA-256 见 `assets/figures/manifest.json` 与同目录 README。
- 其余 20 篇仅保留原文结构图链接，不复制许可不明确的图像，不重绘。明确区分 PoseTriplet 的训练双循环、PSVT 的视频解码、RLE 仅训练使用的 flow、FinePOSE 的动作类别提示及重投影聚合、多假设评测中依赖真值的最佳样本指标。

## 2026-11-18：第 12 批 CVPR 与 ICCV 2025 方法详情

本批补充 19 篇已有论文的五步流程、训练、推理及原图阅读说明。`scripts/curation-2026-11-18-batch12.json` 记录各篇定向通读的官方正文页码或作者预印本版本章节。EgoPressure 区分多视角标注与单目评测，合成域差距研究逐项说明受控实验，PoseSyn 区分离线数据合成与在线估计。PoseAnchor 以投影公式和 Algorithm 2 为主，详情页直接链接算法页。

- 7 篇论文收录 9 张原图。HiPART、PromptHMR、UniHOPE、MaskHand、Dyn-HaMR、GLSMamba 和 Fish2Mesh 的版本、作者、图号、授权依据和源文件校验值见 `assets/figures/manifest.json`。12 篇保留原文图或算法链接。Fish2Mesh 原图作者署名以 arXiv v1 署名为准。
- 新增 10 个红色 `code` 入口。EgoPressure 指向作者团队的数据工具包，Fish2Mesh 指向团队实现，LDPose 指向注明来源的第三方推理实现。MV-SSM 当前公开仓库仅提供说明和示例。核对范围为项目说明和公开文件，未运行实现或复现实验。

## 2026-11-18：第 13 批手部、头部与人体方法详情

本批补充 19 篇现有论文的方法流程、训练、推理与原图导读。阅读范围记录在 `scripts/curation-2026-11-18-batch13.json`。HandBooster 和 T-FAKE 的数据合成与下游预测分开说明，HOLD 与 G-HOP 的每视频优化保留各自的初始化和监督。ORFormer 的热图码本预训练、推理时的软遮挡权重和下游人脸定位分别对应原文模块。

- 9 篇论文收录 11 张未经修改的原图，另有 10 篇保留原图链接。全部图号、版本、许可依据和源文件散列值可在图像清单中核对。结构化热图回归收录原文的标签平滑图，网络与训练目标另在正文解释。
- 新增 9 个经 README 与实现入口核对的代码链接。其中 MS-MANO 按钮直达作者 Dynamics 实现，项目页另列 Unity 演示。代码和权重未经运行验证。

## 2026-11-18：第 14 批 2021–2023 年手部方法详情

本批补充 27 篇现有论文，覆盖手网格重建、视频时序、事件输入、手物姿态、数据集构建和跨域学习。各篇方法章节或会议 PDF 页码见 `scripts/curation-2026-11-18-batch14.json`。ARCTIC 采用含 ArcticNet 和 InterField 两项任务的 arXiv v3，AssemblyHands 区分外部相机标注与头戴相机单图基线，H2ONet 区分逐指网格融合和整手朝向估计。

- 9 篇收录 12 张未经修改的作者原图。18 篇保留原文链接。各图的作者、版本、许可依据和校验值见图像清单。
- 新增 14 个经项目说明和源码目录核对的代码链接。AssemblyHands 和 OakInk 链接数据集工具，PeCLR 主要提供预训练实现。作者的 MOW 仓库记录为关联数据与可视化资源。代码与权重未经运行验证。
