🪐 CodeVerse – Spec-Driven Development Document (MVP 版)
📘 文件結構

Specify（規格階段） – 產品定義與設計體驗

Plan（技術計畫階段） – 架構與技術設計

Tasks（任務拆解階段） – 可執行任務列表

1️⃣ Specify（規格階段）
1. 專案概述

專案名稱： CodeVerse
版本： MVP（最小可行產品）
性質： 互動式 3D 世界探索平台

核心理念：
讓使用者以「探索」的方式認識你的作品。
每個應用程式作品對應一個地點或領域，使用者能自由漫遊、閱讀卡片並開啟實際應用程式。

2. 專案目標
類別	內容
主要目標	建構沉浸式 3D 作品集世界。
次要目標	所有作品資料由 JSON 檔驅動。
可選功能	可使用 Firebase Firestore / Storage 儲存資料。
最終目標	建立可擴充、具敘事性與互動感的開發者宇宙入口。
3. 使用者角色
角色	目標	行為
探索者	瀏覽作品	漫遊世界、閱讀卡片、開啟連結
創作者（你）	展示與維護作品	透過 JSON 新增作品資料
潛在雇主/合作者	評估能力	互動式理解創作風格
4. 核心功能模組
4.1 WorldMap（世界地圖）

以 Three.js / React Three Fiber 建立 3D 場景。

玩家可移動與旋轉視角。

自動導覽模式與光影效果。

4.2 ApplicationCard（懸浮卡片）

顯示作品名稱、封面、技術標籤與連結按鈕。

距離偵測自動浮現。

4.3 InfoPanel（詳情面板）

顯示完整資訊與外部連結。

ESC 或背景點擊關閉。

4.4 Navigator（導覽介面）

提供搜尋、篩選、快速跳轉與小地圖。

4.5 Atmosphere（音效）

背景音、互動音與靜音控制。

4.6 Data Schema（資料驅動）

使用本地 apps.json，可選用 Firebase。

5. 系統架構圖
┌──────────────────────────────┐
│           CodeVerse          │
│──────────────────────────────│
│ React + Three.js + Zustand   │
│──────────────────────────────│
│ WorldMap │ AppCard │ InfoPanel │
│ Navigator │ Atmosphere │ DataLoader │
└──────────────────────────────┘

6. 使用技術棧
模組	技術
前端框架	React + TypeScript
3D 渲染	Three.js + React Three Fiber
狀態管理	Zustand
動畫	Framer Motion
樣式	Tailwind CSS
資料	apps.json / Firebase
音效	Howler.js
7. MVP 架構與限制
項目	MVP 狀態	後續擴充
資料來源	apps.json	Firebase / Strapi
登入	無	Firebase Auth
儲存	本地	Firebase Storage
後端	無	Node.js / Strapi
多人互動	無	WebSocket / WebRTC
8. 使用者流程
[開啟首頁]
→ 載入世界
→ 載入 apps.json
→ 顯示卡片
→ 點擊開啟 InfoPanel
→ 另開作品
→ 返回探索

9. 視覺與體驗設計（Theme）
元素	設計原則
主色	夜空藍 #1E2A38、霓光藍 #00C2FF、柔光金 #FFD166
輔色	青綠 #A1FFCE、銀灰 #C9D6E0
字體	Inter / Noto Sans TC
風格	Low-poly × Sci-fi × Ghibli
音效	柔和風聲、電子嗡鳴、微光粒子
10. 成功指標 (KPI)
指標	目標
Page Load	< 5 秒
FPS	> 30
平均停留時間	> 2 分鐘
互動作品點擊率	> 50%
2️⃣ Plan（技術計畫階段）
1. 架構總覽
React + TypeScript
│
├── React Three Fiber (Three.js)
│   ├── WorldMap Scene
│   ├── Lighting System
│   └── Raycaster
│
├── Zustand Store
│   ├── UI 狀態
│   └── Player 狀態
│
├── Tailwind + Framer Motion
├── DataLoader (JSON/Firebase)
└── Howler.js

2. 資料流
apps.json → DataLoader → Zustand Store
             ↳ WorldMap / Cards / InfoPanel

3. 主要技術設計
3.1 世界地圖

Scene：PlaneGeometry + Skybox

Controls：OrbitControls + WASD

