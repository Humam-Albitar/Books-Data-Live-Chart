require("dotenv/config")
const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});

const PORT = process.env.PORT || 3000;
const { getAllBooksObjects,saveRandomBook,generateRandomBook,getRandomInt } = require('./controllers/controllersBooks');
const resJSON = require("./utils/resJSON");

io.on("connection", (socket) => {
    console.log("Client connected");
    dataUpdate(socket);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    // Handle other socket.io events here
});

function dataUpdate(socket) {
    getAllBooksObjects()
        .then(books => {
            socket.emit('dataupdate', books);
        })
        .catch(err => {
            console.error('Error updating data:', err);
        })
        .finally(() => {
            setTimeout(() => {
                dataUpdate(socket);
            }, 2000);
        });
}

http.listen(PORT, () => {
    setInterval(() => {
        let book = generateRandomBook();
        saveRandomBook(book);
    }, 20000);
    console.log(`Server listening on port ${PORT}`);
});