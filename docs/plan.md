⚙️ CodeVerse – 技術計畫文件（Plan）

對應版本：Spec – MVP 版
階段：2. Plan（技術計畫階段）

1. 專案概要

專案名稱： CodeVerse
開發目標：
以最小依賴實現一個前端獨立運行的 3D 互動世界，用於展示開發者的所有應用程式作品。
系統採前端單頁應用（SPA）架構，資料來源為本地 JSON，並可選擇性整合 Firebase 作為雲端儲存。

2. 系統架構設計
2.1 架構總覽
React (TypeScript)
│
├── React Three Fiber (Three.js Wrapper)
│     ├── World Scene (地圖主場景)
│     ├── Lighting System
│     └── Interaction Layer (Raycaster)
│
├── Zustand (狀態管理)
│     ├── UI 狀態：面板開關、音量、模式
│     └── Player 狀態：位置、視角、目標物
│
├── Tailwind + Framer Motion (UI/動畫)
│
├── DataLoader
│     ├── 本地 JSON 讀取
│     └── （可選）Firebase Firestore 同步
│
└── Howler.js (音效控制)

2.2 模組邏輯關係
模組	上層依賴	下層責任	輸出資料
WorldMap	Three.js / React Three Fiber	建立世界地形、環境、照明	世界實體、地標位置
ApplicationCard	WorldMap	在指定座標生成懸浮卡片	點擊事件與目標 ID
InfoPanel	Zustand 狀態	顯示作品詳情	使用者互動回饋
Navigator	Zustand + WorldMap	控制視角、搜尋、跳轉	更新相機座標
DataLoader	Fetch API / Firebase	載入作品資料	apps[] 陣列
Atmosphere	Howler.js	控制音效播放	聲音播放狀態
2.3 資料流（Data Flow）
apps.json → DataLoader → Zustand Store → WorldMap / Card Renderer
                                        ↳ InfoPanel / Navigator


單向資料流原則：
所有資料初始化於 DataLoader → 寫入 Zustand → 各模組共用。

互動事件流：
WorldMap →（點擊卡片）→ Zustand → InfoPanel 開啟。

Firebase 可選整合點：

若啟用 Firestore：DataLoader 讀取集合 /apps

若啟用 Storage：從雲端讀取封面圖片。

3. 資料結構與配置
3.1 apps.json 結構
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "tags": ["string"],
    "position": [x, y, z],
    "icon": "/cards/xxx.png",
    "link": "https://...",
    "video": "https://..."
  }
]

3.2 型別定義 (TypeScript Interface)
export interface AppItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  position: [number, number, number];
  icon: string;
  link: string;
  video?: string;
}

3.3 狀態結構 (Zustand Store)
interface WorldState {
  apps: AppItem[];
  selectedApp: AppItem | null;
  isPanelOpen: boolean;
  soundEnabled: boolean;
  setSelectedApp: (app: AppItem | null) => void;
  togglePanel: (open: boolean) => void;
  toggleSound: () => void;
}

4. 技術細節與實作策略
4.1 前端框架

使用 React + TypeScript

提供靜態型別安全性。

使用 React hooks 管理元件生命週期。

採 Vite 或 Next.js（僅用於靜態輸出）建構。

4.2 3D 世界場景

採用 React Three Fiber (R3F) 建立。

場景包含：

地面：使用 PlaneGeometry + 自訂貼圖。

光線：AmbientLight + DirectionalLight。

天空盒：簡單漸層 Shader 或 Sky Component。

攝影機控制：

OrbitControls（滑鼠）＋ WASD 鍵盤移動。

卡片互動：

使用 Raycaster 偵測滑鼠點擊。

卡片 hover → 顯示 Glow 特效。

效能最佳化：

使用 useMemo 快取模型。

Lazy load apps.json（非阻塞初始畫面）。

4.3 懸浮卡片（AppCard）

每張卡片是 3D Plane + HTML overlay。

顯示封面與標題。

距離玩家 < 10m 時才渲染內容。

Hover 動畫：Framer Motion 控制縮放與亮度。