光影：Ambient + Directional

效能：useMemo 快取模型。

3.2 懸浮卡片

使用 3D Plane + HTML overlay。

Hover 放大、點擊觸發 InfoPanel。

3.3 詳情面板

Framer Motion 動畫 + Tailwind。

RWD 模式：手機全螢幕、桌機右側滑出。

3.4 導覽介面

搜尋 / 篩選 / Teleport 功能。

小地圖以 Canvas Overlay 顯示。

3.5 音效

Howler.js 管理背景音與互動音。

透過 Zustand 控制靜音開關。

3.6 資料載入

fetch /data/apps.json。

若啟用 Firebase → getDocs(/apps)。

4. 響應式設計（RWD）

採 Mobile-first。

Tailwind 斷點：

sm 640px（手機）

md 768px（平板）

lg 1024px（桌機）

自動調整：

InfoPanel 全螢幕 / 側邊滑出

Navigator 摺疊

虛擬搖桿替代 WASD 控制。

5. 檔案結構
/codeverse
 ├── public/
 │   ├── cards/
 │   ├── sounds/
 │   └── data/apps.json
 ├── src/
 │   ├── components/
 │   │   ├── WorldMap.tsx
 │   │   ├── ApplicationCard.tsx
 │   │   ├── InfoPanel.tsx
 │   │   ├── Navigator.tsx
 │   │   └── Atmosphere.tsx
 │   ├── store/worldStore.ts
 │   ├── dataLoader.ts
 │   ├── theme/colors.ts
 │   └── main.tsx
 └── vite.config.ts

6. 效能策略
項目	策略
初始載入	Lazy load JSON
渲染控制	僅顯示距離 <10 的卡片
模型	low-poly 資源
音效	緩衝重用
動畫	layoutId 優化
部署	Vite + Cloudflare Pages / Vercel
7. 測試與安全
項目	策略
JSON 錯誤	顯示提示訊息
外部連結	_blank + noopener
Firebase	僅讀取權限
FPS	控制負載維持穩定
8. 開發週期
週次	階段	產出
1	世界地圖與資料載入	WorldMap + DataLoader
2	UI 互動整合	Cards + InfoPanel + Navigator
3	Theme + RWD	顏色、樣式、響應式
4	優化與部署	測試與上線
3️⃣ Tasks（任務拆解階段）
1. 類別總覽
模組	任務數	優先
環境設定	5	High
WorldMap	5	High
ApplicationCard	5	High
InfoPanel	4	High
Navigator	4	Medium
Atmosphere	3	Medium
DataLoader	4	High
Theme + RWD	3	High
效能測試	3	Medium
部署驗證	3	High
2. 任務明細（摘要）

環境設定

初始化 Vite + React + TS。

安裝依賴套件。

Tailwind 與檔案架構建立。

WorldMap

Scene + Light + Control。

移動與效能優化。

ApplicationCard

生成卡片、距離顯示、hover 動畫、點擊開啟 InfoPanel。

InfoPanel

顯示詳細內容、關閉互動、RWD 支援。

Navigator

搜尋、篩選、Teleport、小地圖。

Atmosphere

背景音、點擊音、靜音控制。

DataLoader

讀取 apps.json、型別 Interface、可選 Firebase。

Theme + RWD

定義色系（colors.ts）、Tailwind 色彩、Mobile-first。

效能與測試

Lazy load、FPS 測試、多裝置驗證。

部署驗證

Vite build、Vercel / Cloudflare Pages 上線、體驗測試。

3. 驗收條件
模組	驗收標準
WorldMap	移動順暢、光影正常
ApplicationCard	正確載入並可互動
InfoPanel	顯示資料與外部連結
Navigator	搜尋與 Teleport 功能正常
Atmosphere	音效控制有效
DataLoader	apps.json 讀取無誤
Theme + RWD	三種 viewport 顯示良好
效能	Page Load < 5s，FPS > 30
部署	上線可正常瀏覽所有作品
4. 時程表
週次	目標	輸出
第 1 週	核心架構與地圖	WorldMap + DataLoader
第 2 週	UI / 互動	Cards + InfoPanel + Navigator
第 3 週	Theme / RWD	顏色 + 響應式調整
第 4 週	測試 / 部署	最終上線

