import os
from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)

# app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

my_channels = {"Main Channel"}
# messages = ...

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/rooms")
def rooms():
    return render_template("rooms.html", my_channels=my_channels)

@app.route("/channels", methods=['POST'])
def channels():
    new_channel = request.form.get('new_channel')
    my_channels.add(new_channel)
    return redirect(url_for("rooms"))

@app.route("/messages", methods=['GET','POST'])
def messages():
    if request.method == 'GET':
        messages = ["test1", "test2"]
        return jsonify({"user": "User", "date": "xx-xx-xxxx", "messages":messages})
