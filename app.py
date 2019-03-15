from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

my_channels = {"Main Channel"}
messages = ["test1", "test2"]

# Not all pages get refreshed after creating a new channel
# Messages need to be stored
# Do not allow empty messages
# Personal touch, different styling of messages when username is localstorage
# limit message list to 100 items
# delete comments and unnecessary routes
# load saved channels

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

@socketio.on('send message')
def handle_message(data):
    username = data["username"]
    message = data["message"]
    date = datetime.now().strftime("%a %H:%M ")
    new_message = message + ' (' + username + ', '+ date +')'
    room = data['room']
    emit("cast message", new_message, room=room)

@socketio.on('json')
def handle_json(json):
    send(json, json=True)

@socketio.on('my event')
def handle_my_custom_event(json):
    emit('my response', json)

# https://flask-socketio.readthedocs.io/en/latest/
# cleanup @socketio.on decorators and add chat room functionality

@socketio.on('join')
def on_join(data):
    username = data["username"]
    room = data["room"]
    join_room(room)
    message = username + ' has joined room ' + room
#    emit("cast message", message, broadcast=True)
    emit('cast message', message, room=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)


if __name__ == '__main__':
    socketio.run(app)
