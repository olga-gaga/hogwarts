import {styleLoad} from './style-loading.js';
import {getQueryVariable} from './queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
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
    styleLoad(student, 0)
    let img = document.getElementById("img");
    img.innerHTML += `<img id="profile-photo" src="${student.img.url}"/> `;
    let a = document.getElementsByClassName("sections");
    for (let item of a) {
        item.href += `?st=${lastName}`;
    }
    let timeLeft;
    let taskList = document.getElementById("task-list");
    for (let item of student.subjectOnCourses){
      for (let task of item.tasks){
        let compDate = new Date(task.completionDate);
        timeLeft = Math.ceil((compDate.getTime() - Date.now()) / (1000 * 3600 * 24));
        if (timeLeft > 0 && timeLeft <= 3) {
          taskList.innerHTML += `<li> <span>${item.subject.subjectName}</span>: ${task.task}</li>`
        }
      }
    }
})	


