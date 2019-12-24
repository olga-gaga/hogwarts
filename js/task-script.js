import {styleLoad, checkCompDate, sortingArrByDate, toggleH2} from './style-loading.js';
import {getQueryVariable} from './queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

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
          house{
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
styleLoad(true, true);
let student;
axios.post(url, {query: studentQuery})
.then(response => {
  student = response.data.data.students[0];
  
  document.body.style.background = "url(" + student.house.backgroundImg.url + ")";
  let taskList = document.getElementById("task-list");
  let compTaskList = document.getElementById("completed-task-list");
  let arrTasks = student.taskForStudents;
  sortingArrByDate(arrTasks);
  for(let item of arrTasks){
    if (item.completion){
      writeHwList(compTaskList, item);
    }
    else{
      writeHwList(taskList, item);
    }
  }
});

