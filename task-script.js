import {styleLoad} from 'style-loading.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
function getQueryVariable(variable) 
{
   let query = window.location.search.substring(1);
   let vars = query.split("&");
   for (let i=0;i<vars.length;i++) {
       let pair = vars[i].split("=");
       if(pair[0] === variable){return pair[1];}
   }
   return(false);
}

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

let lastName = getQueryVariable('st'); 
const studentQuery = `
      {
        students (where:{lastName:"${lastName}"}){
          firstName
          lastName
          subjectOnCourses {
            tasks{
                completionDate
                task
              }
            subject{
              subjectName
            }
            courseBooks{
                title
                author
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
 /* document.body.style.background = "url(" + student.house.backgroundImg.url + ")";
  document.body.style.backgroundSize = "cover";
  let mainPage = document.getElementById("main-page");
  mainPage.classList.toggle(student.house.houseName);
  let titles = document.getElementById("titles");
  titles.innerHTML += ` <h1 id="profile-name"> ${student.firstName} ${student.lastName} </h1> `;
  */
  let taskList = document.getElementById("task-list");
  let compDate;
  
  for (let subjOnCourse of student.subjectOnCourses) {
    if(subjOnCourse.tasks.length > 0) {
      taskList.innerHTML += `<tr class="subject"> <td colspan="2">${subjOnCourse.subject.subjectName}</td></tr> `;
      for(let itemTask of subjOnCourse.tasks){
        taskList.innerHTML += `<tr class="tasks"><td class="comp-date"> ${checkCompDate(itemTask.completionDate)} </td> <td> ${itemTask.task} </td> </tr>`;
      }
    }
  }
/*

 for (let item of student.subjectOnCourses){
    if(item.tasks.length > 0) {
      taskList.innerHTML += `<h3 class="subject">${item.subject.subjectName}</h3>`;
      for (let task of item.tasks){
        compDate = new Date(task.completionDate);
        taskList.innerHTML += `<p><span class="tasks"><span class="comp-date">${checkCompDate(task.completionDate)} </span> - ${task.task}</span></p>`;
      }
    }
  }   */
})  

