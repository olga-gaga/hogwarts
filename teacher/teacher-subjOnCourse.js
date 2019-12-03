import {styleLoad} from './teacher-style-loading.js';
import {getQueryVariable} from './teacher-queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

let information = getQueryVariable('tSub'); 
let informArr = information.split("+");
let lastName = informArr[0];
const teacherQuery = `
      {
        teachers (where:{lastName: "${lastName}"}){
          firstName
          lastName
          subjectOnCourses{
            subjectName
            courseName
          }
       }
      }`;

const subjectOnCourseQuery = `
      {
        subjectOnCourses (where:{id: "${informArr[1]}"}){
            subjectName
            courseName
            tasks {
              id
              task
              completionDate
            }
          }
      }`;

function checkCompDate(date) {
  let compDate = new Date(date);
  let day = compDate.getDate();
  let month = compDate.getMonth()+1;
  let strCompDate = "";
  if (day < 10) {
    strCompDate += "0";
  }
  strCompDate += day +".";
  if (month < 10){
    strCompDate += "0";
  }
  strCompDate += month;
  return strCompDate;
}

let teacher;
let title=document.getElementsByTagName("title")[0];
axios.post(url, {query: teacherQuery})
.then(response => {
  teacher = response.data.data.teachers[0];
  styleLoad(teacher, 1, 1);
  title.innerHTML = teacher.firstName + " "+ teacher.lastName;
});

let subjOnCourse;
axios.post(url, {query: subjectOnCourseQuery})
.then(response => {
  let task = document.getElementById("tasks");
  subjOnCourse = response.data.data.subjectOnCourses[0];
  document.getElementById("subject").innerHTML = subjOnCourse.subjectName +  " на " +subjOnCourse.courseName + " курсе";
  title.innerHTML += " - " + subjOnCourse.subjectName + " на " + subjOnCourse.courseName + " курсе";
  if(subjOnCourse.tasks.length > 0) {
        let arrTasks = subjOnCourse.tasks;
        if(arrTasks > 1) {
          arrTasks.sort(
          function (a, b) {
            let compDateA = new Date(a.task.completionDate);
            let compDateB = new Date(b.task.completionDate);
            let time = 1000 * 3600 * 24;
            return Math.ceil((compDateA.getTime() - Date.now()) / time) - Math.ceil((compDateB.getTime() - Date.now()) / time);;
          });
        }
        for(let item of arrTasks) {
          tasks.innerHTML +=`<tr> <td class="comp-date"> ${checkCompDate(item.completionDate)} </td> 
        <td class="task"> ${item.task} </td> <td class="button"> <a href="changeTaskList.html?a=edit+${item.id}"> Edit </a></td> <td class="button"> 
        <a href="changeTaskList.html?a=delete+${item.id}" target="_blank">Delete</a> </td> </tr>`;
        }
      }
      else{

      }
});



