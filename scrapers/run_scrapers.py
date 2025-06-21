
import os
import pandas as pd
import json
import time
from datetime import datetime

# 匯入各爬蟲模組
from michelin_scraper import MichelinScraper
from bib_gourmand_scraper import BibGourmandScraper
from tourism_scraper import TourismScraper

def run_all_scrapers():
    """執行所有爬蟲程式"""

    # 建立資料集目錄
    data_dir = "datasets"
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

    print("=== 南部旅遊資料爬蟲程式 ===\n")
    print("執行時間:", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    print("\n1. 爬取米其林餐廳資料...")

    # 1. 爬取米其林餐廳資料
    michelin_scraper = MichelinScraper()
    michelin_scraper.scrape_taiwan_restaurants()
    michelin_df = michelin_scraper.save_to_csv(os.path.join(data_dir, "michelin_restaurants.csv"))

    print("\n2. 爬取必比登餐廳資料...")

    # 2. 爬取必比登餐廳資料
    bib_scraper = BibGourmandScraper()
    bib_scraper.scrape_bib_gourmand_restaurants()
    bib_df = bib_scraper.save_to_csv(os.path.join(data_dir, "bib_gourmand_restaurants.csv"))

    print("\n3. 爬取旅遊景點、活動及行程資料...")

    # 3. 爬取旅遊資料
    tourism_scraper = TourismScraper()
    tourism_scraper.get_scenic_spots()
    tourism_scraper.get_activities()
    tourism_scraper.get_itineraries()

    # 儲存旅遊資料
    spots_df = tourism_scraper.save_scenic_spots_csv(os.path.join(data_dir, "scenic_spots.csv"))
    activities_df = tourism_scraper.save_activities_csv(os.path.join(data_dir, "tourism_activities.csv"))
    itineraries_df = tourism_scraper.save_itineraries_csv(os.path.join(data_dir, "tourism_itineraries.csv"))

    # 合併餐廳資料
    print("\n4. 合併所有餐廳資料...")
    all_restaurants = pd.concat([michelin_df, bib_df], ignore_index=True)
    all_restaurants.to_csv(os.path.join(data_dir, "all_restaurants.csv"), index=False, encoding='utf-8-sig')
    print(f"已合併 {len(all_restaurants)} 筆餐廳資料到 all_restaurants.csv")

    # 建立資料說明文件
    print("\n5. 建立資料說明文件...")
    data_info = {
        "meta": {
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "datasets": [
                {
                    "name": "michelin_restaurants.csv",
                    "description": "米其林餐廳資料",
                    "rows": len(michelin_df),
                    "columns": list(michelin_df.columns)
                },
                {
                    "name": "bib_gourmand_restaurants.csv",
                    "description": "必比登推薦餐廳資料",
                    "rows": len(bib_df),
                    "columns": list(bib_df.columns)
                },
                {
                    "name": "all_restaurants.csv",
                    "description": "所有餐廳資料(米其林+必比登)",
                    "rows": len(all_restaurants),
                    "columns": list(all_restaurants.columns)
                },
                {
                    "name": "scenic_spots.csv",
                    "description": "旅遊景點資料",
                    "rows": len(spots_df),
                    "columns": list(spots_df.columns)
                },
                {
                    "name": "tourism_activities.csv",
                    "description": "旅遊活動資料",
                    "rows": len(activities_df),
                    "columns": list(activities_df.columns)
                },
                {
                    "name": "tourism_itineraries.csv",
                    "description": "旅遊行程資料",
                    "rows": len(itineraries_df),
                    "columns": list(itineraries_df.columns)
                }
            ]
        }
    }

    with open(os.path.join(data_dir, "datasets_info.json"), 'w', encoding='utf-8') as f:
        json.dump(data_info, f, ensure_ascii=False, indent=2)

    print("\n所有資料集已生成完成！")
    print(f"資料集存放路徑: {os.path.abspath(data_dir)}")

    # 回傳各資料集的DataFrame，供後續處理使用
    return {
        "michelin_restaurants": michelin_df,
        "bib_gourmand_restaurants": bib_df,
        "all_restaurants": all_restaurants,
        "scenic_spots": spots_df,
        "tourism_activities": activities_df,
        "tourism_itineraries": itineraries_df
    }

if __name__ == "__main__":
    run_all_scrapers()
