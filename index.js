const express = require("express");
const http = require("http")
const app = express();
const path = require("path")
const Server = require("socket.io").Server;
const server = http.createServer(app)
const io = new Server(server)

const { engine } = require("express-handlebars")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, './public')))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

const dataProducts = {
    products : [
    {
        id: 1,
        name: "Nike Sportswear",
        price: 1400,
        image: "https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/nike-dunk-256.png",
    }
]}

app.get("/", (req, res) => {
    res.render("index", dataProducts)
})

app.post("/productos", (req, res) => {
    data.products.push({...req.body})
    res.render("index", null)
})

app.get("/productos", (req, res) => {
    res.render("productos", data)
})

io.on('connection', (socket) => {
    console.log("user connected")

    socket.on("addProduct", data =>{
        dataProducts.products.push(data)
        io.sockets.emit("products", dataProducts)
    })
})

server.listen(3000, () => {
    console.log("Listening on port 3000")
})