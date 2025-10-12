🧩 CodeVerse – 任務拆解文件（Tasks）

對應版本：

✅ 1. Specify（規格階段 – MVP 版）

✅ 2. Plan（技術計畫階段）

📄 本文件為 3. Tasks（任務拆解階段）

1. 開發原則

架構目標：

僅使用前端（React + Three.js）構建 MVP。

所有資料來自本地 JSON（可選 Firebase 整合）。

可於桌機、平板、手機上流暢瀏覽（RWD）。

任務分類原則：

任務皆對應 Plan 文件模組。

每項任務包含：

🔧 模組 / 範疇

🎯 任務目標

🪜 子任務（具體工作步驟）

⏱ 預估工期

📶 優先順序（High / Medium / Low）

2. 任務分類總覽
類別	模組名稱	任務數	優先層級
1️⃣ 基礎環境設定	環境、框架、架構初建	5	High
2️⃣ 世界地圖模組	WorldMap + Camera 控制	5	High
3️⃣ 懸浮卡片模組	ApplicationCard	5	High
4️⃣ 詳情面板模組	InfoPanel	4	High
5️⃣ 導覽介面模組	Navigator	4	Medium
6️⃣ 音效與氛圍模組	Atmosphere	3	Medium
7️⃣ 資料驅動模組	DataLoader (JSON / Firebase)	4	High
8️⃣ Theme 與 RWD	視覺主題 + 響應式設計	3	High
9️⃣ 效能與測試	效能優化與瀏覽器測試	3	Medium
🔟 部署與驗證	打包、測試、上線	3	High
3. 任務明細
🧱 1️⃣ 基礎環境設定

目標：
建立 React + TypeScript + Vite 環境，整合 Tailwind 與 Three.js。

子任務	說明	預估工期	優先
1.1 初始化專案	使用 Vite + React + TS 建立專案骨架	0.5 天	High
1.2 安裝主要套件	three, @react-three/fiber, zustand, tailwind, framer-motion, howler	0.5 天	High
1.3 設定 Tailwind	tailwind.config.js + global.css	0.5 天	High
1.4 建立資料夾結構	src/components, src/store, src/data, src/theme	0.5 天	High
1.5 建立 App 入口與基本路由	App.tsx + main.tsx	0.5 天	High
🌍 2️⃣ 世界地圖模組（WorldMap）

目標：
使用 Three.js / React Three Fiber 建立 3D 世界場景與基本移動控制。

子任務	說明	工期	優先
2.1 初始化 Three.js Scene	設定相機、光源、地面、天空	1 天	High
2.2 加入 OrbitControls	滑鼠旋轉與縮放控制	0.5 天	High
2.3 加入 WASD 鍵盤移動	玩家在世界中自由行走	0.5 天	High
2.4 光影調整	Ambient + DirectionalLight，模擬日夜氛圍	0.5 天	Medium
2.5 效能最佳化	使用 useMemo 快取場景、降低 render 次數	0.5 天	Medium
🪄 3️⃣ 懸浮卡片模組（ApplicationCard）

目標：
在地圖中生成卡片，顯示作品資訊與互動效果。

子任務	說明	工期	優先
3.1 建立卡片元件	使用 PlaneGeometry + texture	1 天	High
3.2 載入封面圖片	從 apps.json 取得 icon URL	0.5 天	High
3.3 距離顯示控制	距離 < 10 才顯示卡片內容	0.5 天	Medium
3.4 Hover 動畫效果	Framer Motion hover scale / glow	0.5 天	Medium
3.5 點擊事件	開啟 InfoPanel（透過 Zustand 狀態）	0.5 天	High
🧾 4️⃣ 詳情面板模組（InfoPanel）

目標：
展示應用程式完整內容（圖片、標籤、描述、連結）。

子任務	說明	工期	優先
4.1 設計面板 UI 結構	React + Tailwind + Framer Motion 動畫	1 天	High
4.2 顯示作品詳細資料	由 Zustand 選取的 AppItem 提供資料	0.5 天	High
4.3 關閉互動邏輯	ESC 或點擊背景關閉面板	0.5 天	High
4.4 RWD 顯示調整	手機全螢幕覆蓋、桌機右側滑出	0.5 天	High
🧭 5️⃣ 導覽介面模組（Navigator）

