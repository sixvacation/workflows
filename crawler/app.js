/**
 * 台灣南部旅遊網站 - 主要 JavaScript 功能 (修復版)
 * 包含導航、資料載入、地圖顯示和篩選功能
 */

// 初始化應用程式
document.addEventListener('DOMContentLoaded', function() {
  // 顯示載入狀態
  showLoading();
  
  // 初始化資料
  setTimeout(() => {
    initializeData();
    initializeNavigation();
    initializeMap();
    initializeFilters();
    initializeTransportationTabs();
    initializeSearchFunctions();
    initializeWeatherUpdates();
    
    // 隱藏載入狀態
    hideLoading();
  }, 500);
});

/**
 * 網站資料
 */
const appData = {
  restaurants: [],
  scenicSpots: [],
  activities: [],
  itineraries: []
};

// 載入狀態管理
function showLoading() {
  const sections = document.querySelectorAll('.restaurants-container, .attractions-container, .activities-container, .itineraries-container');
  sections.forEach(section => {
    section.innerHTML = '<div class="loading">載入中...</div>';
  });
}

function hideLoading() {
  // 載入完成，移除載入狀態
  document.querySelectorAll('.loading').forEach(el => el.remove());
}

/**
 * 初始化應用程式資料
 */
function initializeData() {
  // 餐廳資料
  appData.restaurants = [
    {
      name: "阿村牛肉湯", 
      type: "必比登推薦", 
      cuisine: "台灣小吃", 
      location: "台南市中西區保安路", 
      phone: "06-2234567", 
      city: "台南市", 
      cityEn: "tainan", 
      typeEn: "bibgourmand",
      cuisineEn: "taiwanese"
    },
    {
      name: "度小月擔仔麵", 
      type: "必比登推薦", 
      cuisine: "台灣小吃", 
      location: "台南市中西區民族路二段", 
      phone: "06-2237891", 
      city: "台南市", 
      cityEn: "tainan", 
      typeEn: "bibgourmand",
      cuisineEn: "taiwanese"
    },
    {
      name: "Haili", 
      type: "米其林一星", 
      cuisine: "法國菜", 
      location: "高雄市前金區成功一路264-1號2樓", 
      phone: "07-2150559", 
      city: "高雄市", 
      cityEn: "kaohsiung", 
      typeEn: "michelin",
      cuisineEn: "western"
    },
    {
      name: "承 Sho", 
      type: "米其林一星", 
      cuisine: "日本菜", 
      location: "高雄市前鎮區中華五路806號", 
      phone: "07-3456789", 
      city: "高雄市", 
      cityEn: "kaohsiung", 
      typeEn: "michelin",
      cuisineEn: "japanese"
    },
    {
      name: "雋", 
      type: "米其林一星", 
      cuisine: "粵菜", 
      location: "高雄市前鎮區復興四路8號", 
      phone: "07-338-4885", 
      city: "高雄市", 
      cityEn: "kaohsiung", 
      typeEn: "michelin",
      cuisineEn: "chinese"
    },
    {
      name: "錦霞樓", 
      type: "米其林餐盤", 
      cuisine: "台菜", 
      location: "台南市中西區", 
      phone: "06-2890123", 
      city: "台南市", 
      cityEn: "tainan", 
      typeEn: "michelin",
      cuisineEn: "taiwanese"
    },
    {
      name: "邱家生魚片", 
      type: "必比登推薦", 
      cuisine: "海鮮料理", 
      location: "屏東縣東港鎮", 
      phone: "08-8334567", 
      city: "屏東縣", 
      cityEn: "pingtung", 
      typeEn: "bibgourmand",
      cuisineEn: "taiwanese"
    }
  ];

  // 景點資料
  appData.scenicSpots = [
    {
      name: "赤崁樓", 
      city: "台南市", 
      cityEn: "tainan",
      address: "台南市中西區民族路二段212號", 
      latitude: 22.9973, 
      longitude: 120.2025, 
      description: "國定古蹟，荷蘭時期建築遺跡，見證台南四百年歷史", 
      transportation: "搭乘台南市公車至赤崁樓站，步行1分鐘"
    },
    {
      name: "安平古堡", 
      city: "台南市", 
      cityEn: "tainan",
      address: "台南市安平區國勝路82號", 
      latitude: 23.0014, 
      longitude: 120.1606, 
      description: "荷蘭時期熱蘭遮城遺跡，台灣第一座城堡", 
      transportation: "搭乘台南市公車2號至安平古堡站，步行3分鐘"
    },
    {
      name: "孔廟", 
      city: "台南市", 
      cityEn: "tainan",
      address: "台南市中西區南門路2號", 
      latitude: 22.9896, 
      longitude: 120.2066, 
      description: "台灣首學，全台首座孔子廟", 
      transportation: "搭乘台南市公車至孔廟站，步行2分鐘"
    },
    {
      name: "駁二藝術特區", 
      city: "高雄市", 
      cityEn: "kaohsiung",
      address: "高雄市鹽埕區大勇路1號", 
      latitude: 22.6202, 
      longitude: 120.2816, 
      description: "港口倉庫改建的藝術特區，結合藝術與文創", 
      transportation: "搭乘捷運橘線至鹽埕埔站，步行5分鐘"
    },
    {
      name: "愛河", 
      city: "高雄市", 
      cityEn: "kaohsiung",
      address: "高雄市前金區", 
      latitude: 22.6273, 
      longitude: 120.2918, 
      description: "高雄市的生命之河，夜晚燈光璀璨", 
      transportation: "搭乘捷運至市議會站或中央公園站，步行3分鐘"
    },
    {
      name: "旗津海岸公園", 
      city: "高雄市", 
      cityEn: "kaohsiung",
      address: "高雄市旗津區", 
      latitude: 22.6115, 
      longitude: 120.2661, 
      description: "美麗的海岸線風光，享受海風與夕陽", 
      transportation: "搭乘捷運至西子灣站，轉搭渡輪至旗津"
    },
    {
      name: "墾丁國家公園", 
      city: "屏東縣", 
      cityEn: "pingtung",
      address: "屏東縣恆春鎮", 
      latitude: 22.0024, 
      longitude: 120.7946, 
      description: "台灣最南端的國家公園，熱帶風情與珊瑚礁海岸", 
      transportation: "搭乘高鐵至左營站，轉乘墾丁快線"
    },
    {
      name: "四重溪溫泉", 
      city: "屏東縣", 
      cityEn: "pingtung",
      address: "屏東縣車城鄉", 
      latitude: 22.0722, 
      longitude: 120.7042, 
      description: "南台灣著名溫泉區，四季如春的度假勝地", 
      transportation: "搭乘台灣好行或客運至四重溪站"
    }
  ];

  // 活動資料
  appData.activities = [
    {
      name: "台南藝術節", 
      date: "2025-03-01 至 2025-04-30", 
      location: "台南市各文化場館", 
      description: "年度藝術盛會，匯聚國內外優秀藝術作品", 
      city: "台南市", 
      cityEn: "tainan"
    },
    {
      name: "府城文化季", 
      date: "2025-05-01 至 2025-05-31", 
      location: "台南市歷史街區", 
      description: "深度體驗台南古都文化的月度慶典", 
      city: "台南市", 
      cityEn: "tainan"
    },
    {
      name: "高雄燈會", 
      date: "2025-02-01 至 2025-02-28", 
      location: "高雄市愛河沿岸", 
      description: "元宵燈會活動，璀璨燈飾點亮港都夜空", 
      city: "高雄市", 
      cityEn: "kaohsiung"
    },
    {
      name: "高雄港都音樂祭", 
      date: "2025-07-01 至 2025-07-15", 
      location: "高雄市流行音樂中心", 
      description: "夏日音樂盛宴，邀請知名歌手現場演出", 
      city: "高雄市", 
      cityEn: "kaohsiung"
    },
    {
      name: "墾丁音樂季", 
      date: "2025-04-01 至 2025-04-07", 
      location: "屏東縣恆春鎮墾丁", 
      description: "春天音樂祭典，在南國海邊享受音樂", 
      city: "屏東縣", 
      cityEn: "pingtung"
    },
    {
      name: "恆春古城文化節", 
      date: "2025-06-01 至 2025-06-15", 
      location: "屏東縣恆春鎮", 
      description: "古城歷史文化體驗活動", 
      city: "屏東縣", 
      cityEn: "pingtung"
    }
  ];

  // 行程資料
  appData.itineraries = [
    {
      name: "台南歷史文化2日遊", 
      duration: "2天1夜", 
      days: 2,
      cities: ["台南市"], 
      citiesEn: ["tainan"],
      spots: [
        {name: "赤崁樓", latitude: 22.9973, longitude: 120.2025}, 
        {name: "孔廟", latitude: 22.9896, longitude: 120.2066},
        {name: "安平古堡", latitude: 23.0014, longitude: 120.1606}
      ], 
      transportation: "台南市公車、步行",
      description: "深度探索台南古都文化，品嚐道地小吃"
    },
    {
      name: "高雄港都3日遊", 
      duration: "3天2夜", 
      days: 3,
      cities: ["高雄市"], 
      citiesEn: ["kaohsiung"],
      spots: [
        {name: "駁二藝術特區", latitude: 22.6202, longitude: 120.2816}, 
        {name: "愛河", latitude: 22.6273, longitude: 120.2918},
        {name: "旗津海岸公園", latitude: 22.6115, longitude: 120.2661}
      ], 
      transportation: "捷運、渡輪、客運",
      description: "體驗高雄港都風情，享受海港城市魅力"
    },
    {
      name: "南台灣經典5日遊", 
      duration: "5天4夜", 
      days: 5,
      cities: ["台南市", "高雄市", "屏東縣"], 
      citiesEn: ["tainan", "kaohsiung", "pingtung"],
      spots: [
        {name: "台南孔廟", latitude: 22.9896, longitude: 120.2066}, 
        {name: "高雄駁二", latitude: 22.6202, longitude: 120.2816},
        {name: "墾丁國家公園", latitude: 22.0024, longitude: 120.7946}
      ], 
      transportation: "高鐵、台鐵、公車、租車",
      description: "完整體驗南台灣三縣市精華景點"
    },
    {
      name: "屏東自然風光1日遊", 
      duration: "1天", 
      days: 1,
      cities: ["屏東縣"], 
      citiesEn: ["pingtung"],
      spots: [
        {name: "墾丁國家公園", latitude: 22.0024, longitude: 120.7946}
      ], 
      transportation: "租車、觀光巴士",
      description: "享受台灣最南端的自然美景"
    }
  ];

  // 載入資料後初始化顯示
  renderRestaurants();
  renderAttractions();
  renderActivities();
  renderItineraries();
}

