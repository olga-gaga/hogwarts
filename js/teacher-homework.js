import {styleLoad, getDataFromCookie} from './style-loading.js';
import {getQueryVariable} from './teacher-queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

let lastName = getDataFromCookie('lastName'); 
const teacherQuery = `
      {
        teachers (where:{lastName: "${lastName}"}){
          subjectOnCourses{
            id
            subjectName
            courseName
          }
       }
      }`;

styleLoad(true, false);
let teacher;
axios.post(url, {query: teacherQuery})
.then(response => {
  teacher = response.data.data.teachers[0];
  let listTasks = document.getElementById("yourCourses");
  for (let item of teacher.subjectOnCourses) {
    listTasks.innerHTML += `<li><a href="subjOnCourse.html?id=${item.id}" target="_blank">${item.subjectName + " на " + item.courseName + " курсе"} </a> </li>`
  }
});  