4.4 詳情面板（InfoPanel）

UI 元件由 React + Framer Motion 建構。

顯示：

封面、技術標籤、描述。

「開啟應用程式」按鈕（新分頁）。

ESC 鍵或背景點擊關閉。

4.5 導覽介面（Navigator）

上方浮動 UI，含：

🔍 搜尋框（filter apps by keyword）

🧭 小地圖縮略圖（Canvas 或簡易 overlay）

🚀 快速跳轉（根據 ID teleport）

響應式設計（可於手機上移動）。

4.6 音效模組（Atmosphere）

使用 Howler.js 管理背景音與互動音。

音效分類：

ambient.mp3（世界背景）

click.wav（卡片互動）

音量與靜音控制綁定 Zustand 狀態。

4.7 資料載入（DataLoader）

預設使用 fetch('/data/apps.json')。

若設定 USE_FIREBASE = true：

使用 Firebase SDK 初始化：

import { getFirestore, collection, getDocs } from 'firebase/firestore';


讀取 /apps 集合 → 轉為 AppItem[]。

4.8 響應式設計（RWD）
- 採用 **Mobile-first** 開發策略。
- 斷點規劃（Tailwind 預設）：
  - `sm`: 640px（手機直向）
  - `md`: 768px（平板）
  - `lg`: 1024px（桌機）
  - `xl`: 1280px（大型桌機）
- 規則：
  - 導覽介面 (Navigator)：手機版自動摺疊成浮動按鈕。
  - InfoPanel：手機以全螢幕覆蓋顯示；桌機為右側滑出。
  - 世界控制（WASD + 滑鼠）在手機改為虛擬搖桿控制。
- 測試裝置：
  - iPhone SE、iPad、MacBook Pro、Android Pixel。

5. 系統設計與部署
5.1 檔案結構
/codeverse
 ├── public/
 │   ├── cards/           # 各作品封面
 │   ├── sounds/          # 音效檔
 │   └── data/apps.json   # 作品資料
 ├── src/
 │   ├── components/
 │   │   ├── WorldMap.tsx
 │   │   ├── ApplicationCard.tsx
 │   │   ├── InfoPanel.tsx
 │   │   ├── Navigator.tsx
 │   │   └── Atmosphere.tsx
 │   ├── store/worldStore.ts
 │   ├── dataLoader.ts
 │   ├── theme/
 │   │   └── colors.ts
 │   └── main.tsx
 ├── package.json
 └── vite.config.ts

5.2 專案環境與相依套件
套件	用途
react, react-dom	前端核心
@react-three/fiber, three	3D 渲染引擎
@react-three/drei	常用輔助元件
zustand	狀態管理
tailwindcss	樣式系統
framer-motion	動畫效果
howler	音效管理
firebase（可選）	雲端資料儲存
vite	開發與建構工具
6. 效能與優化策略
項目	策略
初始載入	apps.json 延遲載入（loading state）
渲染控制	僅渲染距離 <10 的卡片
模型最佳化	使用低面數模型（low-poly）
音效效能	音效緩衝並重用實例
動畫	使用 Framer Motion layoutId 優化
部署	Vite + Cloudflare Pages / Vercel 靜態部署
7. 安全性與錯誤處理
項目	策略
JSON 讀取錯誤	顯示「資料載入失敗」提示
外部連結錯誤	使用 target="_blank" + rel="noopener"
Firebase 認證	僅使用讀取權限
FPS 限制	降低渲染密度以防效能過載
8. 未來可擴充設計點（與 Spec 一致）
項目	擴充方案
後端資料來源	改為 Strapi / Node.js API
登入功能	Firebase Authentication
多世界地圖	支援多 Scene 切換
AI 導覽員	MediaPipe Pose + TTS
多人模式	Socket.io + PeerJS
9. 開發週期規劃（2 週 Sprint）
週次	階段	主要交付項
第 1 週	架構搭建 & 地圖渲染	R3F 世界、Zustand 狀態、載入 JSON
第 2 週	UI 與互動整合	InfoPanel、音效、導航系統、Firebase 測試整合

