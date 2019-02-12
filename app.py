import os
from flask import Flask, render_template, request, redirect, url_for
# from flask_socketio import SocketIO, emit

app = Flask(__name__)

# app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
# socketio = SocketIO(app)

my_channels = {"Channel1", "Channel2"}

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
