# 專案總覽（更新：2025-10-12）

以下彙整 /opt/ai-project 內的主要專案（不含 XOOPS、codeVerse），針對指定欄位提供可取得的資訊；若暫無資料則以「未提供」標示。

## AI Posture Coach
- **專案清單與定位**：名稱 PoseCoach；目標打造 AI 姿勢教練 PWA，提供即時姿勢偵測與教練指引；狀態屬於 React + TypeScript MVP，持續 UX 優化；所在位置 `本機路徑: /opt/ai-project/AI-posture-coach`。
- **遠端部署網址**：https://ai-posture-coach.deepwaterslife.com/
- **應用程式類型**：AI 姿勢教練、電腦視覺、PWA、React 19、Vite、Tailwind、MediaPipe Tasks、TensorFlow.js、IndexedDB、Web Worker、Sentry 監控。
- **時間軸與里程碑**：未提供。
- **技術與架構概要**：前端採 React 19 + TypeScript + Vite；UI 以 Tailwind + shadcn 風格為主；姿勢偵測使用 `@mediapipe/tasks-vision` 與 TensorFlow.js WebGL 後端；背景任務透過 Web Worker 分擔推論；歷史資料存於 IndexedDB（透過 `idb`）；Sentry SDK 集成錯誤與效能監控；支援 Jest 單元測試與 Vite 構建。
- **成果與媒體資源**：未提供。
- **目前狀態與待辦**：近期完成多項 UX 優化（例如訓練頁 Toast 引導、首頁呼叫行為提示、文字對比調整）；後續兼容性驗證需依 `docs/compatibility-checklist.md` 手動執行；未列出新的待辦。
- **相關文件**：`AI-posture-coach/docs/security-privacy-checklist.md`、`AI-posture-coach/docs/compatibility-checklist.md`、`AI-posture-coach/UX_OPTIMIZATION_SUMMARY.md`、`AI-posture-coach/UX_OPTIMIZATION_FINAL.md`、`AI-posture-coach/README.md`。
- **聯絡點或協作者**：開發者 s19003045。

## Battle Visualizer MVP
- **專案清單與定位**：名稱 Battle Visualizer MVP；目標建立互動式歷史戰役播映平台，支援戰役列表、地圖與時間軸播放；目前為 React 前端 MVP；所在位置 `本機路徑: /opt/ai-project/battle-visualizer-mvp`。
- **遠端部署網址**：https://battle.deepwaterslife.com/
- **應用程式類型**：歷史資料可視化、互動地圖、戰史教育、React 19、Leaflet、時間軸播放、Tailwind、Zod 驗證、React Query。
- **時間軸與里程碑**：未提供。
- **技術與架構概要**：前端以 React + Vite + TypeScript 為基礎；地圖層使用 Leaflet 與 React-Leaflet；資料快取與請求協調由 TanStack Query 處理；戰役資料以 JSON/GeoJSON 儲存在 `public/data` 並透過 Zod Schema 驗證；Tailwind CSS 建 UI；具 `scripts/validate-battles.ts` 進行資料驗證。
- **成果與媒體資源**：未提供。
- **目前狀態與待辦**：MVP 已完成時間軸播放、圖例、事件標記等核心互動；`proj_description.md` 提出後續擴充（如導入後端 CMS、增添戰果統計與歷史地圖 overlay）。
- **相關文件**：`battle-visualizer-mvp/README.md`、`battle-visualizer-mvp/proj_description.md`、`battle-visualizer-mvp/scripts/validate-battles.ts`、`battle-visualizer-mvp/public/data/ww2_d_day.json` 等戰役資料。
- **聯絡點或協作者**：開發者 s19003045。

## Chimpanzee Guardians
- **專案清單與定位**：名稱 Chimpanzee Guardians；宗旨是推廣黑猩猩保育教育，提供互動百科、地圖與行動指南；2025-10-05 完成 v1.3 UI/UX 優化並通過構建測試；所在位置 `本機路徑: /opt/ai-project/chimpanzee-Guardians`。
- **遠端部署網址**：https://chimpanzee-guardians.deepwaterslife.com/
- **應用程式類型**：生態教育平台、互動地圖、故事化教學、React 19、Vite、Tailwind、Leaflet、shadcn 元件、Vitest 測試。
- **時間軸與里程碑**：2025-10-04 啟動 Phase 1；2025-10-04 完成 v1.0 與 v1.1；2025-10-05 完成 v1.2 與 v1.3（共 19 項功能優化）。
- **技術與架構概要**：前端 React + TypeScript + Vite；Tailwind + class-variance-authority 建立主題；Leaflet 呈現全球分布資料；內容來自 `frontend/src/data` 靜態 JSON；測試堆疊為 Vitest + Testing Library；Zustand/其他狀態管理未導入（以 React state 為主）。
- **成果與媒體資源**：未提供。
- **目前狀態與待辦**：Phase 1–4 項目皆標記完成（涵蓋全域樣式、組件庫、互動增強、搜尋體驗）；文件未列出額外未完成項。
- **相關文件**：`chimpanzee-Guardians/docs/proj_specs.md`、`chimpanzee-Guardians/docs/PROJECT_FINAL_SUMMARY.md`、`chimpanzee-Guardians/docs/PROJECT_PROGRESS_BOARD.md`、`chimpanzee-Guardians/docs/UI_UX_OPTIMIZATION_README.md`、`chimpanzee-Guardians/frontend/README.md`。
- **聯絡點或協作者**：開發者 s19003045。

