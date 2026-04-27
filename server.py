from flask import Flask
import subprocess

app = Flask(__name__)

@app.route("/run", methods=["POST"])
def run_script():
    # run your automation script
    subprocess.Popen(["python", "auto_download.py"])
    return "Automation started. Do not close the browser window."

if __name__ == "__main__":
    app.run(debug=True)
