from flask import Flask, request, jsonify
from gpt4all import GPT4All

app = Flask(__name__)
model = GPT4All("path/to/model")

@app.route('/generate-response', methods=['POST'])
def generate_response():
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"error": "Question is required"}), 400

    response = model.generate(question)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(port=5001)
