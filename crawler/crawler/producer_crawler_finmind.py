from crawler.tasks_crawler_finmind import crawler_finmind

# for 迴圈, 可一次發送多個任務
for stock_id in ["2330", "0050", "2317", "0056", "00713"]:
    print(stock_id)
    crawler_finmind.delay(stock_id=stock_id)