/**
 * 初始化導航功能
 */
function initializeNavigation() {
  // 處理導航點擊事件
  const navLinks = document.querySelectorAll('.nav-link, [data-section]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // 防止默認行為
      if (this.tagName === 'A') {
        e.preventDefault();
      }
      
      // 獲取目標區塊
      const targetSectionId = this.getAttribute('data-section');
      if (!targetSectionId) return;
      
      // 顯示載入效果
      showSectionTransition(targetSectionId);
      
      // 延遲切換以顯示載入效果
      setTimeout(() => {
        switchToSection(targetSectionId);
        
        // 處理篩選器
        if (targetSectionId === 'attractions' && this.hasAttribute('data-filter')) {
          const cityFilter = this.getAttribute('data-filter');
          document.getElementById('attraction-city').value = cityFilter;
          filterAttractions();
          updateMapMarkers();
        }
        
        // 滾動到頁面頂部
        window.scrollTo({top: 0, behavior: 'smooth'});
      }, 300);
    });
  });
  
  // 手機選單切換
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      const mainNav = document.querySelector('.main-nav');
      mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    });
  }
}

function showSectionTransition(targetSectionId) {
  const targetSection = document.getElementById(targetSectionId);
  if (targetSection) {
    targetSection.style.opacity = '0.5';
  }
}

