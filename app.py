from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, emit, join_room
from datetime import datetime
from collections import defaultdict

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

my_channels = {"Main Channel"}
all_messages = defaultdict(list)



@app.route("/")
def index():
    return render_template("index.html", my_channels=my_channels)


@app.route("/channels", methods=['POST'])
def channels():
    new_channel = request.form.get('new_channel')
    my_channels.add(new_channel)
    return redirect(url_for("index"))


@socketio.on('send message')
def handle_message(data):
    username = data["username"]
    message = data["message"]
    date = datetime.now().strftime("%a %H:%M ")
    # define unique session id
    sid = request.sid
    new_message = sid+message + ' (' + username + ', '+ date +')'
    # save the message
    room = data['room']
    if len(all_messages[room]) >= 100:
        del all_messages[room][0]
    all_messages[room].append(new_message)
    # print(all_messages)
    emit("cast message", new_message, room=room)


@socketio.on('join')
def on_join(data):
    username = data["username"]
    room = data["room"]
    join_room(room)
    # define unique session id
    sid = request.sid
    message = sid+username + ' has joined room ' + room
    # emit("cast message", message, broadcast=True)
    # send all messages to user joining the channel
    for i in all_messages[room]:
        emit('cast message', i, room=sid)
    emit('cast message', message, room=room)




if __name__ == '__main__':
    socketio.run(app)
