from flask import Flask, request, jsonify
from async_web_crawler import AsyncWebCrawler

app = Flask(__name__)

@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({"error": "URL is required"}), 400

    crawler = AsyncWebCrawler()
    results = crawler.scrape(url)

    return jsonify(results)

if __name__ == '__main__':
    app.run(port=5001)