function switchToSection(targetSectionId) {
  // 隱藏所有區塊
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
    section.style.opacity = '1';
  });
  
  // 顯示目標區塊
  const targetSection = document.getElementById(targetSectionId);
  targetSection.classList.add('active');
  targetSection.style.opacity = '1';
  
  // 更新導航高亮
  document.querySelectorAll('.nav-link').forEach(navLink => {
    navLink.classList.remove('active');
  });
  
  // 高亮當前選中的導航
  const activeNavLink = document.querySelector(`.nav-link[data-section="${targetSectionId}"]`);
  if (activeNavLink) {
    activeNavLink.classList.add('active');
  }
}

/**
 * 初始化地圖
 */
let map;
let markers = [];

function initializeMap() {
  try {
    // 初始化地圖
    map = L.map('attractions-map').setView([23.0, 120.2], 8);
    
    // 添加地圖圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // 延遲繪製景點標記，確保地圖完全載入
    setTimeout(() => {
      updateMapMarkers();
    }, 1000);
    
  } catch (error) {
    console.error('地圖初始化失敗:', error);
    document.getElementById('attractions-map').innerHTML = '<div class="map-error">地圖載入失敗，請重新整理頁面</div>';
  }
}

/**
 * 更新地圖標記
 */
function updateMapMarkers() {
  if (!map) return;
  
  try {
    // 清除舊標記
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // 獲取篩選值
    const cityFilter = document.getElementById('attraction-city').value;
    
    // 篩選景點
    const filteredSpots = appData.scenicSpots.filter(spot => {
      return cityFilter === 'all' || spot.cityEn === cityFilter;
    });
    
    // 添加新標記
    filteredSpots.forEach(spot => {
      const marker = L.marker([spot.latitude, spot.longitude])
        .addTo(map)
        .bindPopup(`
          <div style="min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; color: #1fb8cd;">${spot.name}</h4>
            <p style="margin: 0 0 8px 0; font-size: 14px;">${spot.description}</p>
            <p style="margin: 0; font-size: 12px; color: #666;">${spot.transportation}</p>
          </div>
        `);
      
      markers.push(marker);
    });
    
    // 如果有景點，調整地圖視圖
    if (filteredSpots.length > 0 && markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  } catch (error) {
    console.error('地圖標記更新失敗:', error);
  }
}

/**
 * 初始化篩選器事件
 */
function initializeFilters() {
  // 餐廳篩選
  document.getElementById('restaurant-city').addEventListener('change', debounce(filterRestaurants, 300));
  document.getElementById('restaurant-type').addEventListener('change', debounce(filterRestaurants, 300));
  document.getElementById('restaurant-cuisine').addEventListener('change', debounce(filterRestaurants, 300));
  
  // 景點篩選
  document.getElementById('attraction-city').addEventListener('change', debounce(function() {
    filterAttractions();
    updateMapMarkers();
  }, 300));
  
  // 活動篩選
  document.getElementById('activity-city').addEventListener('change', debounce(filterActivities, 300));
  
  // 行程篩選
  document.getElementById('itinerary-duration').addEventListener('change', debounce(filterItineraries, 300));
  document.getElementById('itinerary-city').addEventListener('change', debounce(filterItineraries, 300));
}

// 防抖函數
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 初始化交通選項切換
 */
function initializeTransportationTabs() {
  const transportationTypes = document.querySelectorAll('.transportation-type');
  
  transportationTypes.forEach(tab => {
    tab.addEventListener('click', function() {
      // 移除所有標籤的活動狀態
      transportationTypes.forEach(t => t.classList.remove('active'));
      
      // 添加當前標籤的活動狀態
      this.classList.add('active');
      
      // 隱藏所有面板
      document.querySelectorAll('.transportation-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      
      // 顯示選中的面板
      const targetPanel = this.getAttribute('data-type');
      const panel = document.querySelector(`.transportation-panel[data-panel="${targetPanel}"]`);
      if (panel) {
        panel.classList.add('active');
      }
    });
  });
}

/**
 * 初始化搜尋功能
 */
function initializeSearchFunctions() {
  // 公車搜尋
  document.getElementById('search-bus').addEventListener('click', function() {
    const busRoute = document.getElementById('bus-route').value.trim();
    if (busRoute) {
      showSearchResult('公車', `路線 ${busRoute}`, '即時資訊查詢功能開發中，將整合實際公車API');
    } else {
      alert('請輸入公車路線或站牌名稱');
    }
  });
  
  // 台鐵搜尋
  document.getElementById('search-train').addEventListener('click', function() {
    const from = document.getElementById('train-from').value;
    const to = document.getElementById('train-to').value;
    
    if (from && to) {
      showSearchResult('台鐵', `${from} → ${to}`, '班次查詢功能開發中，將整合台鐵官方API');
    } else {
      alert('請選擇出發站和抵達站');
    }
  });
  
  // 高鐵搜尋
  document.getElementById('search-hsr').addEventListener('click', function() {
    const from = document.getElementById('hsr-from').value;
    const to = document.getElementById('hsr-to').value;
    
    if (from && to) {
      showSearchResult('高鐵', `${from} → ${to}`, '班次查詢功能開發中，將整合高鐵官方API');
    } else {
      alert('請選擇出發站和抵達站');
    }
  });
  
  // 捷運搜尋
  document.getElementById('search-mrt').addEventListener('click', function() {
    const line = document.getElementById('mrt-line').value;
    
    if (line) {
      const lineNames = {
        'red': '紅線',
        'orange': '橘線', 
        'light': '輕軌'
      };
      showSearchResult('高雄捷運', lineNames[line], '路線資訊查詢功能開發中，將整合捷運官方API');
    } else {
      alert('請選擇捷運路線');
    }
  });
}

function showSearchResult(type, query, message) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
    background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;
  `;
  
  modal.innerHTML = `
    <div style="background: white; padding: 24px; border-radius: 12px; max-width: 400px; text-align: center;">
      <h3 style="margin: 0 0 16px 0; color: #1fb8cd;">${type}查詢</h3>
      <p style="margin: 0 0 16px 0;"><strong>查詢內容：</strong>${query}</p>
      <p style="margin: 0 0 24px 0; color: #666;">${message}</p>
      <button onclick="this.closest('.modal').remove()" 
              style="background: #1fb8cd; color: white; border: none; padding: 8px 24px; border-radius: 6px; cursor: pointer;">
        確定
      </button>
    </div>
  `;
  
  modal.className = 'modal';
  document.body.appendChild(modal);
  
  // 點擊背景關閉
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

/**
 * 模擬天氣資料更新
 */
function initializeWeatherUpdates() {
  // 初始化真實的天氣資料
  updateWeatherData();
  
  // 模擬定時更新天氣資料 (每30秒更新一次以便測試)
  setInterval(() => {
    updateWeatherData();
  }, 30000);
}

function updateWeatherData() {
  const weatherData = {
    tainan: {
      temp: Math.floor(Math.random() * 8) + 28, // 28-35°C  
      weather: ['晴朗', '晴時多雲', '多雲'][Math.floor(Math.random() * 3)],
      icon: 'sun'
    },
    kaohsiung: {
      temp: Math.floor(Math.random() * 8) + 29, // 29-36°C
      weather: ['晴朗', '晴時多雲', '多雲'][Math.floor(Math.random() * 3)],
      icon: 'sun'
    },
    pingtung: {
      temp: Math.floor(Math.random() * 7) + 27, // 27-33°C
      weather: ['晴朗', '多雲', '陰天'][Math.floor(Math.random() * 3)],
      icon: 'cloud'
    }
  };
  
  Object.keys(weatherData).forEach(city => {
    const card = document.querySelector(`.weather-card[data-city="${city}"]`);
    if (card) {
      const data = weatherData[city];
      card.querySelector('.weather-temp').textContent = `${data.temp}°C`;
      card.querySelector('.weather-desc').textContent = data.weather;
    }
  });
}

/**
 * 渲染餐廳列表
 */
function renderRestaurants() {
  const container = document.querySelector('.restaurants-container');
  if (!container) return;
  
  // 顯示載入狀態
  container.innerHTML = '<div class="loading">載入餐廳資料中...</div>';
  
  setTimeout(() => {
    // 篩選
    const cityFilter = document.getElementById('restaurant-city').value;
    const typeFilter = document.getElementById('restaurant-type').value;
    const cuisineFilter = document.getElementById('restaurant-cuisine').value;
    
    const filteredRestaurants = appData.restaurants.filter(restaurant => {
      const cityMatch = cityFilter === 'all' || restaurant.cityEn === cityFilter;
      const typeMatch = typeFilter === 'all' || restaurant.typeEn === typeFilter;
      const cuisineMatch = cuisineFilter === 'all' || restaurant.cuisineEn === cuisineFilter;
      
      return cityMatch && typeMatch && cuisineMatch;
    });
    
    // 清空容器
    container.innerHTML = '';
    
    // 如果沒有符合條件的餐廳
    if (filteredRestaurants.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: #666;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px; opacity: 0.5;"><circle cx="12" cy="12" r="10"></circle><path d="m9 9 6 6"></path><path d="m15 9-6 6"></path></svg>
          <h3>沒有符合條件的餐廳</h3>
          <p>請嘗試調整篩選條件</p>
        </div>
      `;
      return;
    }
    
    // 渲染餐廳卡片
    filteredRestaurants.forEach(restaurant => {
      const cardHTML = `
        <div class="restaurant-card" data-cuisine="${restaurant.cuisineEn}">
          <div class="card-header">
            <h3 class="card-title">${restaurant.name}</h3>
            <span class="card-badge ${restaurant.typeEn}">${restaurant.type}</span>
          </div>
          <div class="card-info">
            <div class="card-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
              ${restaurant.cuisine}
            </div>
            <div class="card-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${restaurant.location}
            </div>
            <div class="card-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              ${restaurant.phone}
            </div>
          </div>
          <div class="card-actions">
            <button class="btn btn--sm btn--outline bookmark-btn" data-type="restaurant" data-id="${restaurant.name}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              收藏
            </button>
            <button class="btn btn--sm btn--outline share-btn" data-name="${restaurant.name}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              分享
            </button>
          </div>
        </div>
      `;
      
      container.innerHTML += cardHTML;
    });
    
    // 綁定收藏和分享按鈕事件
    attachCardActions();
  }, 500);
}

