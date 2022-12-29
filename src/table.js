class Lab{
    constructor(id, name, task1, task2=0, task3=0, task4=0, points) {
        this.id = id;
        this.name = name;
        this.task1 = task1;
        this.task2 = task2;
        this.task3 = task3;
        this.task4 = task4;
        this.points = points;
    }
}

class Table {
    constructor() {
        this.arr = new Array();
        this.lastID = 0;
    }
    AddStudent(stud)
    {
        this.arr.push(stud);
        this.lastID++;
    }
    DeleteStudentById(id)
    {
        const ind = this.arr.findIndex(el => el.id == id);
        if (ind!=-1) this.arr.splice(ind, 1);
    }
    SortByPoints() {
        this.arr.sort(compare);
    }
}
function compare(a, b) {
    let p1 = Number(a);
    let p2 = Number(b);
    if (p1<p2) {
        return -1;
    }
    if (p1>p2) {
        return 1;
    }
    return 0;
}


export {Lab}
export {Table}
export {compare}