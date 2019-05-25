var LivingCreatures = require("./LivingCreature.js");

module.exports = class Lava extends LivingCreatures {
    constructor(x, y, index) {
        super(x, y, index);
        this.timer = 0;
    }
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(ch) {
        /*this.getNewCordinates();
        return super.chooseCell(ch
            );*/
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] != ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    atackPoint() {
        this.timer++;
        var newCell = Random(this.chooseCell(4))
        if (this.timer >= 10 && newCell != undefined) {
            if (newCell[0] >= 0 && newCell[0] < matrix[0].length && newCell[1] >= 0 && newCell[1] < matrix[0].length) {
                if (matrix[newCell[1]][newCell[0]] == 1) {
                    for (var i in grassArr) {
                        if (grassArr[i].x == newCell[0] && grassArr[i].y == newCell[1]) {
                            grassArr.splice(i, 1);
                        }
                    }
                }else if (matrix[newCell[1]][newCell[0]] == 2) {
                    for (var i in grasseaterArr) {
                        if (grasseaterArr[i].x == newCell[0] && grasseaterArr[i].y == newCell[1]) {
                            grasseaterArr.splice(i, 1);
                        }
                    }
                }else if (matrix[newCell[1]][newCell[0]] == 3) {
                    for (var i in predatorArr) {
                        if (predatorArr[i].x == newCell[0] && predatorArr[i].y == newCell[1]) {
                            predatorArr.splice(i, 1);
                        }
                    }
                }else if (matrix[newCell[1]][newCell[0]] == 5) {
                    for (var i in waterArr) {
                        if (waterArr[i].x == newCell[0] && waterArr[i].y == newCell[1]) {
                            waterArr.splice(i, 1);
                        }
                    }
                }
                matrix[this.y][this.x] = 0;
                matrix[newCell[1]][newCell[0]] = this.index;
                this.x = newCell[0];
                this.y = newCell[1];
            }
        }
    }
}