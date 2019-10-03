import {styleLoad} from './style-loading.js';
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

function writeHwList(element, arrTasks, subjectName, compHW){
  let writeSubj = true
    for(let i = arrTasks.length - 1; i >= 0; i--) {
      if( (arrTasks[i].taskForStudents.length > 0) && (arrTasks[i].taskForStudents[0].completion == compHW)) {
        if (writeSubj) {
          element.innerHTML += `<tr class="subject"> <td colspan="2">${subjectName}</td></tr> `;
          writeSubj = false;
        }
        element.innerHTML += `<tr class="tasks"><td class="comp-date"> ${checkCompDate(arrTasks[i].completionDate)} </td> <td> ${arrTasks[i].task} </td> </tr>`;
        arrTasks.splice(i, 1);
      }
    }   
}

let openH2 = document.getElementsByClassName("toggleH2")[0];
let form = document.forms[0];
form.onclick = toggleHw;

function toggleHw(e){
  let selectedH2 = e.target.closest("h2");
  if (selectedH2 !== openH2 ) {
    openH2.classList.toggle("toggleH2");
    selectedH2.classList.toggle("toggleH2");
    let attributeOpen= openH2.getAttribute("data-toggle");
    let attributeClose = selectedH2.getAttribute("data-toggle");
    let openDiv = document.getElementsByClassName(attributeOpen)[0];
    openDiv.classList.toggle("close");
    let closeDiv = document.getElementsByClassName(attributeClose)[0];
    closeDiv.classList.toggle("close");
    openH2 = selectedH2;
  }
}


let lastName = getQueryVariable('st'); 
const studentQuery = `
      {
        students (where:{lastName: "${lastName}"}){
          firstName
          lastName
          subjectOnCourses {
            subject{
              subjectName          
              }
            tasks {
              task
              completionDate
              taskForStudents{
                completion
              }
            }
          }
          house {
            houseName
            backgroundImg {
              url
            }
          }
       }
      }`;
let student;
axios.post(url, {query: studentQuery})
.then(response => {
  student = response.data.data.students[0];
  console.log(student);
  styleLoad(student, 0);
  let taskList = document.getElementById("task-list");
  let compTaskList = document.getElementById("completed-task-list");
  let compDate;
  let arrTasks;
  for (let subjOnCourse of student.subjectOnCourses) {
    arrTasks = subjOnCourse.tasks;
    if( arrTasks.length > 0) {
      writeHwList(taskList, arrTasks, subjOnCourse.subject.subjectName, null);
      if (arrTasks.length > 0) {
        writeHwList(compTaskList, arrTasks, subjOnCourse.subject.subjectName, true);
      }
    }
  }  

})  

