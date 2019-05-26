var LivingCreatures = require("./LivingCreature.js");

module.exports = class Water extends LivingCreatures {
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
    chooseCell(character) {
        this.getNewCordinates();
        return super.chooseCell(character);
    }

    flow() {
        var character;
        if(Math.round(Math.random()) == 0){
            character = 4;
        }else{
            character = 5;
        };
        this.timer++;
        var newCell = Random(this.chooseCell(character));
        if(newCell != undefined && this.x != undefined && this.y != undefined){
            if (this.timer >= 20) {
                if (newCell[0] >= 0 && newCell[0] < matrix[0].length && newCell[1] >= 0 && newCell[1] < matrix[0].length) {
                    matrix[newCell[1]][newCell[0]] = this.index;
                    matrix[this.y][this.x] = Math.round(Math.random() * 3);
                    if (matrix[this.y][this.x] == 1) {
                        var grass = new Grass(this.x, this.y, 1);
                        grassArr.push(grass);
                        grassBurn++;
                    }
                    if (matrix[this.y][this.x] == 2) {
                        var grassEater = new GrassEater(this.x, this.y, 2);
                        grasseaterArr.push(grassEater);
                        grassEaterBurn++;
                    }
                    if (matrix[this.y][this.x] == 3) {
                        var predator = new Predator(this.x, this.y, 3);
                        predatorArr.push(predator);
                        predatorBurn++;
                    }
                    this.x = newCell[0];
                    this.y = newCell[1];
                }
            }
        }
    }
}