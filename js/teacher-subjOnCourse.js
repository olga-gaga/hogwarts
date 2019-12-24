import {styleLoad, sortingArrByDate, checkCompDate} from './style-loading.js';
import {getQueryVariable} from './queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
let id = getQueryVariable("id");

const subjectOnCourseQuery = `
      {
        subjectOnCourses (where:{id: "${id}"}){
            id
            subjectName
            courseName
            tasks {
              id
              task
              completionDate
            }
          }
      }`;

styleLoad(true, false);
let subjOnCourse;
axios.post(url, {query: subjectOnCourseQuery})
.then(response => {
  let task = document.getElementById("tasks");
  subjOnCourse = response.data.data.subjectOnCourses[0];
  document.getElementById("subject").innerHTML = subjOnCourse.subjectName +  " на " +subjOnCourse.courseName + " курсе";
  document.getElementsByTagName("title")[0].innerHTML += " - " + subjOnCourse.subjectName + " на " + subjOnCourse.courseName + " курсе";
  document.getElementById("add").href += `&id=${subjOnCourse.id}`;
  if(subjOnCourse.tasks.length > 0) {
        let arrTasks = subjOnCourse.tasks;
        sortingArrByDate(arrTasks);
        for(let item of arrTasks) {
          tasks.innerHTML +=`<tr> <td class="comp-date"> ${checkCompDate(item.completionDate)} </td> 
        <td class="task"> ${item.task} </td> <td class="button"> <a href="changeTaskList.html?a=edit&id=${item.id}"> Edit </a></td> <td class="button"> 
        <a href="changeTaskList.html?a=delete&id=${item.id}" target="_blank">Delete</a> </td> </tr>`;
        }
      }
      else{

      }
});



