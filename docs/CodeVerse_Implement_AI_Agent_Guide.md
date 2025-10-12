🤖 CodeVerse – AI Agent Implementation Guide
文件類型：4. Implement（AI agent 導入階段）

版本： 與 Spec、Plan、Tasks 完全相容
用途： 指導 AI agent 在 CodeVerse MVP 中載入與應用生成的 3D 世界地圖

1️⃣ 文件目的

本文件提供清晰、可執行的步驟，讓 AI agent 能在 CodeVerse 專案架構 中完成以下任務：

將生成的世界地圖 (codeverse_map.png) 載入 Three.js 世界中。

確保地圖在 React Three Fiber 結構下正確渲染。

提供擴充點：轉換為高度地形（Height Map）、生成卡片座標、對應互動模組。

2️⃣ 預期前提條件
前提項目	狀態	備註
✅ Spec 文件	已完成	定義世界結構與地圖模組需求
✅ Plan 文件	已完成	設定技術棧與模組邏輯
✅ Tasks 文件	已完成	明確定義各模組開發任務
🗺️ 世界地圖素材	已生成	codeverse_map.png（等角視角地圖）
🧭 技術環境	React + Three.js + Zustand + Tailwind	與既有架構一致
3️⃣ 圖像檔案結構
/codeverse
 ├── public/
 │   ├── textures/
 │   │   ├── codeverse_map.png            # 主要地圖貼圖
 │   │   └── codeverse_map_height.png     # （可選）灰階高度圖
 │   └── index.html
 ├── src/
 │   ├── components/
 │   │   └── WorldMap.tsx                 # 載入地圖邏輯
 │   ├── store/
 │   │   └── worldStore.ts
 │   └── main.tsx

4️⃣ AI agent 實作目標
模組	任務	成果
WorldMap	將 codeverse_map.png 載入並作為地形基底	顯示完整世界地圖
ApplicationCard	依照世界地圖上的位置生成懸浮卡片	每區域對應作品
Navigator	與地圖互動，控制視角與跳轉	可放大、縮放、定位
Atmosphere	加入柔光與環境音以配合地圖	沉浸式探索體驗
5️⃣ 地圖載入方式（由 AI agent 執行）
模式 A：貼圖方式載入（MVP 推薦）

匯入 Three.js

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';


載入地圖貼圖

const textureLoader = new THREE.TextureLoader();
const mapTexture = textureLoader.load('/textures/codeverse_map.png');


建立地面平面

const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial({ map: mapTexture });
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);


放置鏡頭

camera.position.set(0, 60, 100);
camera.lookAt(0, 0, 0);


🟢 此模式最穩定且與 MVP 架構相容。

模式 B：轉換為高度圖地形（延伸版）

將生成的地圖轉成灰階版（命名為 codeverse_map_height.png）。

在 WorldMap.tsx 中載入：

const loader = new THREE.TextureLoader();
loader.load('/textures/codeverse_map_height.png', (texture) => {
  const geometry = new THREE.PlaneGeometry(100, 100, 256, 256);
  const material = new THREE.MeshPhongMaterial({ color: 0x88cc88 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;

  const ctx = document.createElement('canvas').getContext('2d');
  ctx.drawImage(texture.image, 0, 0, 256, 256);
  const data = ctx.getImageData(0, 0, 256, 256).data;

  const vertices = geometry.attributes.position.array;
  for (let i = 0, j = 0; i < data.length; i += 4, j += 3) {
    const brightness = data[i] / 255;
    vertices[j + 2] = brightness * 8;
  }

  geometry.computeVertexNormals();
  scene.add(mesh);
});

📐 補充：若設計團隊提供的是 1024×1024 的概念圖，可先將檔案命名為 `public/textures/codeverse_map_height_source.png`，再執行 `python3 scripts/prepare_heightmap.py` 產生正式地形（預設輸出為 256×256 `codeverse_map_height.png`，並自動套用模糊與邊界衰減）。

可以透過參數客製化：

- `--size 512`：輸出更高解析度，需同步調整 `SUBDIVISIONS`。
- `--blur 1.5`：拉高或降低高斯模糊以平滑多邊面。
- `--falloff 0`：取消邊界衰減，保留原始海岸線高度。
- `--no-equalize`：來源已校色時可跳過直方圖均衡化。

6️⃣ 卡片座標對應邏輯

AI agent 應依照 apps.json 中的座標自動將懸浮卡片配置於地圖對應區域：

[
  {
    "id": "creative-city",
    "title": "Party Game Hub",
    "position": [-30, 0, 25]
  },
  {
    "id": "ai-plateau",
    "title": "AI 姿勢教練",
    "position": [10, 0, -20]
  },
  {
    "id": "eco-forest",
    "title": "綠能森林",
    "position": [15, 0, 40]
  }
]


AI agent 在載入地圖後需呼叫：

apps.forEach(app => {
  const card = createAppCard(app);
  card.position.set(app.position[0], 1.5, app.position[2]);
  scene.add(card);
});

7️⃣ RWD 與地圖視角規則
裝置	相機距離	互動控制	備註
桌機	y = 60, z = 100	滑鼠 + WASD	全景瀏覽
平板	y = 45, z = 80	觸控旋轉	適中縮放
手機	y = 30, z = 60	單指移動 + 雙指縮放	視野縮窄

AI agent 必須自動偵測 window.innerWidth 來切換相機位置與控制方式。

8️⃣ 環境光與氛圍設置（與 Plan 文件相容）

AI agent 必須在世界載入時建立：

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
scene.add(ambientLight, directionalLight);


若使用 Howler.js 音效模組，AI agent 應在 useEffect 初始化：

const ambient = new Howl({ src: ['/sounds/ambient.mp3'], loop: true, volume: 0.5 });
ambient.play();

9️⃣ 成功驗收條件（AI agent 自測）
驗收項目	條件
地圖載入	/textures/codeverse_map.png 正確顯示於平面上
光影效果	地圖有柔光與陰影
互動控制	可旋轉、縮放、移動世界視角
卡片生成	apps.json 所有作品皆顯示於正確區域
音效播放	背景音正常播放，可靜音
FPS	> 30
響應式	Mobile / Tablet / Desktop 視角切換流暢
🔄 AI Agent 行為摘要流程圖
[讀取地圖紋理]
      ↓
[生成地形平面]
      ↓
[設定相機與燈光]
      ↓
[從 apps.json 生成卡片]
      ↓
[綁定使用者互動控制 (Orbit / WASD / Touch)]
      ↓
[載入音效與氛圍光]
      ↓
[開始渲染世界]

