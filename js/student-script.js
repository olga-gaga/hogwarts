import {styleLoad, sortingArrByDate} from './style-loading.js';
import {getQueryVariable} from './queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

let lastName = getQueryVariable('st'); 
const studentQuery = `
      {
        students (where:{lastName:"${lastName}"}){
          house{
            backgroundImg{
              url
            }
          }
          img{
            url
          }
          taskForStudents{
            completion
            task{
              task
              completionDate
              subjectOnCourse{
                subjectName
              }
            }
          }
        }
      }`;
styleLoad(1, 1);
let student;
axios.post(url, {query: studentQuery})
.then(response => {
    student = response.data.data.students[0];
    if (!student) {
      window.location.replace('error404.html');
    }
    document.getElementById("img").innerHTML += `<img id="profile-photo" src="${student.img.url}"/> `;
    document.body.style.background = "url(" + student.house.backgroundImg.url + ")";
    let a = document.getElementsByClassName("sections");
    for (let item of a) {
        item.href += `?st=${lastName}`;
    }
    let timeLeft;
    let taskList = document.getElementById("task-list");
    let noTasks=true;
    let arrTasks = student.taskForStudents;
    sortingArrByDate(arrTasks);
    for (let item of arrTasks){
        if (item.completion !== true){
          noTasks = false;
          let compDate = new Date( item.task.completionDate);
          timeLeft = Math.ceil((compDate.getTime() - Date.now()) / (1000 * 3600 * 24));
          if ( timeLeft <= 3) {
            taskList.innerHTML += `<li> <span>${item.task.subjectOnCourse.subjectName}</span>: ${item.task.task}</li>`
          }
      }
    }
    if (noTasks) {
      document.getElementById("completion-date").innerHTML += `<span>Заданий, у которых приближается срок сдачи, нет! Поздравляем!</span>`
    }
})	
