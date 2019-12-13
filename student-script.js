import {styleLoad} from './style-loading.js';
import {getQueryVariable} from './queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

let lastName = getQueryVariable('st'); 
const studentQuery = `
      {
        students (where:{lastName:"${lastName}"}){
          firstName
          lastName
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
          house {
            houseName
            backgroundImg {
              url
            }
          }
          img {
            url
          }
       }
      }`;
let student;
axios.post(url, {query: studentQuery})
.then(response => {
    student = response.data.data.students[0];
    console.log(student);
    if (!student) {
      window.location.replace('error404.html');
    }
    styleLoad(student, 1, 1);
    document.getElementsByTagName("title")[0].textContent = document.getElementById("profile-name").textContent + " - " + document.getElementById("position").textContent;
    let img = document.getElementById("img");
    img.innerHTML += `<img id="profile-photo" src="${student.img.url}"/> `;
    let a = document.getElementsByClassName("sections");
    for (let item of a) {
        item.href += `?st=${lastName}`;
    }
    let timeLeft;
    let taskList = document.getElementById("task-list");
    let noTasks=true;
    let arrTasks = student.taskForStudents;
    arrTasks.sort(
      function (a, b) {
        let compDateA = new Date(a.task.completionDate);
        let compDateB = new Date(b.task.completionDate);
        let time = 1000 * 3600 * 24;
        return Math.ceil((compDateA.getTime() - Date.now()) / time) - Math.ceil((compDateB.getTime() - Date.now()) / time);;
    });
    for (let item of arrTasks){
        if (item.completion !== true){
          noTasks = false;
          let compDate = new Date( item.task.completionDate);
          timeLeft = Math.ceil((compDate.getTime() - Date.now()) / (1000 * 3600 * 24));
          if ( timeLeft <= 3) {
            taskList.innerHTML += `<li> <span>${item.task.subjectOnCourse.subject.subjectName}</span>: ${item.task.task}</li>`
          }
      }
    }
    if (noTasks) {
      document.getElementById("completion-date").innerHTML += `<span>Заданий, у которых приближается срок сдачи, нет! Поздравляем!</span>`
    }
})	
