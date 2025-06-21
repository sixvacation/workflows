# 🏖️ 台灣南部旅遊資料蒐集與網站建設專案

[![Build Status](https://github.com/username/taiwan-south-tourism-crawler/workflows/CI/badge.svg)](https://github.com/username/taiwan-south-tourism-crawler/actions)
[![Python Version](https://img.shields.io/badge/python-3.9+-blue.svg)](https://python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GCP Deploy](https://img.shields.io/badge/GCP-Ready-green.svg)](https://cloud.google.com)

> 🚀 一個完整的分散式爬蟲系統，專門蒐集台南市、高雄市、屏東縣的旅遊資料，並建立整合即時交通、天氣與觀光資訊的互動式旅遊網站。

## 📑 目錄

- [🎯 專案概述](#-專案概述)
- [✨ 功能特色](#-功能特色)
- [🛠️ 技術架構](#️-技術架構)
- [🚀 快速開始](#-快速開始)
- [📊 資料蒐集](#-資料蒐集)
- [🌐 網站功能](#-網站功能)
- [☁️ GCP部署](#️-gcp部署)
- [📈 監控與維護](#-監控與維護)
- [🤝 貢獻指南](#-貢獻指南)
- [📄 授權條款](#-授權條款)

## 🎯 專案概述

本專案致力於建立台灣南部地區（台南市、高雄市、屏東縣）的完整旅遊資訊生態系統。透過先進的分散式爬蟲技術，我們蒐集了：

- 🍽️ **美食資料**：米其林星級餐廳 + 必比登推薦（56間餐廳）
- 🏛️ **旅遊景點**：知名景點含詳細座標資訊（15個景點）
- 🎪 **活動資訊**：當期重要旅遊活動（6項活動）
- 🗺️ **旅遊行程**：精選路線含交通指引（4條路線）

### 🌟 亮點成果

- **88筆高品質資料**：經過嚴格驗證的旅遊相關資訊
- **即時整合服務**：交通、天氣、觀光資訊一站式平台
- **企業級架構**：可擴展的分散式系統設計
- **雲端原生部署**：完整的GCP部署解決方案

## ✨ 功能特色

### 🕷️ 分散式爬蟲系統

- **Celery + Redis架構**：高效能分散式任務處理
- **智能負載均衡**：動態資源調度與任務分配
- **容錯機制**：自動重試與錯誤恢復
- **頻率控制**：禮貌爬蟲，避免對目標網站造成負載

### 🌐 互動式旅遊網站

- **響應式設計**：完美支援桌面與行動裝置
- **即時地圖整合**：基於Leaflet的互動式地圖
- **智能搜尋**：多維度篩選與關鍵字搜尋
- **即時資訊**：整合TDX交通與中央氣象署天氣API

### ☁️ 雲端部署方案

- **容器化部署**：Docker + Google Cloud Run
- **自動化CI/CD**：GitHub Actions整合
- **監控告警**：Google Cloud Monitoring
- **成本優化**：智能資源管理與搶占式實例

## 🛠️ 技術架構

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Crawlers  │    │  Data Processing│    │   Frontend UI   │
│                 │    │                 │    │                 │
│ • Michelin      │───▶│ •Validation    │───▶│ • Interactive   │
│ • Bib Gourmand  │    │ •Cleaning       │    │   Map           │
│ • Tourism Sites │    │ •Standardization│    │ • Real-time     │
│ • Activities    │    │                 │    │   Weather       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Celery Workers  │    │  Data Storage   │    │  API Services   │
│                 │    │                 │    │                 │
│ • Redis Queue   │    │ • CSV Files     │    │ • Flask REST    │
│ •Task Monitoring│    │ • JSON Export   │    │ • TDX Transport │
│ • Load Balancing│    │ • Cloud Storage │    │ • Weather API   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 核心技術棧

**後端架構**
- 🐍 Python 3.9+：核心開發語言
- 🌶️ Celery：分散式任務隊列
- 🗄️ Redis：任務代理與快取
- 🌐 Flask：RESTful API服務
- 📊 Pandas：資料處理與分析

**前端技術**
- 🌐 HTML5/CSS3：語義化標記與現代樣式
- ⚡ JavaScript ES6+：模組化與異步處理
- 🗺️ Leaflet：輕量級地圖解決方案
- 📱 響應式設計：Bootstrap + Flexbox/Grid

**雲端平台**
- ☁️ Google Cloud Platform：完整雲端解決方案
- 🐳 Docker：容器化部署
- 🚀 Cloud Run：無伺服器容器平台
- 📊 Cloud Monitoring：系統監控與告警

## 🚀 快速開始

### 環境需求

- Python 3.9 或更高版本
- Docker & Docker Compose
- Redis Server
- Google Cloud SDK（用於部署）

### 安裝步驟

1. **克隆專案**
```bash
git clone https://github.com/sixvacation/workflows.git
```

2. **設置虛擬環境**
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. **安裝依賴套件**
```bash
pip install -r requirements.txt
```

4. **啟動Redis服務**
```bash
# 使用Docker
docker run -d --name redis -p 6379:6379 redis:alpine

# 或使用Docker Compose
docker-compose up -d redis
```

5. **配置環境變數**
```bash
cp .env.example .env
# 編輯 .env 檔案，設置必要的API金鑰
```

6. **啟動Celery Worker**
```bash
celery -A celery_config worker --loglevel=info
```

7. **執行爬蟲任務**
```bash
python main.py
```

8. **啟動網站服務**
```bash
cd frontend
python -m http.server 8000
```

現在訪問 `http://localhost:8000` 即可查看旅遊網站！

## 📊 資料蒐集

### 支援的資料來源

| 資料類型 | 來源網站 | 蒐集範圍 | 資料欄位 |
|---------|---------|---------|---------|
| 🍽️ 米其林餐廳 | [guide.michelin.com](https://guide.michelin.com/tw/zh_TW/restaurants) | 台南、高雄、屏東 | 餐廳名稱、菜系、地址、電話、圖片 |
| 🥘 必比登推薦 | 自動搜尋發現 | 台南、高雄、屏東 | 餐廳名稱、菜系、地址、電話、圖片 |
| 🏛️ 旅遊景點 | [taiwan.net.tw](https://www.taiwan.net.tw/m1.aspx?sNo=0001016) | 台南、高雄、屏東 | 景點名稱、經緯度、圖片、交通路線 |
| 🎪 旅遊活動 | [taiwan.net.tw](https://www.taiwan.net.tw/m1.aspx?sNo=0001016) | 台南、高雄、屏東 | 活動名稱、時間、地點、描述 |
| 🗺️ 旅遊行程 | [taiwan.net.tw](https://www.taiwan.net.tw/m1.aspx?sNo=0001016) | 台南、高雄、屏東 | 行程名稱、天數、景點、交通 |

### 資料品質保證

- ✅ **地址標準化**：統一地址格式並驗證座標準確性
- ✅ **電話驗證**：確保聯絡資訊的有效性
- ✅ **重複清理**：智能去重演算法
- ✅ **分類標準化**：統一菜系分類和餐廳類型

## 🌐 網站功能

### 🍽️ 美食指南系統
- 米其林星級餐廳查詢和詳細資訊展示
- 必比登推薦餐廳的互動式瀏覽
- 支援城市、菜系、價位等多維度篩選
- 餐廳地圖定位和導航功能

### 🗺️ 景點導覽服務
- 基於Leaflet的互動式地圖系統
- 景點詳細介紹和高解析度圖片展示
- 即時交通路線規劃和大眾運輸指引
- 景點評分和遊客評論整合

### 🌤️ 即時資訊整合
- 串接TDX平台的大眾運輸即時資訊
- 整合中央氣象署天氣預報API
- 公車、台鐵、高鐵時刻表查詢
- 即時路況和交通異常通知

## ☁️ GCP部署

### 部署架構

```
Internet ──▶ Cloud Load Balancer ──▶ Cloud Run ──▶ Cloud SQL
                      │                    │
                      ▼                    ▼
              Cloud CDN              Cloud Storage
                      │                    │
                      ▼                    ▼
            Static Assets          Crawler Data
```

### 自動化部署

1. **設置GCP專案**
```bash
gcloud config set project YOUR_PROJECT_ID
gcloud auth login
```

2. **執行Terraform部署**
```bash
cd gcp_deployment/terraform
terraform init
terraform plan
terraform apply
```

3. **使用Cloud Build部署**
```bash
gcloud builds submit --config=cloudbuild.yaml
```

### 監控與告警

- 📊 **效能監控**：回應時間、錯誤率、資源使用率
- 🚨 **智能告警**：異常檢測與自動通知
- 📈 **成本追蹤**：預算控制與使用分析
- 🔧 **自動修復**：故障自動恢復機制

## 📈 監控與維護

### 系統監控指標

- **爬蟲效能**：成功率、回應時間、資料品質
- **API服務**：請求量、錯誤率、延遲時間
- **資源使用**：CPU、記憶體、網路頻寬
- **成本控制**：每日、每月預算追蹤

### 維護作業

- 🔄 **自動更新**：定時執行爬蟲任務
- 🧹 **資料清理**：過期資料自動清除
- 🔧 **效能調優**：基於監控數據的自動優化
- 📋 **健康檢查**：系統狀態定期檢測

## 🤝 貢獻指南

我們歡迎社群貢獻！請查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解詳細的貢獻指南。

### 開發流程

1. Fork 這個專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

### 程式碼規範

- 遵循 PEP 8 Python 程式碼風格
- 使用 ESLint 進行 JavaScript 程式碼檢查
- 編寫完整的測試案例
- 維護詳細的程式碼文件

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 📞 聯絡資訊

- **專案維護者**：[sixvacation]
- **Email**：sixvacation@gmail.com
- **專案網址**：[https://github.com/username/taiwan-south-tourism-crawler
](https://github.com/sixvacation)
## 🙏 致謝

感謝以下組織和服務提供的支援：

- [米其林指南](https://guide.michelin.com/) - 提供高品質餐廳評鑑資料
- [交通部觀光署](https://www.taiwan.net.tw/) - 提供豐富的旅遊資訊
- [TDX運輸資料流通服務](https://tdx.transportdata.tw/) - 提供即時交通資訊API
- [中央氣象署](https://opendata.cwb.gov.tw/) - 提供準確的天氣預報服務
- [Google Cloud Platform](https://cloud.google.com/) - 提供穩定的雲端服務平台

---

⭐ 如果這個專案對您有幫助，請給我們一個星星！

[![forthebadge made-with-python](http://ForTheBadge.com/images/badges/made-with-python.svg)](https://www.python.org/)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
