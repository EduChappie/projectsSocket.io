const express = require("express");
const path = require("path");
const app = express();

// Definição do protocolo HTTP
const server = require("http").createServer(app);
const io = require("socket.io")(server);


app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, "public"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get("/", (req, res) => {
    res.render('index.html');
});

let db = [
    {
        autor: "admin",
        texto: "Seja muito bem vindo"
    },
    {
        autor: "admin",
        texto: ":-)"
    }
]

io.on("connection", socket => {
    console.log("ID conectado: " + socket.id);

    socket.emit("restaurar", db);

    socket.on("newMessage", msgObject => {
        db.push(msgObject);
        socket.broadcast.emit("recebimento", msgObject);
    })
})

const port = 4041;
server.listen(port, console.log("Ligado!"));
