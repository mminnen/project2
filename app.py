from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

my_channels = {"Main Channel"}
messages = ["test1", "test2"]


@app.route("/")
def index():
    return render_template("index.html", my_channels=my_channels)


@app.route("/channels", methods=['POST'])
def channels():
    new_channel = request.form.get('new_channel')
    my_channels.add(new_channel)
    return redirect(url_for("index"))


@app.route("/messages", methods=['GET', 'POST'])
def messages():
    if request.method == 'GET':
                return jsonify({"user": "User", "date": "xx-xx-xxxx", "messages": messages})


if __name__ == '__main__':
    socketio.run(app)