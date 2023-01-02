import {Table} from "../src/table";
import {Lab} from "../src/table";
import {Barchart} from "../src/canvas";
import * as Console from "console";


document.addEventListener('DOMContentLoaded',setup);

function setup() {
    document.getElementById('addButtonSt').onclick = addSt;
    //document.getElementById('addButtonTasks').onclick = addTasks;
    document.getElementById('addButtonTasks').onclick = add;
    document.getElementById('deleteButton').onclick = deleteStudent;
    //document.getElementById('sortButton').onclick = sortPoints;
    //document.getElementById('histButton').onclick = hist;
}

//пыталась создать несколько сразу инпутов
function addTasks(){
    var $count = document.getElementById('count').value;
    for (let i = 1; i <= $count; i++) {
        add(i);
    }
}

var i = 1;

//добавление инпута по кнопке
function add(){
    let form = document.getElementsByClassName('deladd')[0];
    let add = document.getElementById('addButtonTasks');
    let count = document.getElementById('count').value;
    //for (let i = 1; i <= $count; i++) {
    if (i <= count) {
        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'task' + i;
        input.placeholder = 'Кол-во баллов задания ' + i;
        form.insertBefore(input, add);
        i++;
    }
        //add = document.getElementById('task' + i);
    //}
}

let table = new Table();

const myCanvas = document.getElementById("myCanvas");
myCanvas.width = 300;
myCanvas.height = 300;
let myBarchart = new Barchart(myCanvas);

function hist()
{
    myBarchart.draw(OrderForeachTime());
}

function sortPoints()
{
    table.SortByPoints();
    redrawTable();
}

function createRow(l)
{
    let row = document.createElement('tr');
    let d1 = document.createElement('td');
    d1.innerHTML = l.id;
    row.appendChild(d1);
    let d2 = document.createElement('td');
    d2.innerHTML = l.name;
    row.appendChild(d2);
    let d3 = document.createElement('td');
    d3.innerHTML = l.task1;
    row.appendChild(d3);
    let d4 = document.createElement('td');
    d4.innerHTML = l.task2;
    row.appendChild(d4);
    let d5 = document.createElement('td');
    d5.innerHTML = l.task3;
    row.appendChild(d5);
    let d6 = document.createElement('td');
    d6.innerHTML = l.task4;
    row.appendChild(d6);
    let d7 = document.createElement('td');
    d7.innerHTML = l.points;
    row.appendChild(d7);
    let d8 = document.createElement('td');
    d8.innerHTML = l.avgPoint;
    row.appendChild(d8);
    return row;
}

function redrawTable()
{
    const tableB = document.querySelector('tbody');
    tableB.remove();
    const tableBody = document.createElement('tbody');
    document.getElementById('table').appendChild(tableBody);
    table.arr.forEach(el => {let row = createRow(el); tableBody.appendChild(row);});
}

function addSt(){
    let f = 1;
    const labnum = document.getElementById('lab').value;
    const t = document.getElementById('table');
    t.caption.innerHTML = "Таблица лабораторной № " + labnum;
    const name = document.getElementById('name').value;
    let count = Number(document.getElementById('count').value);
    let task1, task2, task3, task4, points, avgPoints = 0.0;
    switch (count) {
        case 1:
            task1 = Number(document.getElementById('task1').value);
            task2 = "-";
            task3 = "-";
            task4 = "-";
            points = task1;
            avgPoints = task1;
            break;
        case 2:
            task1 = Number(document.getElementById('task1').value);
            task2 = Number(document.getElementById('task2').value);
            task3 = "-";
            task4 = "-";
            avgPoints = (task1 + task2) / 2.0;
            points = task1 + task2;
            break;
        case 3:
            task1 = Number(document.getElementById('task1').value);
            task2 = Number(document.getElementById('task2').value);
            task3 = Number(document.getElementById('task3').value);
            task4 = "-";
            avgPoints = (task1 + task2 + task3) / 3.0;
            points = task1 + task2 + task3;
            break;
        case 4:
            task1 = Number(document.getElementById('task1').value);
            task2 = Number(document.getElementById('task2').value);
            task3 = Number(document.getElementById('task3').value);
            task4 = Number(document.getElementById('task3').value);
            avgPoints = (task1 + task2 + task3 + task4) / 4.0;
            points = task1 + task2 + task3 + task4;
            break;
        default:
            Console.log('Error');
    }
    let l = new Lab(table.lastID+1, name, task1, task2, task3, task4, points, avgPoints);
    if (f) table.AddStudent(l);
    redrawTable();
}

function deleteStudent(){
    const deleteId = Number(document.getElementById('deleteSt').value);
    table.DeleteStudentById(deleteId);
    redrawTable();
}

function OrderForeachTime()
{
    let map = new Map();
    for (let i = 0; i< table.arr.length; i++)
    {
        let time = table.arr[i].time;
        if (!map.has(time)) map.set(time,1);
        else {
            map.set(time,map.get(time)+1);
        }
    }
    return map;
}

