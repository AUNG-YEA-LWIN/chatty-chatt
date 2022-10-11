require('dotenv').config();
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/usersRoutes.js');
const messagesRoutes = require('./routes/messagesRoutes.js');
const app = express();
const socket = require('socket.io');
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(compression());

app.use('/api/auth', usersRoutes); 
app.use('/api/messages', messagesRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('database connected')
}).catch((err) =>  {
    console.log(err.message);
})

const server = app.listen(PORT,() =>     {
    console.log(`Server is running on port ${PORT}`)
});

const io = socket(server,{
    cors:{
        origin: "http://localhost:3000",
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on("connection",(socket) => {
    global.chatSocket = socket;
    socket.on("add-user",(userId) => {
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    });
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}