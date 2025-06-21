
import requests
import pandas as pd
import json
import time
from datetime import datetime

class TourismScraper:
    def __init__(self):
        self.scenic_spots = []
        self.activities = []
        self.itineraries = []
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

        # 交通部觀光署開放資料API基本網址
        self.base_url = "https://tdx.transportdata.tw/api/basic"

    def get_scenic_spots(self):
        """獲取旅遊景點資料"""
        cities = ['Tainan', 'Kaohsiung', 'PingtungCounty']

        for city in cities:
            city_name = {'Tainan': '台南市', 'Kaohsiung': '高雄市', 'PingtungCounty': '屏東縣'}[city]
            print(f"正在獲取 {city_name} 的旅遊景點...")

            # 使用開放資料的景點資訊
            try:
                # 模擬從API獲取的景點資料
                spots_data = self.get_mock_scenic_spots_data(city_name)

                for spot in spots_data:
                    spot_info = {
                        'name': spot['name'],
                        'city': city_name,
                        'address': spot.get('address', ''),
                        'latitude': spot.get('latitude', 0),
                        'longitude': spot.get('longitude', 0),
                        'description': spot.get('description', ''),
                        'image': spot.get('image', ''),
                        'transportation': spot.get('transportation', '')
                    }
                    self.scenic_spots.append(spot_info)

            except Exception as e:
                print(f"獲取 {city_name} 景點資料時發生錯誤: {e}")

            time.sleep(1)

    def get_mock_scenic_spots_data(self, city):
        """模擬景點資料（實際應用中會從API獲取）"""
        mock_data = {
            '台南市': [
                {
                    'name': '赤崁樓',
                    'address': '台南市中西區民族路二段212號',
                    'latitude': 22.9973,
                    'longitude': 120.2025,
                    'description': '國定古蹟，荷蘭時期建築',
                    'image': '',
                    'transportation': '搭乘台南市公車至赤崁樓站'
                },
                {
                    'name': '安平古堡',
                    'address': '台南市安平區國勝路82號',
                    'latitude': 23.0014,
                    'longitude': 120.1606,
                    'description': '荷蘭時期熱蘭遮城遺跡',
                    'image': '',
                    'transportation': '搭乘台南市公車2號至安平古堡站'
                },
                {
                    'name': '孔廟',
                    'address': '台南市中西區南門路2號',
                    'latitude': 22.9896,
                    'longitude': 120.2066,
                    'description': '全台首學，台灣最早的孔廟',
                    'image': '',
                    'transportation': '搭乘台南市公車至孔廟站'
                },
                {
                    'name': '台南美術館二館',
                    'address': '台南市中西區忠義路二段1號',
                    'latitude': 22.9918,
                    'longitude': 120.2058,
                    'description': '日本建築師坂茂設計的現代美術館',
                    'image': '',
                    'transportation': '步行或搭乘市區公車'
                },
                {
                    'name': '藍晒圖文創園區',
                    'address': '台南市南區西門路一段689巷',
                    'latitude': 22.9824,
                    'longitude': 120.1944,
                    'description': '舊司法宿舍改建的文創園區',
                    'image': '',
                    'transportation': '搭乘台南市公車至文創園區站'
                }
            ],
            '高雄市': [
                {
                    'name': '駁二藝術特區',
                    'address': '高雄市鹽埕區大勇路1號',
                    'latitude': 22.6202,
                    'longitude': 120.2816,
                    'description': '港口倉庫改建的藝術特區',
                    'image': '',
                    'transportation': '搭乘捷運橘線至鹽埕埔站'
                },
                {
                    'name': '佛光山佛陀紀念館',
                    'address': '高雄市大樹區統嶺路1號',
                    'latitude': 22.7539,
                    'longitude': 120.4425,
                    'description': '佛教文化園區',
                    'image': '',
                    'transportation': '搭乘高雄客運或佛光山接駁車'
                },
                {
                    'name': '愛河',
                    'address': '高雄市前金區',
                    'latitude': 22.6273,
                    'longitude': 120.2918,
                    'description': '高雄市的生命之河',
                    'image': '',
                    'transportation': '搭乘捷運至市議會站或中央公園站'
                },
                {
                    'name': '旗津風景區',
                    'address': '高雄市旗津區',
                    'latitude': 22.6158,
                    'longitude': 120.2751,
                    'description': '海岸風光與海鮮美食',
                    'image': '',
                    'transportation': '搭乘渡輪至旗津'
                },
                {
                    'name': '田寮月世界',
                    'address': '高雄市田寮區',
                    'latitude': 22.8675,
                    'longitude': 120.3606,
                    'description': '惡地地形景觀',
                    'image': '',
                    'transportation': '自駕或搭乘觀光巴士'
                }
            ],
            '屏東縣': [
                {
                    'name': '墾丁國家公園',
                    'address': '屏東縣恆春鎮',
                    'latitude': 22.0024,
                    'longitude': 120.7946,
                    'description': '台灣最南端的國家公園',
                    'image': '',
                    'transportation': '搭乘高鐵轉墾丁快線或台灣好行'
                },
                {
                    'name': '鵝鑾鼻燈塔',
                    'address': '屏東縣恆春鎮鵝鑾里鵝鑾路301號',
                    'latitude': 21.9010,
                    'longitude': 120.8517,
                    'description': '台灣最南端的燈塔',
                    'image': '',
                    'transportation': '搭乘墾丁街車或租機車'
                },
                {
                    'name': '六堆客家文化園區',
                    'address': '屏東縣內埔鄉信義路588號',
                    'latitude': 22.6106,
                    'longitude': 120.5703,
                    'description': '展示客家文化的園區',
                    'image': '',
                    'transportation': '搭乘客運至內埔轉乘接駁車'
                },
                {
                    'name': '勝利星村創意生活園區',
                    'address': '屏東縣屏東市青島街106號',
                    'latitude': 22.6698,
                    'longitude': 120.4818,
                    'description': '眷村文化園區',
                    'image': '',
                    'transportation': '搭乘屏東市公車'
                },
                {
                    'name': '下淡水溪舊鐵橋',
                    'address': '屏東縣屏東市',
                    'latitude': 22.6442,
                    'longitude': 120.4894,
                    'description': '日治時期亞洲最長鐵橋',
                    'image': '',
                    'transportation': '搭乘火車至六塊厝站'
                }
            ]
        }
        return mock_data.get(city, [])

    def get_activities(self):
        """獲取旅遊活動資料"""
        cities = ['台南市', '高雄市', '屏東縣']

        for city in cities:
            print(f"正在獲取 {city} 的旅遊活動...")

            # 模擬當期活動資料
            activities_data = {
                '台南市': [
                    {
                        'name': '台南藝術節',
                        'date': '2025-03-01 to 2025-04-30',
                        'location': '台南市各文化場館',
                        'latitude': 22.9973,
                        'longitude': 120.2025,
                        'description': '年度藝術盛會',
                        'image': '',
                        'transportation': '搭乘台南市公車'
                    },
                    {
                        'name': '安平港國家歷史風景區導覽',
                        'date': '每日開放',
                        'location': '台南市安平區',
                        'latitude': 23.0014,
                        'longitude': 120.1606,
                        'description': '歷史文化導覽活動',
                        'image': '',
                        'transportation': '搭乘台南市公車2號'
                    }
                ],
                '高雄市': [
                    {
                        'name': '高雄燈會',
                        'date': '2025-02-01 to 2025-02-28',
                        'location': '高雄市愛河沿岸',
                        'latitude': 22.6273,
                        'longitude': 120.2918,
                        'description': '元宵燈會活動',
                        'image': '',
                        'transportation': '搭乘捷運至中央公園站'
                    },
                    {
                        'name': '佛光山平安燈會',
                        'date': '2025-01-15 to 2025-03-15',
                        'location': '高雄市大樹區佛光山',
                        'latitude': 22.7539,
                        'longitude': 120.4425,
                        'description': '佛教文化燈會',
                        'image': '',
                        'transportation': '搭乘佛光山接駁車'
                    }
                ],
                '屏東縣': [
                    {
                        'name': '墾丁音樂季',
                        'date': '2025-04-01 to 2025-04-07',
                        'location': '屏東縣恆春鎮墾丁',
                        'latitude': 22.0024,
                        'longitude': 120.7946,
                        'description': '春天音樂祭典',
                        'image': '',
                        'transportation': '搭乘墾丁快線'
                    },
                    {
                        'name': '客家文化節',
                        'date': '2025-05-01 to 2025-05-31',
                        'location': '屏東縣內埔鄉',
                        'latitude': 22.6106,
                        'longitude': 120.5703,
                        'description': '客家傳統文化慶典',
                        'image': '',
                        'transportation': '搭乘客運至內埔'
                    }
                ]
            }

            for activity in activities_data.get(city, []):
                activity['city'] = city
                self.activities.append(activity)

    def get_itineraries(self):
        """獲取旅遊行程資料"""
        # 模擬旅遊行程資料
        itineraries_data = [
            {
                'name': '台南歷史文化2日遊',
                'duration': '2天1夜',
                'cities': ['台南市'],
                'spots': [
                    {'name': '赤崁樓', 'latitude': 22.9973, 'longitude': 120.2025},
                    {'name': '孔廟', 'latitude': 22.9896, 'longitude': 120.2066},
                    {'name': '安平古堡', 'latitude': 23.0014, 'longitude': 120.1606}
                ],
                'transportation': '台南市公車、步行',
                'facilities': '各景點均有廁所設施',
                'image': ''
            },
            {
                'name': '高雄港都3日遊',
                'duration': '3天2夜',
                'cities': ['高雄市'],
                'spots': [
                    {'name': '駁二藝術特區', 'latitude': 22.6202, 'longitude': 120.2816},
                    {'name': '愛河', 'latitude': 22.6273, 'longitude': 120.2918},
                    {'name': '旗津風景區', 'latitude': 22.6158, 'longitude': 120.2751},
                    {'name': '佛光山', 'latitude': 22.7539, 'longitude': 120.4425}
                ],
                'transportation': '捷運、渡輪、客運',
                'facilities': '主要景點均有完善設施',
                'image': ''
            },
            {
                'name': '屏東自然生態4日遊',
                'duration': '4天3夜',
                'cities': ['屏東縣'],
                'spots': [
                    {'name': '墾丁國家公園', 'latitude': 22.0024, 'longitude': 120.7946},
                    {'name': '鵝鑾鼻燈塔', 'latitude': 21.9010, 'longitude': 120.8517},
                    {'name': '六堆客家文化園區', 'latitude': 22.6106, 'longitude': 120.5703}
                ],
                'transportation': '墾丁快線、租車、步行',
                'facilities': '遊客中心、停車場、廁所',
                'image': ''
            },
            {
                'name': '南台灣經典5日遊',
                'duration': '5天4夜',
                'cities': ['台南市', '高雄市', '屏東縣'],
                'spots': [
                    {'name': '台南孔廟', 'latitude': 22.9896, 'longitude': 120.2066},
                    {'name': '高雄駁二', 'latitude': 22.6202, 'longitude': 120.2816},
                    {'name': '墾丁海灘', 'latitude': 22.0024, 'longitude': 120.7946}
                ],
                'transportation': '高鐵、台鐵、公車、租車',
                'facilities': '完善的旅遊服務設施',
                'image': ''
            }
        ]

        for itinerary in itineraries_data:
            self.itineraries.append(itinerary)

    def save_scenic_spots_csv(self, filename='scenic_spots.csv'):
        """儲存景點資料到CSV"""
        if self.scenic_spots:
            df = pd.DataFrame(self.scenic_spots)
            df.to_csv(filename, index=False, encoding='utf-8-sig')
            print(f"已儲存 {len(self.scenic_spots)} 筆景點資料到 {filename}")
            return df
        return pd.DataFrame()

    def save_activities_csv(self, filename='tourism_activities.csv'):
        """儲存活動資料到CSV"""
        if self.activities:
            df = pd.DataFrame(self.activities)
            df.to_csv(filename, index=False, encoding='utf-8-sig')
            print(f"已儲存 {len(self.activities)} 筆活動資料到 {filename}")
            return df
        return pd.DataFrame()

    def save_itineraries_csv(self, filename='tourism_itineraries.csv'):
        """儲存行程資料到CSV"""
        if self.itineraries:
            # 將景點資料展開為字串
            for itinerary in self.itineraries:
                itinerary['spots_detail'] = json.dumps(itinerary['spots'], ensure_ascii=False)
                itinerary['cities_list'] = ', '.join(itinerary['cities'])

            df = pd.DataFrame(self.itineraries)
            df.to_csv(filename, index=False, encoding='utf-8-sig')
            print(f"已儲存 {len(self.itineraries)} 筆行程資料到 {filename}")
            return df
        return pd.DataFrame()

# 使用範例
if __name__ == "__main__":
    scraper = TourismScraper()

    # 獲取各種旅遊資料
    scraper.get_scenic_spots()
    scraper.get_activities()
    scraper.get_itineraries()

    # 儲存到CSV
    spots_df = scraper.save_scenic_spots_csv()
    activities_df = scraper.save_activities_csv()
    itineraries_df = scraper.save_itineraries_csv()

    print("\n景點資料範例:")
    print(spots_df.head())
    print("\n活動資料範例:")
    print(activities_df.head())
    print("\n行程資料範例:")
    print(itineraries_df.head())
