from flask import Flask, request, jsonify
from pathlib import Path
import json

app = Flask(__name__)

ISSUES_FILE = Path("issues.json")

def load_issues():
    return json.loads(ISSUES_FILE.read_text())

def save_issues(issues):
    ISSUES_FILE.write_text(json.dumps(issues))


# This route adds a new issue
@app.route('/issues', methods=['POST'])
def post_data():
    data = request.get_json()
    issues = load_issues()
    new_issue = {
        "id": len(issues) + 1,
        "message": data["message"]
    }
    # add new issue to the current issues and save it to json file
    issues.append(new_issue)
    save_issues(issues)
    return "", 201


# This route gets all issues
@app.route('/issues', methods=['GET'])
def get_data():
    issues = load_issues()

    return jsonify(issues), 200

# run program
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8015, debug=True)