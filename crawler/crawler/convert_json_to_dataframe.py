# 匯入 pandas 套件，用於處理表格資料
import pandas as pd

# 主程式入口點
if __name__ == "__main__":
    # 定義一筆 JSON 格式的資料，內容為股票的每日交易資訊
    json_data = {
        "date": "2024-01-02",  # 交易日期
        "stock_id": "2330",  # 股票代號（例：台積電）
        "Trading_Volume": 27997826,  # 成交股數
        "Trading_money": 16549619798,  # 成交金額（新台幣）
        "open": 590.0,  # 開盤價
        "max": 593.0,  # 最高價
        "min": 589.0,  # 最低價
        "close": 593.0,  # 收盤價
        "spread": 0.0,  # 漲跌幅（收盤價與前一天收盤價的差）
        "Trading_turnover": 20667,  # 成交筆數
    }

    # 輸出原始 JSON 資料
    print(json_data)

    # 將 JSON 轉換為 pandas 的 DataFrame（表格資料）
    df = pd.DataFrame([json_data])

    # 輸出 DataFrame 結構，方便觀察轉換後的結果
    print(df)
