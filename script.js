var side = 20;
var socket = io();
var showCordinates = false;
var doArmagedeon = false;
var clientWeather = "spring";

socket.on("weather", function (w) {
    var weatherText = document.getElementById("weather");
    clientWeather = w;
    weatherText.innerText = clientWeather.charAt(0).toUpperCase() + clientWeather.slice(1);
});

function mousePressed() {
    var x = Math.floor(mouseX / side);
    var y = Math.floor(mouseY / side);
    arr = [x, y];
    socket.emit("Sxmvec", arr)
}

function domination() {
    socket.emit("armagedeon", doArmagedeon);
    if (doArmagedeon == false) {
        doArmagedeon = true;
    } else {
        doArmagedeon = false;
    }
}

function setup() {
    createCanvas(20 * side, 20 * side);
    background('blue');
}

function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                if (doArmagedeon == true) {
                    fill("red");
                } else {
                    fill("grey");
                }
            }
            else if (matrix[y][x] == 1) {
                if (clientWeather == "spring") {
                    if (doArmagedeon == true) {
                        fill("red");
                    } else {
                        fill("green");
                    }
                } else {
                    if (doArmagedeon == true) {
                        fill("red");
                    } else {
                        fill("#06a81a");
                    }
                }
            }
            else if (matrix[y][x] == 2) {
                if (doArmagedeon == true) {
                    fill("red");
                } else {
                    fill("yellow");
                }
            }
            else if (matrix[y][x] == 3) {
                if (doArmagedeon == true) {
                    fill("red");
                } else {
                    fill("#FFB81C");
                }
            }
            else if (matrix[y][x] == 4) {
                if (doArmagedeon == true) {
                    fill("red");
                } else {
                    fill("#cf1020");
                }
            }
            else if (matrix[y][x] == 5) {
                if (clientWeather != "winter") {
                    if (doArmagedeon == true) {
                        fill("red");
                    } else {
                        fill("cyan");
                    }
                } else {
                    if (doArmagedeon == true) {
                        fill("red");
                    } else {
                        fill("#66ffff");
                    }
                }
            }
            else if (matrix[y][x] == 7) {
                fill("white");
            }
            else if (matrix[y][x] == 6) {
                fill("red");
            }
            rect(x * side, y * side, side, side);
        }

        if (showCordinates == true) {
            fill("blue");
            text(x + " " + y, x * side + side / 4, y * side + side / 4);
        }
    }
}

socket.on("matrix", drawMatrix);