/**
 * 渲染景點列表
 */
function renderAttractions() {
  const container = document.querySelector('.attractions-container');
  if (!container) return;
  
  // 顯示載入狀態
  container.innerHTML = '<div class="loading">載入景點資料中...</div>';
  
  setTimeout(() => {
    // 篩選
    const cityFilter = document.getElementById('attraction-city').value;
    
    const filteredAttractions = appData.scenicSpots.filter(spot => {
      return cityFilter === 'all' || spot.cityEn === cityFilter;
    });
    
    // 清空容器
    container.innerHTML = '';
    
    // 如果沒有符合條件的景點
    if (filteredAttractions.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: #666;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px; opacity: 0.5;"><circle cx="12" cy="12" r="10"></circle><path d="m9 9 6 6"></path><path d="m15 9-6 6"></path></svg>
          <h3>沒有符合條件的景點</h3>
          <p>請嘗試調整篩選條件</p>
        </div>
      `;
      return;
    }
    
    // 渲染景點卡片
    filteredAttractions.forEach(spot => {
      const cardHTML = `
        <div class="attraction-card" data-lat="${spot.latitude}" data-lng="${spot.longitude}">
          <div class="card-header">
            <h3 class="card-title">${spot.name}</h3>
            <span class="card-badge">${spot.city}</span>
          </div>
          <div class="card-info">
            <div class="card-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${spot.address}
            </div>
          </div>
          <div class="card-description">
            ${spot.description}
          </div>
          <div class="card-info">
            <div class="card-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-3m-5 0v16"/><path d="M5 11h14"/></svg>
              ${spot.transportation}
            </div>
          </div>
          <div class="card-actions">
            <button class="btn btn--sm btn--primary map-btn" data-lat="${spot.latitude}" data-lng="${spot.longitude}" data-name="${spot.name}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              在地圖上顯示
            </button>
            <button class="btn btn--sm btn--outline bookmark-btn" data-type="attraction" data-id="${spot.name}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              收藏
            </button>
          </div>
        </div>
      `;
      
      container.innerHTML += cardHTML;
    });
    
    // 綁定地圖按鈕事件
    attachMapActions();
    
    // 綁定收藏按鈕事件
    attachCardActions();
  }, 500);
}

/**
 * 綁定地圖相關按鈕
 */
function attachMapActions() {
  document.querySelectorAll('.map-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const lat = parseFloat(this.getAttribute('data-lat'));
      const lng = parseFloat(this.getAttribute('data-lng'));
      const name = this.getAttribute('data-name');
      
      if (map) {
        // 移動地圖到指定位置並放大
        map.setView([lat, lng], 15);
        
        // 找到對應的標記並打開其彈出窗口
        markers.forEach(marker => {
          const markerLatLng = marker.getLatLng();
          if (Math.abs(markerLatLng.lat - lat) < 0.001 && Math.abs(markerLatLng.lng - lng) < 0.001) {
            marker.openPopup();
          }
        });
        
        // 滾動到地圖
        document.querySelector('.attractions-map-container').scrollIntoView({behavior: 'smooth'});
        
        // 顯示成功訊息
        showToast(`已在地圖上定位 ${name}`);
      } else {
        showToast('地圖尚未載入完成，請稍後再試', 'error');
      }
    });
  });
}

/**
 * 顯示提示訊息
 */
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 1001;
    background: ${type === 'success' ? '#1fb8cd' : '#db4545'}; color: white;
    padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transform: translateX(100%); transition: transform 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // 動畫顯示
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // 自動隱藏
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * 渲染活動列表
 */
function renderActivities() {
  const container = document.querySelector('.activities-container');
  if (!container) return;
  
  // 顯示載入狀態
  container.innerHTML = '<div class="loading">載入活動資料中...</div>';
  
  setTimeout(() => {
    // 篩選
    const cityFilter = document.getElementById('activity-city').value;
    
    const filteredActivities = appData.activities.filter(activity => {
      return cityFilter === 'all' || activity.cityEn === cityFilter;
    });
    
    // 清空容器
    container.innerHTML = '';
    
    // 如果沒有符合條件的活動
    if (filteredActivities.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: #666;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px; opacity: 0.5;"><circle cx="12" cy="12" r="10"></circle><path d="m9 9 6 6"></path><path d="m15 9-6 6"></path></svg>
          <h3>沒有符合條件的活動</h3>
          <p>請嘗試調整篩選條件</p>
        </div>
      `;
      return;
    }
    
    // 渲染活動卡片
    filteredActivities.forEach(activity => {
      const cardHTML = `
        <div class="activity-card">
          <div class="card-header">
            <h3 class="card-title">${activity.name}</h3>
            <span class="card-badge">${activity.city}</span>
          </div>
          <div class="card-info">
            <div class="card-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ${activity.date}
            </div>
            <div class="card-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${activity.location}
            </div>
          </div>
          <div class="card-description">
            ${activity.description}
          </div>
          <div class="card-actions">
            <button class="btn btn--sm btn--outline bookmark-btn" data-type="activity" data-id="${activity.name}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              收藏
            </button>
            <button class="btn btn--sm btn--outline share-btn" data-name="${activity.name}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              分享
            </button>
          </div>
        </div>
      `;
      
      container.innerHTML += cardHTML;
    });
    
    // 綁定收藏和分享按鈕事件
    attachCardActions();
  }, 500);
}

