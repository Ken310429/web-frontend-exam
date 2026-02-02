
## 🚀 如何執行此專案

1. 安裝 Node.js 與 npm（建議 Node.js 18 以上）
2. 下載或 clone 此專案：
  ```bash
  git clone https://github.com/你的帳號/web-frontend-exam.git
  cd web-frontend-exam
  ```
3. 安裝相依套件：
  ```bash
  npm install
  ```
4. 啟動本地開發伺服器：
  ```bash
  npm start
  ```
  預設會在 http://localhost:3000 開啟專案。
5. 若要部署至 GitHub Pages：
  ```bash
  npm run deploy
  ```




## 🏗️ 專案架構與邏輯說明

```
src/
  App.js                // 主應用程式，負責頁面邏輯、狀態管理、API 串接
  components/           // 各種元件（Card、Modal、Description 等）
  constants/            // 靜態資料（教育、薪資、職缺列表）
  styles/               // SCSS 樣式檔
public/
  images/               // 靜態圖片資源
  index.html            // 入口 HTML
```

- 主要使用 React.js 開發，採用 function component 與 hooks 管理狀態。
- UI 以 Material UI 與 SCSS 撰寫，兼顧響應式設計。
- 主要功能：
  - 依公司、學歷、薪資條件搜尋職缺
  - 分頁顯示職缺卡片
  - Modal 彈窗顯示職缺詳細內容與圖片輪播
  - loading 動畫、無資料提示
- API 串接模擬（可用 MirageJS 或自行 mock 資料）。




## 🧩 專案遇到的困難、問題及解決方法

1. **響應式設計與分頁**
   - 問題：不同裝置顯示筆數需動態調整。
   - 解決：用 matchMedia 監聽視窗寬度，動態設定每頁顯示數量。

2. **Modal 與圖片輪播**
   - 問題：Modal 彈窗需支援 loading 狀態與多張圖片輪播。
   - 解決：使用 Swiper 套件實現圖片輪播，並於 Modal 加入 loading 狀態判斷。

3. **Description 格式轉換問題**
   - 問題：API 回傳的 description 欄位為 HTML 格式，需轉換為結構化資料以利元件渲染。
   - 解決：以 DOMParser 將 HTML 字串解析，並依據標籤分類（如職責、資格、福利等），動態產生對應內容，確保畫面一致性與可維護性。

4. **AI 輔助開發**
   - 本專案部分程式碼、說明文件及除錯過程有透過 AI 工具（如 Copilot、ChatGPT）協助，提升開發效率與品質。

5. **眼球移動互動效果**
   - 眼球追蹤滑鼠互動效果參考自網路教學，並根據下列網站內容進行復現與調整：
     https://ekmin.hashnode.dev/interactive-mouse-tracking-eyes-with-react-and-tailwind-css

