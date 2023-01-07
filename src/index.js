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
    document.getElementById('sortButton').onclick = sortPoints;
    document.getElementById('histButton').onclick = hist;
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

const myCanvas1 = document.getElementById("myCanvas1");
myCanvas1.width = 300;
myCanvas1.height = 300;
let myBarchart1 = new Barchart(myCanvas1);

const myCanvas2 = document.getElementById("myCanvas2");
myCanvas2.width = 300;
myCanvas2.height = 300;
let myBarchart2 = new Barchart(myCanvas2);

const myCanvas3 = document.getElementById("myCanvas3");
myCanvas3.width = 300;
myCanvas3.height = 300;
let myBarchart3 = new Barchart(myCanvas3);

const myCanvas4 = document.getElementById("myCanvas4");
myCanvas4.width = 300;
myCanvas4.height = 300;
let myBarchart4 = new Barchart(myCanvas4);

function hist()
{
    let count = Number(document.getElementById('count').value);
    for (let i = 1; i <= count; i++)
    {
        switch (i){
            case 1:
                myBarchart1.draw(orderTasks(i));
                break;
            case 2:
                myBarchart2.draw(orderTasks(i));
                break;
            case 3:
                myBarchart3.draw(orderTasks(i));
                break;
            case 4:
                myBarchart4.draw(orderTasks(i));
                break;
            default:
                Console.log('Error');
                break;
        }
    }
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
    d8.innerHTML = l.avgPoints;
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

function orderTasks(n)
{
    let map1 = new Map();
    let map2 = new Map();
    let map3 = new Map();
    let map4 = new Map();
    switch (n) {
        case 1:
            for (let i = 0; i < table.arr.length; i++)
            {
                let point1 = table.arr[i].task1;
                if (!map1.has(point1)) map1.set(point1, 1);
                else {
                    map1.set(point1, map1.get(point1)+1);
                }
            }
            return map1;
            break;
        case 2:
            for (let i = 0; i< table.arr.length; i++)
            {
                let point = table.arr[i].task2;
                if (!map2.has(point)) map2.set(point, 1);
                else {
                    map2.set(point, map2.get(point)+1);
                }
            }
            return map2;
            break;
        case 3:
            for (let i = 0; i< table.arr.length; i++)
            {
                let point = table.arr[i].task3;
                if (!map3.has(point)) map3.set(point, 1);
                else {
                    map3.set(point, map3.get(point)+1);
                }
            }
            return map3;
            break;
        case 4:
            for (let i = 0; i< table.arr.length; i++)
            {
                let point = table.arr[i].task4;
                if (!map4.has(point)) map4.set(point, 1);
                else {
                    map4.set(point, map4.get(point)+1);
                }
            }
            return map4;
            break;
        default:
            Console.log('Error');
            return ;
    }
}

