🪐 CodeVerse – MVP 版規格文件（Spec）
1. 專案概述

專案名稱： CodeVerse
版本： MVP（最小可行產品）
性質： 互動式 3D 世界探索平台
核心理念：
讓使用者以「探索」的方式認識你的作品。
CodeVerse 是一個以 3D 世界為舞台的互動式作品集平台，每個應用程式作品都被映射為一個地點或領域，使用者能自由漫遊、點擊作品卡片、閱讀描述，並開啟實際應用程式。

2. 專案目標
類別	內容
主要目標	以最小技術成本建構一個沉浸式 3D 作品集世界。
次要目標	所有作品資料由 JSON 檔驅動，前端自動生成內容。
可選功能	若需雲端儲存，可接入 Firebase Firestore 或 Storage。
最終目標	建立一個可持續擴充、具敘事性與互動感的開發者宇宙入口。

3. 使用者角色
角色	目標	行為
探索者（訪客）	想瀏覽你的作品與技術	在 3D 世界中探索、閱讀卡片資訊、開啟作品連結
創作者（你）	想展示與維護自己的作品	透過 JSON 新增作品資料、上傳封面圖
潛在雇主 / 合作者	想了解開發與設計能力	在互動環境中直觀體驗作品概念與風格

4. 核心功能模組
4.1 世界地圖模組（World Map）

建構整體 3D 世界場景（地形、光影、天空）。

玩家可使用滑鼠或鍵盤控制移動（WASD）。

支援自動導覽模式。

地圖上不同區域對應不同應用程式領域（遊戲、AI、教育、工業等）。

新增「Creator Gary Wu」節點作為作者介紹，位置靠近地圖中心（[2, 0, -18]），以旗幟地標呈現並維持可互動狀態，提供世界觀、履歷、外部連結等資訊，與其他作品卡片互補。編輯 `data/apps.json` 後請執行 `npm run sync:data`，將內容複製至 `public/data/apps.json` 供部署站點存取。

4.2 懸浮卡片模組（Application Card）

每個應用以懸浮卡片呈現。

內容包括：

應用名稱與封面圖

短描述

技術標籤（tags）

按鈕：「查看更多」「開啟應用程式」

當使用者靠近時自動浮現，點擊後顯示詳細資訊。

4.3 詳情面板模組（Info Panel）

顯示作品完整介紹：

標題、圖片、描述、技術棧

Demo 影片（可選）

連結按鈕（另開新分頁）

ESC 或點擊背景可關閉。

桌機視窗中，當詳情面板開啟時，場景內的懸浮卡片會自動降低透明度與互動性，避免遮蔽資訊欄；面板本身以較高層級顯示，確保閱讀體驗。

4.4 導覽介面模組（Navigator）

介面包含：

小地圖（Mini Map）

搜尋欄（依名稱或標籤搜尋作品）

篩選（依類別分區）

快速跳轉（Teleport 功能）

使用者可切換「全景模式 / 導覽模式」。

4.5 音效與氛圍模組（Atmosphere）

環境音（風聲、光點、電子脈衝）

每個區域可有對應背景音樂。

音量控制與靜音切換。

4.6 資料驅動模組（Data Schema）

MVP 架構：

所有作品資料儲存在 /data/apps.json。

無需伺服器 API，前端直接讀取 JSON。

若有需要，可切換為 Firebase Firestore 讀取。

結構範例如下：

[
  {
    "id": "warehouse-agv",
    "title": "倉儲系統與 AGV 監控",
    "description": "3D 倉儲佈局與自動搬運車監控系統 MVP。",
    "tags": ["React", "Three.js", "Zustand"],
    "position": [23, 0, -45],
    "icon": "/cards/warehouse.png",
    "link": "https://warehouse-rock.vercel.app",
    "video": ""
  },
  {
    "id": "party-hub",
    "title": "Party Game Hub",
    "description": "多人互動遊戲平台：比手畫腳、動作接龍、誰是臥底。",
    "tags": ["React", "Canvas"],
    "position": [-12, 0, 34],
    "icon": "/cards/party.png",
    "link": "https://party-hub.vercel.app"
  }
]

5. 系統架構圖（MVP 概念）
┌──────────────────────────────┐
│           CodeVerse          │
│──────────────────────────────│
│   React + Three.js 前端框架  │
│──────────────────────────────│
│   │                          │
│   ├── WorldMap (3D 世界地圖) │
│   ├── AppCard (應用卡片)     │
│   ├── InfoPanel (詳情面板)   │
│   ├── Navigator (導覽介面)   │
│   ├── Atmosphere (音效控制)  │
│   └── DataLoader (JSON/Firebase) │
│──────────────────────────────│
│   assets/  → 模型、音效、貼圖 │
│   data/    → apps.json         │
│   theme/   → 顏色與UI設定      │
└──────────────────────────────┘

6. 使用技術棧
模組	技術	用途
前端框架	React + TypeScript	結構化與型別安全開發
3D 渲染	Three.js + React Three Fiber	建立 3D 世界與互動邏輯
狀態管理	Zustand	控制位置、開關、UI 狀態
動畫系統	Framer Motion	面板、轉場與互動動畫
樣式框架	Tailwind CSS	快速開發響應式介面
資料來源	apps.json / Firebase (可選)	作品資料儲存與讀取
音效控制	Howler.js	背景音與互動音效播放

7. MVP 架構與限制
項目	MVP 狀態	後續可擴充
資料來源	本地 apps.json	Firebase Firestore 自動同步
使用者登入	無	Firebase Authentication（管理者登入）
檔案儲存	本地 /public/cards	Firebase Storage（封面與影片）
後端 API	無	Node.js / Strapi（未來擴充）
多人互動	無	WebSocket / WebRTC
AI 導覽 / 聲音導覽	無	MediaPipe + TTS 模組

8. 使用者互動流程
[訪客開啟 CodeVerse]
       ↓
載入世界 → 顯示地圖與主角
       ↓
讀取 apps.json → 生成所有應用卡片
       ↓
玩家移動 → 靠近卡片 → 卡片自動浮現
       ↓
點擊卡片 → 開啟 Info Panel 顯示詳情
       ↓
點擊「開啟應用程式」 → 另開分頁
       ↓
(返回地圖，繼續探索其他領域)

9. 視覺與體驗設計（Theme）
元素	設計原則
主色	夜空藍 (#1E2A38)、霓光藍 (#00C2FF)、柔光金 (#FFD166)
輔色	青綠 (#A1FFCE)、銀灰 (#C9D6E0)
風格	Low-poly × Sci-fi × Ghibli 融合
音效氛圍	柔和風聲、電子嗡鳴、微光粒子特效
字體	Inter / Noto Sans TC

10. 成功指標 (MVP KPI)
指標	目標
頁面載入時間	< 5 秒
使用者平均停留時間	> 2 分鐘
互動作品點擊率	> 50%
JSON 可擴充作品數量	≥ 100

11. 未來擴充方向

🌌 多主題地圖（星球）切換功能

🧭 AI 導覽員（語音與互動介紹）

🧱 作品模板生成器（自動建立新卡片）

🎖 成就徽章系統

🕹 多人探索模式（Socket.io）

✅ 文件狀態
文件名稱	狀態
1. Specify（本文件）	✅ 已完成（MVP 版）
2. Plan（技術計畫階段）	🔜 下一步
3. Tasks（任務拆解階段）	🔜 待 Plan 完成後生成