/**
 * 渲染行程列表
 */
function renderItineraries() {
  const container = document.querySelector('.itineraries-container');
  if (!container) return;
  
  // 顯示載入狀態
  container.innerHTML = '<div class="loading">載入行程資料中...</div>';
  
  setTimeout(() => {
    // 篩選
    const durationFilter = document.getElementById('itinerary-duration').value;
    const cityFilter = document.getElementById('itinerary-city').value;
    
    const filteredItineraries = appData.itineraries.filter(itinerary => {
      let durationMatch = true;
      if (durationFilter !== 'all') {
        if (durationFilter === '1-2' && itinerary.days <= 2) durationMatch = true;
        else if (durationFilter === '3-4' && itinerary.days >= 3 && itinerary.days <= 4) durationMatch = true;
        else if (durationFilter === '5+' && itinerary.days >= 5) durationMatch = true;
        else durationMatch = false;
      }
      
      let cityMatch = true;
      if (cityFilter !== 'all') {
        cityMatch = itinerary.citiesEn.includes(cityFilter);
      }
      
      return durationMatch && cityMatch;
    });
    
    // 清空容器
    container.innerHTML = '';
    
    // 如果沒有符合條件的行程
    if (filteredItineraries.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: #666;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px; opacity: 0.5;"><circle cx="12" cy="12" r="10"></circle><path d="m9 9 6 6"></path><path d="m15 9-6 6"></path></svg>
          <h3>沒有符合條件的行程</h3>
          <p>請嘗試調整篩選條件</p>
        </div>
      `;
      return;
    }
    
    // 渲染行程卡片
    filteredItineraries.forEach(itinerary => {
      // 製作景點列表
      const spotsList = itinerary.spots.map(spot => `<span class="itinerary-spot">${spot.name}</span>`).join('');
      
      // 製作城市列表
      const citiesList = itinerary.cities.join('、');
      
      const cardHTML = `
        <div class="itinerary-card">
          <div class="card-header">
            <h3 class="card-title">${itinerary.name}</h3>
            <span class="card-badge">${itinerary.duration}</span>
          </div>
          <div class="card-info">
            <div class="card-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${citiesList}
            </div>
            <div class="card-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-3m-5 0v16"/><path d="M5 11h14"/></svg>
              ${itinerary.transportation}
            </div>
          </div>
          <div class="card-description">
            ${itinerary.description}
          </div>
          <div class="itinerary-spots">
            ${spotsList}
          </div>
          <div class="card-actions">
            <button class="btn btn--sm btn--primary view-itinerary-btn" data-name="${itinerary.name}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"/><path d="M12 2v20"/><path d="m4.5 9.5 2.5-2.5 2.5 2.5"/><path d="m14.5 14.5 2.5 2.5 2.5-2.5"/></svg>
              查看行程詳情
            </button>
            <button class="btn btn--sm btn--outline bookmark-btn" data-type="itinerary" data-id="${itinerary.name}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              收藏
            </button>
          </div>
        </div>
      `;
      
      container.innerHTML += cardHTML;
    });
    
    // 綁定查看行程按鈕事件
    attachItineraryActions();
    
    // 綁定收藏按鈕事件
    attachCardActions();
  }, 500);
}

/**
 * 綁定行程相關按鈕
 */
function attachItineraryActions() {
  document.querySelectorAll('.view-itinerary-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const itineraryName = this.getAttribute('data-name');
      const itinerary = appData.itineraries.find(item => item.name === itineraryName);
      
      if (itinerary) {
        showItineraryDetail(itinerary);
      }
    });
  });
}

function showItineraryDetail(itinerary) {
  const spotsList = itinerary.spots.map(spot => `
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
      ${spot.name}
    </div>
  `).join('');
  
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
    background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;
    overflow-y: auto; padding: 20px;
  `;
  
  modal.innerHTML = `
    <div style="background: white; padding: 32px; border-radius: 12px; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h3 style="margin: 0; color: #1fb8cd; font-size: 24px;">${itinerary.name}</h3>
        <button onclick="this.closest('.modal').remove()" 
                style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">×</button>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
        <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
          <strong style="color: #1fb8cd;">行程天數</strong><br>
          ${itinerary.duration}
        </div>
        <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
          <strong style="color: #1fb8cd;">涵蓋地區</strong><br>
          ${itinerary.cities.join('、')}
        </div>
        <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
          <strong style="color: #1fb8cd;">交通方式</strong><br>
          ${itinerary.transportation}
        </div>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h4 style="color: #1fb8cd; margin-bottom: 16px;">行程描述</h4>
        <p style="line-height: 1.6; color: #666;">${itinerary.description}</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h4 style="color: #1fb8cd; margin-bottom: 16px;">主要景點</h4>
        ${spotsList}
      </div>
      
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button onclick="alert('行程下載功能開發中')" 
                style="background: #1fb8cd; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; flex: 1; min-width: 120px;">
          下載行程
        </button>
        <button onclick="alert('行程分享功能開發中')" 
                style="background: transparent; color: #1fb8cd; border: 1px solid #1fb8cd; padding: 12px 24px; border-radius: 6px; cursor: pointer; flex: 1; min-width: 120px;">
          分享行程
        </button>
      </div>
    </div>
  `;
  
  modal.className = 'modal';
  document.body.appendChild(modal);
  
  // 點擊背景關閉
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

/**
 * 綁定卡片收藏和分享按鈕
 */
function attachCardActions() {
  // 收藏按鈕
  document.querySelectorAll('.bookmark-btn:not(.attached)').forEach(btn => {
    btn.classList.add('attached');
    btn.addEventListener('click', function() {
      const type = this.getAttribute('data-type');
      const id = this.getAttribute('data-id');
      
      // 切換收藏狀態
      this.classList.toggle('active');
      
      if (this.classList.contains('active')) {
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          已收藏
        `;
        showToast(`已收藏${getTypeText(type)}: ${id}`);
      } else {
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          收藏
        `;
        showToast(`已取消收藏: ${id}`);
      }
    });
  });
  
  // 分享按鈕
  document.querySelectorAll('.share-btn:not(.attached)').forEach(btn => {
    btn.classList.add('attached');
    btn.addEventListener('click', function() {
      const name = this.getAttribute('data-name') || 
                   this.closest('.restaurant-card, .activity-card')?.querySelector('.card-title').textContent;
      showToast(`已複製 ${name} 的分享連結`);
    });
  });
}

function getTypeText(type) {
  const typeMap = {
    'restaurant': '餐廳',
    'attraction': '景點', 
    'activity': '活動',
    'itinerary': '行程'
  };
  return typeMap[type] || '項目';
}

/**
 * 篩選函數
 */
function filterRestaurants() {
  renderRestaurants();
}

function filterAttractions() {
  renderAttractions();
}

function filterActivities() {
  renderActivities();
}

function filterItineraries() {
  renderItineraries();
}