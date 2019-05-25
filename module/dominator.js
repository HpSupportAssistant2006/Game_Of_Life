var LivingCreature = require("./LivingCreature.js");

module.exports = class Dominator extends LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    dominate() {
        if (this.x != matrix.length) {
            newCell = [this.y, this.x + 1]
            matrix[newCell[0]][newCell[1]] = this.index;
            matrix[this.y][this.x] = 0;
            this.y = newCell[0];
            this.x = newCell[1];
        }else{
            matrix[this.y][this.x] = 0;
            for(var i in dominatorArr){
                if(dominatorArr[i].x = this.x && dominatorArr[i].y == this.y){
                    dominatorArr.splice(i,1);
                }
            } 
        }
    }
}