## Fit Track
- **專案清單與定位**：名稱 Fit Track；面向增肌減脂族群的訓練與飲食追蹤 PWA，計畫以 Web MVP 驗證後再擴展至行動 App；目前前端 MVP 核心功能已完成並整合 Firebase；所在位置 `本機路徑: /opt/ai-project/fit-track`。
- **遠端部署網址**：http://fit-track.deepwaterslife.com/
- **應用程式類型**：健身追蹤、營養紀錄、PWA、React 19、React Query、Firebase、Tailwind、Recharts、Vite、Service Worker。
- **時間軸與里程碑**：2025-10-01 完成 Training Page V2 重構（11/12 任務完成，剩餘 1 項待手動測試）。
- **技術與架構概要**：前端採 React + Vite + TypeScript，整合 Firebase Authentication、Firestore、Storage；React Query 處理遠端資料；Tailwind CSS + lucide-react 提供主題；PWA 能力透過 `vite-plugin-pwa`；Recharts 呈現訓練與體重趨勢；模組化程式碼切分於 `frontend/src/features`。
- **成果與媒體資源**：未提供。
- **目前狀態與待辦**：`docs/DEVELOPMENT_NOTES.md` 列示 MVP 核心（訓練模組、營養、進度追蹤、挑戰任務）已上線；待辦包含舊資料遷移工具、耐力分析深化、Session Logger 行動版優化、多媒體紀錄與進階報表等；`frontend/docs/training-page-v2-final-summary.md` 指出仍需完成的手動測試。
- **相關文件**：`fit-track/docs/prj_desciption.md`、`fit-track/docs/DEVELOPMENT_NOTES.md`、`fit-track/frontend/docs/project-analysis.md`、`fit-track/frontend/docs/training-page-v2-final-summary.md`、`fit-track/frontend/docs/deployment-checklist.md`。
- **聯絡點或協作者**：開發者 s19003045。

## Party Game Hub
- **專案清單與定位**：名稱 Party Game Hub；多人派對遊戲啟動器，支援現場 8–10 人快速開局；版本 0.1.1，核心為前端靜態應用；所在位置 `本機路徑: /opt/ai-project/games`。
- **遠端部署網址**：https://party-game-hub.deepwaterslife.com/
- **應用程式類型**：派對遊戲平台、本地多人、React 19、Vite、Tailwind、Zustand、shadcn UI、Vitest 測試。
- **時間軸與里程碑**：未提供。
- **技術與架構概要**：React + TypeScript + Vite；Zustand 管理遊戲狀態；Tailwind 與 class-variance-authority 建構 UI；測試採 Vitest + Testing Library；CI（`docs/README` 說明）執行 lint / test / build；題庫與遊戲設定集中於 `src/data` 與 `docs/games/`。
- **成果與媒體資源**：未提供。
- **目前狀態與待辦**：README 顯示核心遊戲清單、時間軸控制等功能已完成；後續擴充與題庫維護需同步更新 `docs/games/`（尚未列出具體待辦）。
- **相關文件**：`games/README.md`、`games/docs/SPECS.md`、`games/docs/SPEC.json`、`games/docs/DEPLOYMENT.md`、`games/docs/games/README.md`。
- **聯絡點或協作者**：開發者 s19003045。

## SLP Monitor
- **專案清單與定位**：名稱 SLP Monitor；監控太陽能板回收產線七個站點與副產品數據的工業儀表板，MVP 以前端模擬器展示即時狀態；所在位置 `本機路徑: /opt/ai-project/slp-monitor`。
- **遠端部署網址**：http://slp-monitor.deepwaterslife.com/
- **應用程式類型**：工業監控儀表板、產線模擬、React 18/19 + TypeScript、Vite、Zustand、Recharts、localforage、Express API、WebSocket 預備、Docker Compose。
- **時間軸與里程碑**：未提供。
- **技術與架構概要**：Monorepo（npm workspaces）含 `frontend` 與 `services/api`；前端以 React + Tailwind + shadcn 風格建立儀表板，Zustand 搭配 localforage 持久化模擬狀態；Recharts 呈現 KPI 趨勢；模擬引擎位於 `frontend/src/state/mocks`；後端為 Express + ws 骨架，並共享 `@slp/contracts` 型別；Docker Compose 可同時啟動 UI 與 API。
- **成果與媒體資源**：未提供。
- **目前狀態與待辦**：MVP 目前使用前端模擬資料；`docs/architecture.md` 的 Next Steps 指出需以 WebSocket 連接實際設備、導入 PostgreSQL 持久化、擴充契約與整合測試；尚未標記完成時間。
- **相關文件**：`slp-monitor/prj-description.md`、`slp-monitor/docs/architecture.md`、`slp-monitor/docs/setup.md`、`slp-monitor/docker-compose.yml`、`slp-monitor/frontend/src/state`（模擬核心程式碼）。
- **聯絡點或協作者**：開發者 s19003045。