目標：
提供搜尋、篩選、快速跳轉與小地圖。

子任務	說明	工期	優先
5.1 導覽 UI 元件	上方浮動列 + Tailwind 樣式	0.5 天	Medium
5.2 搜尋功能	filter apps by keyword	0.5 天	Medium
5.3 篩選分類	根據 tags / 類別切換顯示卡片	0.5 天	Medium
5.4 Teleport 功能	點擊按鈕 → 攝影機移動至目標位置	0.5 天	Medium
🔊 6️⃣ 音效與氛圍模組（Atmosphere）

目標：
為場景與互動加入聲音與環境氛圍。

子任務	說明	工期	優先
6.1 設定 Howler 管理器	初始化背景音與點擊音效	0.5 天	Medium
6.2 加入音量 / 靜音控制	透過 Zustand 管理	0.5 天	Medium
6.3 音效播放觸發	進入作品範圍或互動時播放	0.5 天	Medium
📚 7️⃣ 資料驅動模組（DataLoader）

目標：
建立資料載入層，從 JSON 或 Firebase 載入作品資料。

子任務	說明	工期	優先
7.1 建立 apps.json 結構	依 Spec 文件格式建立樣本	0.5 天	High
7.2 建立 DataLoader	fetch('/data/apps.json')	0.5 天	High
7.3 建立型別 Interface	AppItem 與 Zustand 型別	0.5 天	High
7.4 Firebase 整合（可選）	初始化 Firestore 讀取 /apps 集合	0.5 天	Medium
🎨 8️⃣ Theme 與 RWD 設計

目標：
建立統一主題色彩與響應式版面，確保多裝置使用體驗一致。

子任務	說明	工期	優先
8.1 建立色彩系統	src/theme/colors.ts 定義主題色	0.5 天	High
8.2 Tailwind 自訂色系	tailwind.config.js 加入品牌色	0.5 天	High
8.3 RWD 響應設計	Mobile-first，平板/桌機適配	1 天	High
⚙️ 9️⃣ 效能與測試

目標：
確保載入速度與互動流暢度。

子任務	說明	工期	優先
9.1 Lazy Loading	延遲載入 JSON 與圖片	0.5 天	Medium
9.2 FPS 測試	控制渲染負載，維持 >30 FPS	0.5 天	Medium
9.3 跨裝置測試	Desktop / iPad / iPhone / Android	0.5 天	Medium
🚀 🔟 部署與驗證

目標：
將 CodeVerse 部署至雲端（如 Vercel 或 Cloudflare Pages）。

子任務	說明	工期	優先
10.1 打包與優化	使用 Vite build、壓縮資源	0.5 天	High
10.2 部署測試	上傳至 Vercel / Cloudflare Pages	0.5 天	High
10.3 體驗驗證	全功能手動測試 + 修正 UI Bug	1 天	High
4. 任務時程預估（Sprint 計畫）
週次	主要目標	預期產出
第 1 週	核心架構與世界地圖、資料載入	環境設定、WorldMap、DataLoader
第 2 週	UI 與互動整合	ApplicationCard、InfoPanel、Navigator、音效
第 3 週	Theme + RWD + 效能調整	Theme 設計、響應式調整、測試優化
第 4 週	打包與部署	Cloudflare/Vercel 上線測試版
5. 成果驗收條件（Acceptance Criteria）
模組	驗收條件
WorldMap	能自由移動、視角控制流暢、光影正常。
ApplicationCard	所有作品卡片正確生成且可互動。
InfoPanel	點擊卡片可開啟詳細資料並另開連結。
Navigator	搜尋 / 篩選 / Teleport 正常。
Atmosphere	背景音與互動音效可開關。
DataLoader	apps.json 讀取正常；Firebase 可選開啟。
RWD	手機、平板、桌機皆顯示良好。
效能	Page Load < 5 秒、FPS > 30。
部署	可穩定開啟並瀏覽所有作品。


