import {styleLoad} from './style-loading.js';
import {toggleH2} from './style-loading.js';
import {getQueryVariable} from './queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
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

function writeHwList(element, item){
   element.innerHTML +=`<tr> <td class="comp-date"> ${checkCompDate(item.task.completionDate)} </td>  
   <td class="subject"> ${item.task.subjectOnCourse.subject.subjectName} </td> <td class="task"> ${item.task.task} </td> </tr>`;
}

let openH2 = document.getElementsByClassName("toggleH2")[0];
let form = document.forms[0];
form.onclick = (e => openH2 = toggleH2(e, openH2));

let lastName = getQueryVariable('st'); 
const studentQuery = `
      {
        students (where:{lastName: "${lastName}"}){
          firstName
          lastName
          house{
            houseName
            backgroundImg{
              url
            }
          }
          taskForStudents{
            completion
            task{
              task
              completionDate
              subjectOnCourse{
                subject{
                  subjectName
                }
              }
            }
          }
         
       }
      }`;
let student;
axios.post(url, {query: studentQuery})
.then(response => {
  student = response.data.data.students[0];
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
  }
  

})  

