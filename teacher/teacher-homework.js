import {styleLoad} from './teacher-style-loading.js';
import {getQueryVariable} from './teacher-queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

let lastName = getQueryVariable('t'); 
const studentQuery = `
      {
        teachers (where:{lastName: "${lastName}"}){
          firstName
          lastName
          subjectOnCourses{
            id
            subjectName
            courseName
          }
       }
      }`;


let teacher;
axios.post(url, {query: studentQuery})
.then(response => {
  teacher = response.data.data.teachers[0];
  styleLoad(teacher, 1, 1);
  let listTasks = document.getElementById("yourCourses");
  for (let item of teacher.subjectOnCourses) {
    listTasks.innerHTML += `<li><a href="subjOnCourse.html?tSub=${teacher.lastName}+${item.id}" target="_blank">${item.subjectName + " на " + item.courseName + " курсе"} </a> </li>`
  }
 /* student = response.data.data.students[0];
  styleLoad(student, 1, 2);
  let taskList = document.getElementById("task-list");
  let compTaskList = document.getElementById("completed-task-list");
  let arrTasks = student.taskForStudents;
  arrTasks.sort(
    function (a, b) {
      let compDateA = new Date(a.task.completionDate);
      let compDateB = new Date(b.task.completionDate);
      let time = 1000 * 3600 * 24;
      return Math.ceil((compDateA.getTime() - Date.now()) / time) - Math.ceil((compDateB.getTime() - Date.now()) / time);;
    })
  for(let item of arrTasks){
    if (item.completion){
      writeHwList(compTaskList, item);
    }
    else{
      writeHwList(taskList, item);
    }
  }*/
});  

