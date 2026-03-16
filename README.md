# EWova Dashboard

Vue 3 前端儀表板，串接 EWova 教育元宇宙平台 API，提供學習歷程管理、錢包點數查詢、AI 服務監控等功能。

## 截圖

> （登入頁 / Dashboard / 學生歷程 / AI 服務 — 截圖待補）

## 技術棧

- **Vue 3** — Composition API (`setup`, `ref`, `reactive`)
- **Vue Router** — 路由守衛 (`beforeEach`)、History Mode
- **Vite** — 開發伺服器 + Proxy 設定
- **Chart.js** — 消費統計圓餅圖、進度長條圖、趨勢折線圖
- **EWova Mock API** — ASP.NET Core 模擬 API Server

## 專案結構

```
src/
├── main.js                  # Vue 入口 + Router 掛載
├── App.vue                  # 根元件
├── router/index.js          # 路由定義 + 登入守衛
├── api/index.js             # API 封裝層 (Composables)
│                              useAuth / useWallet / useChat / useModel3D / useCourse
├── views/
│   ├── Login.vue            # 登入頁
│   ├── Dashboard.vue        # 儀表板 — 錢包餘額、消費圖表、交易紀錄
│   ├── Students.vue         # 學生歷程 — 進度條、進度分布圖、組織成員
│   ├── Courses.vue          # 課程列表
│   └── AI.vue               # AI 聊天紀錄 + 3D 模型生成統計
└── components/
    ├── AppHeader.vue        # 頂部導覽列
    ├── StatCard.vue         # 數據卡片（可複用）
    ├── DataTable.vue        # 通用表格（Scoped Slot 自訂欄位渲染）
    ├── ProgressBar.vue      # 進度條（自動變色）
    └── ChatList.vue         # AI 對話列表
```

## 功能頁面

| 頁面 | 說明 | API 串接 |
|------|------|----------|
| Login | 登入驗證 | `POST /api/login` |
| Dashboard | 錢包餘額、AI 額度、消費統計、交易紀錄 | `/api/wallet/*`, `/api/ai-chat/*`, `/api/tripoai/*` |
| 學生歷程 | 學習進度追蹤、進度圖表、組織成員 | `/api/sheets`, `/api/internal/*` |
| 課程管理 | 課程列表、狀態管理 | `/api/course/latest` |
| AI 服務 | AI 聊天紀錄、3D 模型生成趨勢 | `/api/ai-chat/*`, `/api/tripoai/*` |

## 架構設計

### API 封裝層

所有 API 呼叫封裝為 Vue Composables，元件不直接呼叫 `fetch`：

```javascript
// src/api/index.js
export function useWallet() {
  const wallet = reactive({ credits: null, coins: null })
  async function fetchBalance() { ... }
  return { wallet, fetchBalance }
}
```

### 驗證流程

```
Login.vue → useAuth().login() → 儲存 Token → Router Guard 放行 → Dashboard
```

Router `beforeEach` 檢查登入狀態，未登入自動導向 `/login`。

### Proxy 設定

Vite 開發伺服器將 `/api` 請求轉發至 Mock Server：

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': { target: 'http://localhost:5080' }
  }
}
```

## 快速啟動

```bash
# 1. 啟動 Mock API Server（需要 .NET SDK）
cd ../ewova-learning-api-docs/MockApi
dotnet run --urls="http://localhost:5080"

# 2. 啟動 Vue 開發伺服器
cd ewova-dashboard
npm install
npm run dev
# → http://localhost:3000

# 3. 使用 Mock 帳號登入
# Email: demo@ewova.com
# Password: demo1234
```

## 關聯專案

- [EWova API 文件](https://github.com/kkchi-77/ewova-learning-api-docs) — 互動式 API 文件 + Mock Server

## 關於 EWova

EWova 是一個教育元宇宙平台 — 學生戴 VR 頭盔進入虛擬教室學習，老師在網頁後台管理課程與追蹤學習歷程。平台後端（622 API、60 Controllers、57 Services、57,231 行 C#）由我獨立設計與建置。

此 Dashboard 為 Portfolio 展示用途，串接 Mock API 呈現平台功能。
