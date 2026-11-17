# Awesome Xpose Estimation

A curated starting point for 2D/3D head, hand, and human pose estimation research, covering 2024–2026. This is a selective index, not an exhaustive survey. Publication and preprint dates may differ; consult each source for authoritative metadata.

## Browse the site

Serve the repository root using any static HTTP server, for example `python -m http.server 8000`. Filter by subject, dimensionality, venue, year, and publication status.

## Papers

### Head

- **[FaceLift: Semi-supervised 3D Facial Landmark Localization](https://openaccess.thecvf.com/content/CVPR2024/html/Ferman_FaceLift_Semi-supervised_3D_Facial_Landmark_Localization_CVPR_2024_paper.html)** — CVPR 2024 · Published · 3D. 以半监督学习定位 3D 人脸关键点，关注人工定义与 3DMM 注册标注的一致性。
- **[6DoF Head Pose Estimation through Explicit Bidirectional Interaction with Face Geometry](https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/4824_ECCV_2024_paper.php)** — ECCV 2024 · Published · 3D. 通过脸部几何与姿态的双向交互估计 6DoF 头姿，特别关注平移估计。 [Code](https://github.com/asw91666/TRG-Release)
- **[HeadDiff: Exploring Rotation Uncertainty With Diffusion Models for Head Pose Estimation](https://doi.org/10.1109/TIP.2024.3372457)** — IEEE TIP 2024 · Published · 3D. 采用概率扩散回归建模野外图像中的头部旋转不确定性。
- **[On the representation and methodology for wide and short range head pose estimation](https://www.sciencedirect.com/science/article/pii/S0031320324000141)** — Pattern Recognition 2024 · Published · 3D. 研究不同角度范围的头姿表示和评测，并提供基于 CMU Panoptic 的广角度基准。 [Code](https://github.com/pcr-upm/opal23_headpose)
- **[Infinite 3D Landmarks: Improving Continuous 2D Facial Landmark Detection](https://onlinelibrary.wiley.com/doi/10.1111/cgf.15126)** — Computer Graphics Forum 2024 · Published · 2D / 3D. 借助 3D 几何改进连续 2D 人脸关键点检测。
- **[Unsupervised Discovery of Facial Landmarks and Head Pose](https://openaccess.thecvf.com/content/CVPR2025/html/Tourani_Unsupervised_Discovery_of_Facial_Landmarks_and_Head_Pose_CVPR_2025_paper.html)** — CVPR 2025 · Published · 2D / 3D. 使用 Stable Diffusion 特征联合发现人脸关键点与头姿，通过几何约束相互优化。 [Code](https://github.com/touranisatyajit/cvpr2025-uld-headpose)
- **[FaceXFormer: A Unified Transformer for Facial Analysis](https://openaccess.thecvf.com/content/ICCV2025/html/Narayan_FaceXFormer_A_Unified_Transformer_for_Facial_Analysis_ICCV_2025_paper.html)** — ICCV 2025 · Published · 2D / 3D. 统一人脸分析 Transformer，覆盖关键点、头姿、人脸解析及属性等多任务。
- **[Towards unsupervised learning of joint facial landmark detection and head pose estimation](https://www.sciencedirect.com/science/article/pii/S0031320325000536)** — Pattern Recognition 2025 · Published · 2D / 3D. 通过可学习的标准姿态 3D 关键点与图像重建联合学习关键点和刚体头姿。
- **[Semi-Supervised Unconstrained Head Pose Estimation in the Wild](https://arxiv.org/abs/2404.02544)** — arXiv; author reports TPAMI publication 2024 · Preprint · 3D. 利用未标注野外头部图像进行半监督全范围旋转估计。按 arXiv 首发年收录；期刊正式卷期尚待出版社核验。 [Code](https://github.com/hnuzhy/SemiUHPE)
- **[VGGT-HPE: Reframing Head Pose Estimation as Relative Pose Prediction](https://arxiv.org/abs/2604.10106)** — CVPR Workshops (author-reported) 2026 · Published · 3D. 将绝对头姿回归改写为相对于已知姿态参考图像的几何变换预测；以合成数据微调几何基础模型。
- **[ReVA-HPE: Relative 6DoF Head Pose Estimation with Synthetic Pose Supervision and Personalized Virtual Anchors](https://arxiv.org/abs/2611.03283)** — arXiv; accepted WACV 2027 (author-reported) 2026 · Preprint · 3D. 利用个性化虚拟参考图像进行相对 6DoF 估计，减少对真实参考图像已知姿态的依赖。
- **[STAG-Net: Structure-Aware Attention over Landmark Groups for Lightweight Head Pose Estimation](https://arxiv.org/abs/2611.07828)** — arXiv 2026 · Preprint · 3D. 基于关键点分组和结构注意力进行轻量头姿回归，面向低计算成本部署。

### Hand

- **[Reconstructing Hands in 3D with Transformers](https://openaccess.thecvf.com/content/CVPR2024/html/Pavlakos_Reconstructing_Hands_in_3D_with_Transformers_CVPR_2024_paper.html)** — CVPR 2024 · Published · 3D. 扩展数据和 Vision Transformer 规模实现单目手部网格恢复；HInt 提供野外 2D 关键点评测。
- **[HandDiff: 3D Hand Pose Estimation with Diffusion on Image-Point Cloud](https://openaccess.thecvf.com/content/CVPR2024/html/Cheng_HandDiff_3D_Hand_Pose_Estimation_with_Diffusion_on_Image-Point_Cloud_CVPR_2024_paper.html)** — CVPR 2024 · Published · 3D. 在图像点云条件下迭代去噪，结合逐关节与局部细节条件定位手关节。 [Code](https://github.com/cwc1260/HandDiff)
- **[EvHandPose: Event-Based 3D Hand Pose Estimation With Sparse Supervision](https://arxiv.org/abs/2303.02862)** — TPAMI 2024 · Published · 3D. 事件相机手部流表示与稀疏监督，面向快速运动和高动态范围；arXiv 初稿发表于 2023 年。 [Code](https://github.com/AlanJiang98/EvHandPose)
- **[WiLoR: End-to-end 3D Hand Localization and Reconstruction in-the-wild](https://openaccess.thecvf.com/content/CVPR2025/papers/Potamias_WiLoR_End-to-end_3D_Hand_Localization_and_Reconstruction_in-the-wild_CVPR_2025_paper.pdf)** — CVPR 2025 · Published · 3D. 整合实时手部定位和 Transformer 重建，面向野外多手场景；arXiv 首发于 2024 年。
- **[HandOS: 3D Hand Reconstruction in One Stage](https://openaccess.thecvf.com/content/CVPR2025/html/Chen_HandOS_3D_Hand_Reconstruction_in_One_Stage_CVPR_2025_paper.html)** — CVPR 2025 · Published · 2D / 3D. 一阶段整合检测、2D 关键点和 3D 网格，采用交互式 2D–3D 解码器。
- **[HaWoR: World-Space Hand Motion Reconstruction from Egocentric Videos](https://openaccess.thecvf.com/content/CVPR2025/papers/Zhang_HaWoR_World-Space_Hand_Motion_Reconstruction_from_Egocentric_Videos_CVPR_2025_paper.pdf)** — CVPR 2025 · Published · 3D. 分解相机空间手运动与世界空间相机轨迹，并补全手部移出视野的运动。
- **[Diffusion-based 3D Hand Motion Recovery with Intuitive Physics](https://openaccess.thecvf.com/content/ICCV2025/html/Zhang_Diffusion-based_3D_Hand_Motion_Recovery_with_Intuitive_Physics_ICCV_2025_paper.html)** — ICCV 2025 · Published · 3D. 使用扩散与物理约束细化逐帧手部重建，提高交互场景下的时序一致性。
- **[3D Hand Pose Estimation via Articulated Anchor-to-Joint 3D Local Regressors](https://doi.org/10.1109/TPAMI.2025.3609907)** — TPAMI 2026 · Published · 3D. 采用 articulated anchors 与局部回归，覆盖 RGB 和深度输入。2025-09-16 在线发表，2026 年卷期。 [Code](https://github.com/ChanglongJiangGit/A2J-Transformer-Plus)
- **[REACH: Hand Pose Estimation from Room Corners](https://arxiv.org/abs/2605.22231)** — arXiv 2026 · Preprint · 3D. 结合手身协调、时序和多视角观测，从房间角落相机估计远处低分辨率手部；正式接收状态未核实。
- **[KAD-Net: Kinematics-Aware Decoupled Learning for Robust 3D Hand Pose Estimation from a Single Depth Image](https://arxiv.org/abs/2609.12559)** — arXiv 2026 · Preprint · 3D. 用手指拓扑约束增强遮挡关节，并解耦 UV 定位与深度回归；正式接收状态未核实。
- **[Hand Visibility Detector: Per-Keypoint Visibility Estimation for Hands](https://arxiv.org/abs/2608.11574)** — arXiv 2026 · Preprint · 2D / 3D. 估计 2D 手关键点可见性，并辅助多视角 3D 三角化；属于辅助任务，而非独立 3D 重建器。
- **[Gesture-Aware Pretraining and Token Fusion for 3D Hand Pose Estimation](https://arxiv.org/abs/2603.17396)** — arXiv 2026 · Preprint · 3D. 手势标签预训练结合逐关节 token Transformer 回归 MANO 参数，在 InterHand2.6M 评测。

### Human

- **[RTMO: Towards High-Performance One-Stage Real-Time Multi-Person Pose Estimation](https://openaccess.thecvf.com/content/CVPR2024/html/Lu_RTMO_Towards_High-Performance_One-Stage_Real-Time_Multi-Person_Pose_Estimation_CVPR_2024_paper.html)** — CVPR 2024 · Published · 2D. 单阶段实时多人关键点估计，关注精度与部署效率。
- **[Sapiens: Foundation for Human Vision Models](https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/529_ECCV_2024_paper.php)** — ECCV 2024 · Published · 2D. 人体视觉基础模型，覆盖高分辨率 2D 姿态、分割、深度和法线。 [Code](https://github.com/facebookresearch/sapiens)
- **[RTMW: Real-Time Multi-Person 2D and 3D Whole-body Pose Estimation](https://arxiv.org/abs/2407.08634)** — arXiv 2024 · Preprint · 2D / 3D. 同时覆盖身体、手、面部和脚的实时全身关键点估计。 [Code](https://github.com/open-mmlab/mmpose/tree/main/projects/rtmpose)
- **[MotionAGFormer: Enhancing 3D Human Pose Estimation With a Transformer-GCNFormer Network](https://openaccess.thecvf.com/content/WACV2024/html/Mehraban_MotionAGFormer_Enhancing_3D_Human_Pose_Estimation_With_a_Transformer-GCNFormer_Network_WACV_2024_paper.html)** — WACV 2024 · Published · 3D. 结合 Transformer 与图结构建模的视频 2D-to-3D lifting 方法。 [Code](https://github.com/TaatiTeam/MotionAGFormer)
- **[WHAM: Reconstructing World-grounded Humans with Accurate 3D Motion](https://openaccess.thecvf.com/content/CVPR2024/html/Shin_WHAM_Reconstructing_World-grounded_Humans_with_Accurate_3D_Motion_CVPR_2024_paper.html)** — CVPR 2024 · Published · 3D. 从单目视频恢复世界坐标系中的人体运动与网格。
- **[World-Grounded Human Motion Recovery via Gravity-View Coordinates](https://zju3dv.github.io/gvhmr/)** — SIGGRAPH Asia 2024 · Published · 3D. 利用重力与相机视角定义坐标系，减少全局人体运动恢复的累积误差。 [Code](https://github.com/zju3dv/GVHMR)
- **[ProbPose: A Probabilistic Approach to 2D Human Pose Estimation](https://openaccess.thecvf.com/content/CVPR2025/html/Purkrabek_ProbPose_A_Probabilistic_Approach_to_2D_Human_Pose_Estimation_CVPR_2025_paper.html)** — CVPR 2025 · Published · 2D. 概率化关键点表示，关注位置不确定性及图像外关键点。
- **[DynPose: Largely Improving the Efficiency of Human Pose Estimation by a Simple Dynamic Framework](https://openaccess.thecvf.com/content/CVPR2025/html/Xu_DynPose_Largely_Improving_the_Efficiency_of_Human_Pose_Estimation_by_CVPR_2025_paper.html)** — CVPR 2025 · Published · 2D. 通过动态计算框架提升人体姿态估计效率。
- **[PersPose: 3D Human Pose Estimation with Perspective Encoding and Perspective Rotation](https://openaccess.thecvf.com/content/ICCV2025/html/Hao_PersPose_3D_Human_Pose_Estimation_with_Perspective_Encoding_and_Perspective_ICCV_2025_paper.html)** — ICCV 2025 · Published · 3D. 显式处理透视与图像裁剪引入的几何变化。
- **[SMPLest-X: Ultimate Scaling for Expressive Human Pose and Shape Estimation](https://doi.org/10.1109/TPAMI.2025.3618174)** — TPAMI 2026 · Published · 3D. 大规模全身姿态与形状估计，覆盖身体、手与面部；2025 年接收，正式卷期为 2026 年 48(2)。 [Code](https://github.com/MotrixLab/SMPLest-X)
- **[Egocentric Visibility-Aware Human Pose Estimation](https://openaccess.thecvf.com/content/CVPR2026/html/Dai_Egocentric_Visibility-Aware_Human_Pose_Estimation_CVPR_2026_paper.html)** — CVPR 2026 · Published · 3D. 第一人称视角下考虑可见性的人体姿态估计。
- **[MetricPose: Flexible 3D Human Pose Estimation with Depth and Geometric Cues](https://arxiv.org/abs/2611.08954)** — arXiv 2026 · Preprint · 3D. 融合 RGB 先验、可选深度与环境几何，预测相机坐标系中有尺度的关节位置；2026-11-06 发布，ICRA 投稿，未核实接收。

## Contributing

Please propose additions with a primary paper link, correct venue and publication year, task/output tags, and code link when available. Distinguish preprints from peer-reviewed publications and workshops from main conferences.
