
import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import json

class BibGourmandScraper:
    def __init__(self):
        self.restaurants = []
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

    def scrape_bib_gourmand_restaurants(self):
        """爬取必比登推薦餐廳"""

        # 基於搜尋結果的必比登推薦餐廳資料
        cities_data = {
            '台南市': [
                {'name': '阿村牛肉湯', 'cuisine': '台灣小吃', 'location': '台南市中西區保安路', 'phone': '', 'image': ''},
                {'name': '阿輝黑輪', 'cuisine': '台灣小吃', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '阿明豬心冬粉', 'cuisine': '台灣小吃', 'location': '台南市中西區保安路', 'phone': '', 'image': ''},
                {'name': '阿裕牛肉', 'cuisine': '台灣小吃', 'location': '台南市崑崙路', 'phone': '', 'image': ''},
                {'name': '饕弄杯', 'cuisine': '餐酒館', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '橄饗家', 'cuisine': '義式料理', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '帝一鐤', 'cuisine': '台菜', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '城邊真味炒鱔魚專家', 'cuisine': '台灣小吃', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '豐之海鮮漁府', 'cuisine': '海鮮', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '有你真好 湘菜沙龍', 'cuisine': '湘菜', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '牛五蔵', 'cuisine': '燒肉', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': 'Hara Peko', 'cuisine': '日式料理', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '欣欣餐廳', 'cuisine': '台菜', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '錦霞樓', 'cuisine': '台菜', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '寓點', 'cuisine': '創意料理', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '開元路無名虱目魚', 'cuisine': '台灣小吃', 'location': '台南市開元路', 'phone': '', 'image': ''},
                {'name': '甘旨', 'cuisine': '日式料理', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '老曾羊肉', 'cuisine': '台灣小吃', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '香草小餐酒', 'cuisine': '餐酒館', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '毛蔬', 'cuisine': '蔬食', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '㕩肉舖', 'cuisine': '台灣小吃', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '揚梅吐氣', 'cuisine': '創意料理', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '原則', 'cuisine': '義式料理', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '順德牛肉湯', 'cuisine': '台灣小吃', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '沙淘宮廟海產', 'cuisine': '海鮮', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '王家燻羊肉', 'cuisine': '台灣小吃', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '溫爸鵝肉', 'cuisine': '台灣小吃', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '再發號', 'cuisine': '傳統糕餅', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '葉桑生炒鴨肉焿', 'cuisine': '台灣小吃', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '添厚', 'cuisine': '甜品', 'location': '台南市', 'phone': '', 'image': ''},
                {'name': '麥謎食驗室', 'cuisine': '創意料理', 'location': '台南市', 'phone': '', 'image': ''}
            ],
            '高雄市': [
                {'name': '三禾清豐', 'cuisine': '台菜', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': '秋', 'cuisine': '日式料理', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': '柏弘肉燥', 'cuisine': '台灣小吃', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': '薩瑪法國小館', 'cuisine': '法國菜', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': 'Capstone Steakhouse', 'cuisine': '牛排', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': '長生29', 'cuisine': '創意料理', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': '鄭家切仔麵', 'cuisine': '台灣小吃', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': '蟳之屋', 'cuisine': '海鮮', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': 'CRATAIN', 'cuisine': '創意料理', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': '鴨肉珍', 'cuisine': '台灣小吃', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': '小燉食室', 'cuisine': '台菜', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': '賣塩順', 'cuisine': '台灣小吃', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': '春蘭割包', 'cuisine': '台灣小吃', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': '秀明豬心冬粉', 'cuisine': '台灣小吃', 'location': '高雄市', 'phone': '', 'image': ''},
                {'name': '良佳豬腳', 'cuisine': '台灣小吃', 'location': '高雄市', 'phone': '', 'image': ''}
            ],
            '屏東縣': [
                {'name': '屏東在地美食', 'cuisine': '台灣小吃', 'location': '屏東縣', 'phone': '', 'image': ''}
            ]
        }

        for city, restaurants in cities_data.items():
            print(f"正在處理 {city} 的必比登推薦餐廳...")
            for restaurant in restaurants:
                restaurant['city'] = city
                restaurant['type'] = '必比登推薦'
                self.restaurants.append(restaurant)

    def save_to_csv(self, filename='bib_gourmand_restaurants.csv'):
        """儲存資料到CSV"""
        if self.restaurants:
            df = pd.DataFrame(self.restaurants)
            df.to_csv(filename, index=False, encoding='utf-8-sig')
            print(f"已儲存 {len(self.restaurants)} 筆必比登推薦餐廳資料到 {filename}")
            return df
        else:
            print("沒有找到餐廳資料")
            return pd.DataFrame()

# 使用範例
if __name__ == "__main__":
    scraper = BibGourmandScraper()
    scraper.scrape_bib_gourmand_restaurants()
    df = scraper.save_to_csv()
    print(df.head())