## Solar Flow WMS
- **專案清單與定位**：名稱 SolarFlow；智慧倉儲與 AGV 模擬平台，定位為太陽能板回收廠倉儲作業的前端模擬；目前仍在 MVP 規劃執行中；所在位置 `本機路徑: /opt/ai-project/solar-flow-wms`。
- **遠端部署網址**：https://solar-flow-wms.deepwaterslife.com/
- **應用程式類型**：倉儲模擬、AGV 動線、React 19、Zustand、Konva.js、Framer Motion、Tailwind、shadcn UI、LocalStorage 持久化。
- **時間軸與里程碑**：`docs/tasks.md` 建議 4–5 週計畫：Phase 1–2（一週內完成地圖互動原型）、Phase 3–4（第三週完成 AGV 模擬與資訊面板）、Phase 5–6（第四週儲存匯出與主題優化）、Phase 7（第五週測試驗收）。
- **技術與架構概要**：React + TypeScript + Vite 建置前端；Konva.js 用於倉儲平面圖與 AGV 動線；Zustand 管理 zones/cells/pallets/agvs 狀態並持久化至 LocalStorage；Framer Motion 提供動態；UI 以 Tailwind + shadcn 元件；資料結構與狀態轉換詳載於 `docs/spec.md`。
- **成果與媒體資源**：未提供。
- **目前狀態與待辦**：`docs/tasks.md` 詳列 30 項 MVP 任務（初始化、地圖繪製、AGV 模擬、資料匯出、主題優化、測試）及後續延伸（任務佇列、A* 避讓、API 整合等）；實作進度尚未於文件標記完成情況。
- **相關文件**：`solar-flow-wms/docs/spec.md`、`solar-flow-wms/docs/tasks.md`、`solar-flow-wms/docs/plan.md`、`solar-flow-wms/README.md`。
- **聯絡點或協作者**：開發者 s19003045。

## The Exchange
- **專案清單與定位**：名稱 The Exchange（交換場）；互動藝術交換展覽的 React 前端 MVP，提供 Material / Emotional / Idea 三大交換體驗、沉浸式音場與匿名 persona 可視化；所在位置 `本機路徑: /opt/ai-project/the-exchange`。
- **遠端部署網址**：未提供。
- **應用程式類型**：互動藝術網站、匿名交換體驗、React 19、Vite、Tailwind、Zustand、Firebase Firestore / Storage、Web Audio API、Canvas 動態詩牆。
- **時間軸與里程碑**：`docs/spec.md`（v0.9）與 `docs/plan.md`（v1.0）規劃 5 週 MVP 行程（Phase 1–5：架構→Material→Emotional→Idea→視覺與部署）；截至 2025-10-22 尚未記錄實際上線日期或完成狀態。
- **技術與架構概要**：前端以 React + TypeScript + Vite 打造，Tailwind 定義 glow-card 主題；Zustand `useExchangeStore` 協調 Material / Emotional / Idea 狀態、Firebase 交換流程、匿名記憶 `memoryLog` 與 `analytics` 指標；Firebase Firestore / Storage 綁定 `.env` 參數並支援 emulator；`components/PoemWall.tsx` 以 Canvas 渲染動態詩牆、`sound/soundscape.ts` 啟動背景聲景、`components/ExchangePersona.tsx` 依交換 ID 生成幾何 persona；`firebase/services.ts` 處理圖片上傳、匿名交換抽樣與 idea 池訂閱。
- **成果與媒體資源**：`exchange-mvp/dist/` 提供最新打包輸出；`public/sounds/*` 收錄背景音場素材；尚未附線上展演或影片。
- **目前狀態與待辦**：前端頁面（Landing、Gallery、Material / Emotional / Idea Exchange）與 Firebase 互動邏輯皆已實作，`src/__tests__/routing.test.tsx` 覆蓋基本路由；仍需提供實際 Firebase 組態、Firestore 規則與 Hosting 部署，Plan / Tasks 中列出的可選動畫、AI 擴充與安全測試尚未完成。
- **相關文件**：`the-exchange/AGENTS.md`、`the-exchange/docs/spec.md`、`the-exchange/docs/plan.md`、`the-exchange/docs/tasks.md`、`the-exchange/docs/style.md`。
- **聯絡點或協作者**：未提供。

