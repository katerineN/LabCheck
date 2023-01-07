import {compare} from "../src/table";

function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();

}

class Barchart
{
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.colors = ["#a55ca5","#67b6c7", "#bccd7a","#eb9743"];
        this.padding = 20;
        this.gridScale = 1;
        this.gridColor = "#555454";
    }
    draw(mapData)
    {
        //чистим
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        //создаем массив ключей и сортируем его
        let sortKey = new Array();
        let iterKey = mapData.keys();
        for (let i = 0; i<mapData.size;i++)
            sortKey.push(iterKey.next().value);
        sortKey = sortKey.sort(compare);

        let maxValue = 0;
        for (let val of mapData.values()) { maxValue = Math.max(maxValue,val); }
        let canvasActualHeight = this.canvas.height - this.padding * 2;
        let canvasActualWidth = this.canvas.width - this.padding * 2;

        //рисуем горизонтальные линии
        let gridValue = 0;
        while (gridValue <= maxValue)
        {
            let gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.padding;
            drawLine(this.ctx,0,gridY,this.canvas.width,gridY,this.gridColor);
            //и горизонтальные метки
            this.ctx.save();
            this.ctx.fillStyle = this.gridColor;
            this.ctx.textBaseline="bottom";
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillText(gridValue, 10,gridY - 2);
            this.ctx.restore();
            gridValue+=this.gridScale;
        }

        //рисуем столбики
        let barIndex = 0;
        let barSize = (canvasActualWidth)/mapData.size;
        const coef = Math.round(canvasActualHeight /maxValue);
        sortKey.forEach(key => {
            let barHeight = coef * mapData.get(key);
            drawBar(this.ctx,
                this.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.padding,
                barSize, barHeight, this.colors[barIndex%this.colors.length]
            );
            barIndex++;
        });

        //маркеры по горизонтали 2
        barIndex = 0;
        let y = canvasActualHeight + this.padding+15;
        let x = this.padding+2;
        sortKey.forEach(key => {
            this.ctx.fillText(key, x, y);
            barIndex++;
            x+= barSize;
        });
    }
}

export {Barchart}