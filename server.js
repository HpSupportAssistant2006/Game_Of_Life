var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
/*-----getting code modules-----*/
Grass = require("./module/grass.js");
GrassEater = require("./module/grassEater.js");
Predator = require("./module/predator.js");
Lava = require("./module/lava.js");
Water = require("./module/water.js");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("port is runninng")

});

var weather = "spring";
var weatherInit = 1;

grassArr = [];
grasseaterArr = [];
predatorArr = [];
lavaArr = [];
waterArr = [];

grassBurn = 0;
grassEaterBurn = 0;
predatorBurn = 0;
lavaBurn = 0;
waterBurn = 0;
dominationInit = 0;
weatherChangeInit = 0;
doArmag = false;

io.on("armagedeon", function (bul) {
    doArmag = bul;
    dominationInit++;
});

Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

var w = 60;
var h = 70;

function generateMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 100);
            if (r < 20) r = 0;
            else if (r < 40) r = 1;
            else if (r < 55) r = 2;
            else if (r < 70) r = 3;
            else if (r < 85) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

matrix = generateMatrix(w, h);

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y, 1));
            grassBurn++;
        }
        else if (matrix[y][x] == 2) {
            grasseaterArr.push(new GrassEater(x, y, 2));
            grassEaterBurn++;
        }
        else if (matrix[y][x] == 3) {
            predatorArr.push(new Predator(x, y, 3));
            predatorBurn++;
        }
        else if (matrix[y][x] == 4) {
            lavaArr.push(new Lava(x, y, 4));
            lavaBurn++;
        }
        else if (matrix[y][x] == 5) {
            waterArr.push(new Water(x, y, 5));
            waterBurn++;
        }
    }
}

function drawServer() {
    if (doArmag != true) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
        if (weather != "winter") {
            for (var i in grasseaterArr) {
                grasseaterArr[i].move();
                grasseaterArr[i].mul();
                grasseaterArr[i].eat();
                grasseaterArr[i].die();
            }
        }
        for (var i in predatorArr) {
            predatorArr[i].move();
            predatorArr[i].mul();
            predatorArr[i].eat();
            predatorArr[i].die();
        }
        for (var i in lavaArr) {
            lavaArr[i].atackPoint();
        }
        if (weather != "winter") {
            for (var i in waterArr) {
                waterArr[i].flow();
            }
        }
    }
    io.on('connection', function (socket) {
        socket.on("Sxmvec", function (arr) {
            if (arr[0] > 0 && arr[1] > 0) {
                matrix[arr[1]][arr[1]] = 7;
            }
        });
    });
    io.sockets.emit("matrix", matrix);
}

function drawWeather() {
    weatherInit++;
    if (weatherInit == 5) {
        weatherChangeInit++;
        weatherInit = 1;
        weather = "spring";
    } else if (weatherInit == 4) {
        weather = "winter";
    } else if (weatherInit == 3) {
        weather = "autmn";
    } else if (weatherInit == 2) {
        weather = "summer";
    } else if (weatherInit == 1) {
        weather = "spring";
    }
    io.sockets.emit("weather", weather);
}

var obj = { "info": [] };

function main() {
    var file = "Statistics.json";
    obj.info.push({
        "grass init": grassBurn, "grassEater init": grassEaterBurn, "predator init": predatorBurn, "lava init": lavaBurn,
        "water init": waterBurn, "domination init": dominationInit, "weather change init": weatherChangeInit
    });
    fs.writeFileSync(file, JSON.stringify(obj, null, 2))
}

setInterval(drawServer, 1000);
if (doArmag == false) {
    setInterval(drawWeather, 5000);
}
setInterval(main, 5000);

