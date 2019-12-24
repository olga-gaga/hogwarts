import {getQueryVariable} from './queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

let lastName = getQueryVariable('st'); 
const studentQuery = `
      {
        students (where:{}){
          firstName
          lastName       
        }
      }`;

const teacherQuery = `
      {
        teachers (where:{}){
          firstName
          lastName       
        }
      }`;      
let students=[];
axios.post(url, {query: studentQuery})
.then(response => {
    students = response.data.data.students;
    let studentsList = document.getElementById("students-list");
    for (let student of students) {
      studentsList.innerHTML += `<li> <a href="student.html?st=${student.lastName}"> ${student.firstName} ${student.lastName} </a> </li>`
    }
});	

let teachers=[];
axios.post(url, {query: teacherQuery})
.then(response => {
    teachers = response.data.data.teachers;
    let teachersList = document.getElementById("teachers-list");
    for (let teacher of teachers) {
      teachersList.innerHTML += `<li> <a href="teacher/teacher-index.html?t=${teacher.lastName}"> ${teacher.firstName} ${teacher.lastName} </a> </li>`
    }
});

